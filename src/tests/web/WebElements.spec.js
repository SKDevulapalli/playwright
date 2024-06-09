const { test, expect } = require("@playwright/test");
const constants = require("../../constants/constants");
const locators = require("../../pages/locators");

const UserActions = require("../../util/UserActions");
const BaseTest = require("./BaseTest");

class WebElementsTest extends BaseTest {
  async testLogin() {
    try {
      await this.setup();
      await UserActions.navigateTo(this.page, constants.BASE_URL);

      // Wait for the login form to appear
      await UserActions.waitForElement(
        this.page,
        locators.LOCATOR_HRM_USERNAME
      );

      await UserActions.fillField(
        this.page,
        locators.LOCATOR_HRM_USERNAME,
        constants.USERNAME
      );
      await UserActions.fillField(
        this.page,
        locators.LOCATOR_HRM_PASSWORD,
        constants.PASSWORD
      );

      await this.page.waitForSelector(locators.LOCATOR_LOGIN_BUTTON);
      await this.page.click(locators.LOCATOR_LOGIN_BUTTON);

      await this.page.waitForLoadState(locators.DOMCONTENT);
      // Check if the element is present
      const element = await UserActions.waitForElement(
        this.page,
        locators.LOCATOR_HRM_DASHBOARD_BANNER
      );

      expect(element).not.toBeNull();

      await this.page.waitForTimeout(5000);
    } catch (error) {
      console.error("Test failed.", error);
    } finally {
      await UserActions.takeScreenshot(this.page, "./");
      await this.teardown();
    }
  }
}

// Run the test
const webElementTest = new WebElementsTest();
test("web elements test", async () => {
  await webElementTest.testLogin();
});
