const { request } = require("playwright");

class BaseAPITest {
  constructor(baseURL, clientId, clientSecret) {
    this.baseURL = baseURL;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.accessToken = null;
    this.client = null;
  }

  async init() {
    this.client = await request.newContext();
    await this.authenticate();
  }

  async authenticate() {
    const response = await this.client.post(
      "https://oauth-provider.com/token",
      {
        form: {
          grant_type: "client_credentials",
          client_id: this.clientId,
          client_secret: this.clientSecret,
        },
      }
    );
    const data = await response.json();
    this.accessToken = data.access_token;
  }

  async get(endpoint) {
    const response = await this.client.get(`${this.baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return response.json();
  }

  async close() {
    await this.client.dispose();
  }
}

module.exports = BaseAPITest;
