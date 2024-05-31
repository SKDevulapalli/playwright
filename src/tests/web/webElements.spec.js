const { test, expect } = require("@playwright/test");
const constants = require("../../constants/constants");
const locators = require("../../pages/locators");

const UserActions = require("../../util/UserActions");
const BaseTest = require("./baseTest");

class WebElementsTest extends BaseTest {
  async testLogin() {
    try {
      await this.setup();
      await UserActions.navigateTo(this.page, constants.BASE_URL);

      // Wait for the login form to appear
      await UserActions.waitForElement(this.page, locators.LOCATOR_USERNAME);

      await UserActions.fillField(
        this.page,
        locators.LOCATOR_USERNAME,
        constants.USERNAME
      );
      await UserActions.fillField(
        this.page,
        locators.LOCATOR_PASSWORD,
        constants.PASSWORD
      );

      await this.page.getByRole(locators.LOCATOR_LOGIN_BUTTON).click();
      await this.page.waitForLoadState(locators.DOMCONTENT);

      const dashboardHeading = await page.getByRole("heading", {
        name: constants.DASHBOARDTEXT,
      });

      console.log(`Dashboard header: ${dashboardHeading}`);

      // Wait for the heading to be visible
      await expect(dashboardHeading).toBeVisible();

      // Assert that the text content of the heading is correct
      await expect(dashboardHeading).toHaveText(constants.DASHBOARDTEXT);
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
