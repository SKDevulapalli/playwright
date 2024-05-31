const { test, expect } = require("@playwright/test");
const constants = require("../../constants/constants");
const UserActions = require("../../util/UserActions");
const BaseTest = require("./baseTest");

class WebElementsTest extends BaseTest {
  async testLogin() {
    try {
      await this.setup();
      await UserActions.navigateTo(this.page, constants.BASE_URL);

      // Wait for the login form to appear
      await UserActions.waitForElement(this.page, LOCATOR_USERNAME);

      await UserActions.fillField(
        this.page,
        LOCATOR_USERNAME,
        constants.USERNAME
      );
      await UserActions.fillField(
        this.page,
        LOCATOR_PASSWORD,
        constants.PASSWORD
      );

      await UserActions.clickElement(this.page, LOCATOR_LOGIN_BUTTON);

      // Wait for the dashboard to appear
      await UserActions.waitForElement(this.page, "#menu_dashboard_index");

      // Validate that the dashboard is displayed
      const dashboardHeader = await UserActions.getText(
        this.page,
        "#menu_dashboard_index"
      );
      console.log(`Dashboard header: ${dashboardHeader}`);
      await expect(dashboardHeader).toContain("Dashboard");
    } catch (error) {
      console.error("Test failed with error", error);
    } finally {
      await UserActions.takeScreenshot(this.page, "screenshot.png");
      await this.teardown();
    }
  }
}

// Run the test
const webElementTest = new WebElementsTest();
test("web elements test", async () => {
  await webElementTest.testLogin();
});
