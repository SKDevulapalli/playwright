class UserActions {
  // Launch a browser instance
  static async launchBrowser() {
    console.log("Launching browser...");
    try {
      const browser = await playwright.chromium.launch({ headless: false });
      console.log("Browser launched successfully.");
      return browser;
    } catch (error) {
      console.error("Failed to launch browser:", error);
    }
  }

  // Close the browser instance
  static async closeBrowser(browser) {
    console.log("Closing browser...");
    try {
      await browser.close();
      console.log("Browser closed successfully.");
    } catch (error) {
      console.error("Failed to close browser:", error);
    }
  }

  // Open a new page
  static async openNewPage(browser) {
    console.log("Opening new page...");
    try {
      const page = await browser.newPage();
      console.log("New page opened successfully.");
      return page;
    } catch (error) {
      console.error("Failed to open new page:", error);
    }
  }

  // Navigate to a URL
  static async navigateTo(page, url) {
    console.log(`Navigating to ${url}...`);
    try {
      await page.goto(url);
      console.log(`Navigation to ${url} successful.`);
    } catch (error) {
      console.error(`Failed to navigate to ${url}:`, error);
    }
  }

  // Take a screenshot
  static async takeScreenshot(page, path) {
    console.log(`Taking screenshot ..`);
    try {
      const timestamp = Date.now();
      const screenshotPath = `screenshot_${timestamp}.png`;
      await page.screenshot({ path: screenshotPath });
      console.log(`Screenshot saved to ${path} successfully.`);
    } catch (error) {
      console.error(`Failed to take screenshot and save to ${path}:`, error);
    }
  }

  // Fill a form field
  static async fillField(page, selector, value) {
    console.log(`Filling field ${selector} with value "${value}"...`);
    try {
      await page.fill(selector, value);
      console.log(`Field ${selector} filled successfully.`);
    } catch (error) {
      console.error(`Failed to fill field ${selector}:`, error);
    }
  }

  // Click a button or element
  static async clickElement(page, selector) {
    console.log(`Clicking element ${selector}...`);
    try {
      await page.click(selector);
      console.log(`Element ${selector} clicked successfully.`);
    } catch (error) {
      console.error(`Failed to click element ${selector}:`, error);
    }
  }

  // Wait for an element to appear
  static async waitForElement(page, selector, timeout = 30000) {
    console.log(`Waiting for element ${selector} to appear...`);
    try {
      await page.waitForSelector(selector, { timeout });
      console.log(`Element ${selector} appeared.`);
    } catch (error) {
      console.error(`Failed to find element ${selector}:`, error);
    }
  }

  // Upload a file
  static async uploadFile(page, selector, filePath) {
    console.log(`Uploading file ${filePath} to ${selector}...`);
    try {
      const inputUploadHandle = await page.$(selector);
      await inputUploadHandle.setInputFiles(filePath);
      console.log(`File ${filePath} uploaded to ${selector} successfully.`);
    } catch (error) {
      console.error(`Failed to upload file ${filePath} to ${selector}:`, error);
    }
  }

  // Extract text from an element
  static async getText(page, selector) {
    console.log(`Extracting text from element ${selector}...`);
    try {
      await page.waitForSelector(selector);
      const text = await page.$eval(selector, (element) =>
        element.textContent.trim()
      );
      console.log(`Extracted text from ${selector}: ${text}`);
      return text;
    } catch (error) {
      console.error(`Failed to extract text from element ${selector}:`, error);
    }
  }

  // Perform a conditional check (e.g., check if an element is visible)
  static async isElementVisible(page, selector) {
    console.log(`Checking visibility of element ${selector}...`);
    try {
      const element = await page.$(selector);
      const isVisible = element && (await element.isVisible());
      console.log(`Element ${selector} visibility: ${isVisible}`);
      return isVisible;
    } catch (error) {
      console.error(
        `Failed to check visibility of element ${selector}:`,
        error
      );
      return false;
    }
  }

  // Scroll to an element
  static async scrollToElement(page, selector) {
    console.log(`Scrolling to element ${selector}...`);
    try {
      await page.evaluate((selector) => {
        document.querySelector(selector).scrollIntoView();
      }, selector);
      console.log(`Scrolled to element ${selector} successfully.`);
    } catch (error) {
      console.error(`Failed to scroll to element ${selector}:`, error);
    }
  }

  // Select a dropdown option by value
  static async selectDropdownOption(page, selector, value) {
    console.log(`Selecting dropdown option ${value} in ${selector}...`);
    try {
      await page.selectOption(selector, value);
      console.log(`Selected option ${value} in ${selector} successfully.`);
    } catch (error) {
      console.error(`Failed to select option ${value} in ${selector}:`, error);
    }
  }

  // Handle alerts
  static async handleAlert(page, action = "accept", promptText = "") {
    console.log(`Setting up alert handler to ${action} the alert...`);
    try {
      page.on("dialog", async (dialog) => {
        console.log(`Alert appeared: ${dialog.message()}`);
        if (action === "accept") {
          await dialog.accept(promptText);
          console.log("Alert accepted.");
        } else {
          await dialog.dismiss();
          console.log("Alert dismissed.");
        }
      });
    } catch (error) {
      console.error("Failed to handle alert:", error);
    }
  }

  // Perform actions within an iframe
  static async performInIframe(page, iframeSelector, actionCallback) {
    console.log(`Performing action within iframe ${iframeSelector}...`);
    try {
      const frameHandle = await page.$(iframeSelector);
      const frame = await frameHandle.contentFrame();
      if (frame) {
        await actionCallback(frame);
        console.log(
          `Action within iframe ${iframeSelector} performed successfully.`
        );
      } else {
        console.error(`Failed to find iframe ${iframeSelector}.`);
      }
    } catch (error) {
      console.error(
        `Failed to perform action within iframe ${iframeSelector}:`,
        error
      );
    }
  }
}

module.exports = UserActions;
