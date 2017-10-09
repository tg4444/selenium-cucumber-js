module.exports = function () {

    this.Given(/^I am on the \$\{([^"]*)\} page$/, function (pageRef) {
        var url = util.getNestedObject(page.testFlow1.application, pageRef);
        return helpers.loadPage(url);
    });

    this.When(/^I set the "([^"]*)" value to the \$\{([^"]*)\} field$/, function (value, cssSelectorRef) {
        var cssSelector = util.getNestedObject(page.testFlow1.application, cssSelectorRef);
        return helpers.setElementValue(cssSelector, value);
    });

    this.When(/^I click the \$\{([^"]*)\} element$/, function (cssSelectorRef) {
        var cssSelector = util.getNestedObject(page.testFlow1.application, cssSelectorRef);
        return helpers.clickElement(cssSelector);
    });

    this.Then(/^I should see product detail with title "([^"]*)"$/, function (pageTitle) {

        return page.testFlow1.titleContains(pageTitle);
    });
};
