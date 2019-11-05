# i18n-sheet-json

This is the library to read Google Sheet and create JSON locale files in your output directory

# Installation
``` npm install i18n-sheet-json ```

or

``` yarn add i18n-sheet-json ```  

# How to Implement

e.g. ```some-file.js```

```javascript

// Import the library
const worksheet = require('i18n-sheet-json')
// Add google credential file
const credentials = require('./gsheet.json')

// Setup configuration
const config = {
    // Credential is a json file that you got from Google
    credentials:credentials,
    languages:[LANGUGE_CODE_AS_ARRAY],
    sheet:'DOCUMENT_ID_AS_STRING',
    output_dir:'PATH_AS_STRING'
}

// ADD CONFIG HERE
worksheet.init(config)
// READ Google Sheet and create JSON locale files in your output directory
worksheet.readSheet()
```

# How to use

Just run ``` node some-file.js ```
