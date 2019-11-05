const fs = require('fs')

var LANGUAGES = []

function setLanguage(langs){
    LANGUAGES = langs
}

function generateJSON(localeDIR, title, rows) {
    if(!fs.existsSync(localeDIR)){
        fs.mkdirSync(localeDIR)
        LANGUAGES.forEach(lang=>{
            fs.mkdirSync(`${localeDIR}/${lang}`)
        })
    }
    
    LANGUAGES.forEach(locale => {
        const jsonFile = `${localeDIR}/${locale}/${title}.json`
        if (fs.existsSync(jsonFile)) fs.unlinkSync(jsonFile)
        console.info(`Create ${locale} locale ${title}.json...`)
        var obj = {}
        rows.forEach(row => {
            obj[row.id] = row[locale]
        })
        fs.writeFileSync(jsonFile, JSON.stringify(obj, null, 4))
        console.log('\x1b[32m', `---- Write ${title}.json complete! \u2713`, '\x1b[0m')
    })
}

module.exports = {generateJSON,setLanguage}