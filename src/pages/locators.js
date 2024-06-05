class Locators {
  static LOCATOR_HRM_USERNAME = "//input[@placeholder='Username']";
  static LOCATOR_HRM_PASSWORD = "//input[@placeholder='Password']";
  static LOCATOR_HRM_DASHBOARD_BANNER = '//img[@alt="client brand banner"]';

  static LOCATOR_LOGIN_BUTTON = 'button:has-text("Login")';
  static DOMCONTENT = "domcontentloaded";
  static LOCATOR_AMAZON_SEARCH = "#twotabsearchtextbox";
  static LOCATOR_AMAZON_SUBMITBTN = "#nav-search-submit-button";
  static LOCATOR_AMAZON_RESULTS = ".s-main-slot.s-result-list";
  static LOCATOR_AMAZON_FIRSTRESULT =
    ".s-main-slot.s-result-list .s-result-item h2 a span";
}

module.exports = Locators;
