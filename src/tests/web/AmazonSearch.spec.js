const { test, expect } = require("@playwright/test");
const locators = require("../../pages/locators");
const constants = require("../../constants/constants");

const UserActions = require("../../util/UserActions");
const BaseTest = require("./BaseTest");

class AmazonSearchTest extends BaseTest {
  async testAmazonSearch() {
    try {
      await this.setup();
      await UserActions.navigateTo(this.page, constants.AMAZON_URL);

      // Wait for the search input to appear
      await UserActions.waitForElement(
        this.page,
        locators.LOCATOR_AMAZON_SEARCH
      );

      await UserActions.fillField(
        this.page,
        locators.LOCATOR_AMAZON_SEARCH,
        "treadmill"
      );
      await UserActions.clickElement(
        this.page,
        locators.LOCATOR_AMAZON_SUBMITBTN
      );

      // wait for search results to appear
      await UserActions.waitForElement(
        this.page,
        locators.LOCATOR_AMAZON_RESULTS
      );

      // validate the search results contain expected text
      const firstResultSelector = locators.LOCATOR_AMAZON_FIRSTRESULT;
      const firstResultText = await UserActions.getText(
        this.page,
        firstResultSelector
      );
      console.log(`Search results text: ${firstResultText}`);
      await expect(firstResultText).toContain("Treadmill");
    } catch (error) {
      console.error("Test failed.", error);
    } finally {
      await UserActions.takeScreenshot(this.page, "./");
      await this.teardown();
    }
  }
}

// Run the test
const amazonTest = new AmazonSearchTest();
test("amazon test", async () => {
  await amazonTest.testAmazonSearch();
});
