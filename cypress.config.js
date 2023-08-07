const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env:{
      email:process.env.EMAIL,
      password:process.env.PASSWORD,
      apiUrl:process.env.APIURL,
      uiUrl:process.env.UIURL
    },
    baseUrl: process.env.UIURL,
    specPattern : 'cypress/wolves'
  },
 
});
