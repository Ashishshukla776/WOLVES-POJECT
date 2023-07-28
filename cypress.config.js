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
      apiUrl:process.env.APIURL
    },
    baseUrl: 'http://localhost:4200',
    specPattern : 'cypress/wolves'
  },
 
});
