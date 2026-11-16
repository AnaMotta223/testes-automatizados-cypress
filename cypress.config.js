const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 6000,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {},
  },
});