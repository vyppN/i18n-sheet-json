const worksheet = require('./worksheet')

function init(config){
    const {credentials,languages,sheet,output_dir} = config
    worksheet.setCredential(credentials)
    worksheet.setLanguage(languages)
    worksheet.setSheet(sheet)
    worksheet.setDIR(output_dir)
}

function readSheet(){
    worksheet.readSheet()
}

module.exports = {init,readSheet}