module.exports = function () {

    this.Given(/^I am on the \$\{(.*)\} page$/, function (pageRef) {
        var url = util.resolveVariable(page.iBorderCtrl, pageRef);
        return helpers.loadPage(url);
    });

    this.When(/^I set the "([^"]*)" value to the \$\{(.*)\} field$/, function (value, cssSelectorRef) {
        var cssSelector = util.resolveVariable(page.iBorderCtrl, cssSelectorRef);
        return helpers.setElementValue(cssSelector, value);
    });

    this.When(/^I click the \$\{(.*)\} element$/, function (cssSelectorRef) {
        var cssSelector = util.resolveVariable(page.iBorderCtrl, cssSelectorRef);
        return helpers.clickElement(cssSelector);
    });

    this.Then(/^The \$\{(.*)\} element contains the "([^"]*)" text$/, function (cssSelectorRef, value) {
        var cssSelector = util.resolveVariable(page.iBorderCtrl, cssSelectorRef);
        return driver.wait(function() {
            return helpers.getElement(cssSelector).getText().then(function(text) {
                return text.toUpperCase().indexOf(value.toUpperCase()) > -1;
            })
          }, 4000);
    });

    this.Then(/^The user is redirected to a URL that matches the "([^"]*)" regular expression$/, function (urlRegex) {
        return helpers.waitForUrlToChangeTo(new RegExp(urlRegex));
    });
};
