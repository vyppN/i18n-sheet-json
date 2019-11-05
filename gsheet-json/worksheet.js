const GoogleSheet = require('google-spreadsheet')
const useServiceAccountAuth = require('./authenticate')
const generator = require('./generator')

var _credential = null
var sheetID = null
var localeDIR = null

function setCredential(credential){
    _credential = credential
}

function setLanguage(langs){
    generator.setLanguage(langs)
}

function setSheet(sheet){
    sheetID = sheet
}

function setDIR(dir){
    localeDIR = dir
}

function getWorkSheets(doc) {
    return new Promise((resolve, reject) => {
        doc.getInfo((err, info) => {
            if (err) reject(err)
            resolve(info.worksheets)
        })
    })
}

function getRows(index, doc) {
    return new Promise((resolve, reject) => {
        doc.getRows(index, {}, (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

async function readSheet() {
    console.info('Reading spread sheet...')
    const doc = new GoogleSheet(sheetID)
    await useServiceAccountAuth(_credential,doc)
    let worksheets = await getWorkSheets(doc)
    let titles = worksheets.map(worksheet => worksheet.title)
    titles.forEach(async (title, index) => {
        console.info(`[${index + 1}/${titles.length}] Get rows for ${title}...`)
        let rows = await getRows(index + 1, doc)
        generator.generateJSON(localeDIR, title, rows)
    })
}

module.exports = {getWorkSheets,getRows,readSheet,setCredential,setLanguage,setSheet,setDIR}