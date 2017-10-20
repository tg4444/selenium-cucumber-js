module.exports = function () {

    this.Given(/^I am on the \$\{(.*)\} page$/, function (pageRef) {
        var url = util.getNestedObject(page.iBorderCtrl.application, pageRef);
        return helpers.loadPage(url);
    });

    this.When(/^I set the "([^"]*)" value to the \$\{(.*)\} field$/, function (value, cssSelectorRef) {
        var cssSelector = util.getNestedObject(page.iBorderCtrl.application, cssSelectorRef);
        return helpers.setElementValue(cssSelector, value);
    });

    this.When(/^I click the \$\{(.*)\} element$/, function (cssSelectorRef) {
        var cssSelector = util.getNestedObject(page.iBorderCtrl.application, cssSelectorRef);
        return helpers.clickElement(cssSelector);
    });

    this.Then(/^The \$\{(.*)\} element contains the "([^"]*)" text$/, function (cssSelectorRef, value) {
        var cssSelector = util.getNestedObject(page.iBorderCtrl.application, cssSelectorRef);
        console.log('cssSelector: ' + cssSelector);
        driver.wait(function() {
            return helpers.getElement(cssSelector).getText().then(function(text) {
                console.log(text.toUpperCase() + '/' + value.toUpperCase());
                return text.toUpperCase().indexOf(value.toUpperCase()) > -1;
            })
          }, 4000);
    });

    this.Then(/^The user is redirected to a URL that matches the "([^"]*)" regular expression$/, function (urlRegex) {
        return helpers.waitForUrlToChangeTo(new RegExp(urlRegex));
    });
};
