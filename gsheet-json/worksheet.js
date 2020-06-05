const {GoogleSpreadsheet} = require('google-spreadsheet')
const useServiceAccountAuth = require('./authenticate')
const generator = require('./generator')

var _credential = null
var sheetID = null
var localeDIR = null

function setCredential(credential) {
	_credential = credential
}

function setLanguage(langs) {
	generator.setLanguage(langs)
}

function setSheet(sheet) {
	sheetID = sheet
}

function setDIR(dir) {
	localeDIR = dir
}

function getWorkSheets(doc) {
	return new Promise(async (resolve, reject) => {
		await doc.loadInfo()
		let sheets = []
		for(let i = 0;i<doc.sheetCount;i++){
			sheets.push(doc.sheetsByIndex[i])
		}
		resolve(sheets)
	})
}

function getRows(index, worksheets) {
	return new Promise(async (resolve, reject) => {
		const rows = await worksheets[index].getRows().catch(reject)
		resolve(rows)
	})
}

function isNamespaceNotFound(index, namespace) {
	if (index === -1) {
		console.error('\x1b[31m', `[ERROR] The worksheets has no member of '${namespace}'`, '\x1b[0m')
		return true
	}
	return false
}

async function generateRow(index,namespace,sheets){
    console.info(`Get rows for ${namespace}...`)
    let rows = await getRows(index, sheets)
    generator.generateJSON(localeDIR, namespace, rows)
}

async function readSheet(namespace = null) {
	console.info('Reading spread sheet...')

	const doc = new GoogleSpreadsheet(sheetID)
	await useServiceAccountAuth(_credential, doc)
	let worksheets = await getWorkSheets(doc)

	let titles = worksheets.map(worksheet => worksheet.title)

	if (namespace) {
		if (Array.isArray(namespace)) {
			let indexs = {}
			namespace.map(name => (indexs[name] = titles.indexOf(name)))
			Object.keys(indexs).forEach(key => {
                if (isNamespaceNotFound(indexs[key], key)) return
                generateRow(indexs[key],key,worksheets)
			})
		} else {
			let titleIndex = titles.indexOf(namespace)
			if (isNamespaceNotFound(titleIndex, namespace)) return
            generateRow(titleIndex,namespace,worksheets)
		}
	} else {
		titles.forEach(async (title, index) => {
			generateRow(index,title,worksheets)
		})
	}
}

module.exports = { getWorkSheets, getRows, readSheet, setCredential, setLanguage, setSheet, setDIR }
