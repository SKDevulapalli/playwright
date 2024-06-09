const { test } = require("@playwright/test");

const UserActions = require("../../util/UserActions");
const BaseTest = require("./BaseTest");

class FileUpload extends BaseTest {
  async testUpload() {
    try {
      await this.setup();
      await UserActions.navigateTo(
        this.page,
        "https://the-internet.herokuapp.com/upload"
      );

      await this.page
        .locator("#file-upload")
        .setInputFiles("/Users/Sri/Desktop/sample-file.txt");

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
const fileUploadTest = new FileUpload();
test("web elements test", async () => {
  await fileUploadTest.testUpload();
});
