const BaseAPITest = require("./baseApiTest");

class APIClient extends BaseAPITest {
  constructor(baseURL, clientId, clientSecret) {
    super(baseURL, clientId, clientSecret);
  }

  async runTests() {
    try {
      console.log("Running OAuthAPIClient tests...");

      await this.init();

      // GET request
      const getData = await this.get("/test-endpoint");
      console.log("GET:", getData);

      await this.close();

      console.log("OAuthAPIClient tests completed successfully.");
    } catch (error) {
      console.error("OAuthAPIClient test failed:", error);
    }
  }
}

(async () => {
  const testClient = new APIClient(
    "https://boredapi.com",
    "Client-id",
    "Client-secret"
  );
  await testClient.runTests();
})();
