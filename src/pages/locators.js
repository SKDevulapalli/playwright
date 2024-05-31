class Locators {
  static LOCATOR_USERNAME = "//input[@placeholder='Username']";
  static LOCATOR_PASSWORD = "//input[@placeholder='Password']";
  static LOCATOR_LOGIN_BUTTON = '"button", { name: "Login" }';
  static DOMCONTENT = "domcontentloaded";
  static LOCATOR_AMAZON_SEARCH = "#twotabsearchtextbox";
  static LOCATOR_AMAZON_SUBMITBTN = "#nav-search-submit-button";
  static LOCATOR_AMAZON_RESULTS = ".s-main-slot.s-result-list";
  static LOCATOR_AMAZON_FIRSTRESULT =
    ".s-main-slot.s-result-list .s-result-item h2 a span";
}

module.exports = Locators;
