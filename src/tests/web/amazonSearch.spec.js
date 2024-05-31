const { test, expect } = require("@playwright/test");

const UserActions = require("../../util/UserActions");
const BaseTest = require("./baseTest");

class AmazonSearchTest extends BaseTest {
  async testAmazonSearch() {
    try {
      await this.setup();
      await UserActions.navigateTo(this.page, "https://www.amazon.com");

      // Wait for the search input to appear
      await UserActions.waitForElement(this.page, "#twotabsearchtextbox");

      // type text into the search input and submit the form
      await UserActions.fillField(
        this.page,
        "#twotabsearchtextbox",
        "treadmill"
      );
      await UserActions.clickElement(this.page, "#nav-search-submit-button");

      // waits for  search results to appear
      await UserActions.waitForElement(this.page, ".s-main-slot");

      // validate the search results contain expected text
      const searchResultsText = await UserActions.getText(
        this.page,
        ".s-main-slot"
      );
      console.log(`Search results text: ${searchResultsText}`);
      await expect(searchResultsText).toContain("treadmill");
    } catch (error) {
      console.error("Test failed with error", error);
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
