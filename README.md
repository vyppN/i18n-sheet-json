# i18n-sheet-json

This is the library to read Google Sheet and create JSON locale files in your output directory

# Installation
``` npm install i18n-sheet-json ```

or

``` yarn add i18n-sheet-json ```  

# Google credential

## Service Account

1. Go to the [Google Developers Console](https://console.cloud.google.com)
2. Select your project or create a new one and then select it
3. Enable the Drive API for your project

- Expand <b>APIs & auth > APIs</b>
- Search for "drive"
- Click on "Drive API"
- Click on "Enable API" button
- Create a service account
- expand <b>APIs & auth > Credentials</b>
- Click on the "Add credentials" button
- Select the "Service account"
- Select the "JSON" key type option
- Click on "Create" button

Your JSON key file is generated and downloaded to your machine.

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

// On the otherhands you can specify the worksheet with
worksheet.readSheet('TITLE_AS_STRING')
// You can also use parameter as array
worksheet.readSheet(['TITLE_1','TITLE_2','TITLE_...'])
```

# How to use

Just run ``` node some-file.js ```

# Google Sheet

The google sheet has constructed like this. You can make locale columns and worksheets as much as you need.

**id** | **th** | **en** | **other..**
:---: | :-----------: | :-----------: | ---
title | สวัสดี | Hello | ...
