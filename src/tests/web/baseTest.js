const { chromium } = require("@playwright/test");

class BaseTest {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  // Setup method to initialize browser, context and page
  // using headed mode
  async setup() {
    console.log("Setting up browser, context, and page...");
    try {
      this.browser = await chromium.launch({ headless: false });
      console.log("Browser launched");
      this.context = await this.browser.newContext();
      console.log("Context created");
      this.page = await this.context.newPage();
      console.log("Page opened");
    } catch (error) {
      console.error("Failed to setup browser, context, or page:", error);
    }
  }

  // Teardown method to close page, context, browser
  async teardown() {
    console.log("Entered tear down ...");
    try {
      if (this.page) {
        await this.page.close();
        console.log("Page closed.");
      }
      if (this.context) {
        await this.context.close();
        console.log("Context closed.");
      }
      if (this.browser) {
        await this.browser.close();
        console.log("Browser closed.");
      }
    } catch (error) {
      console.error("Failed to teardown page, context, or browser:", error);
    }
  }
}

module.exports = BaseTest;
