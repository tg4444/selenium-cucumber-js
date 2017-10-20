module.exports = {
    //loginUsername: '${pages.zmail.cssSelectors.username}',
    application: {
        pages: {
            zmail: {
                url: 'https://zmail.eurodyn.com/',
                cssSelectors: {
                    username: '[id="username"]',
                    password: '[id="password"]',
                    loginButton: '[class="zLoginButton"]'
                }
            }
        }
    },
    elements: {
        menuItem: 'nav[role="navigation"] ul li a',
        productItem: 'main .pitem a'
    },

    clickNavigationItem: function(containingText) {

        return helpers.clickHiddenElement(page.testFlow1.elements.menuItem, containingText);
    },

    clickProductItem: function(containingText) {

        return helpers.clickHiddenElement(page.testFlow1.elements.productItem, containingText);
    },

    titleContains: function(expectedTitle) {

        return driver.getTitle(function(pageTitle) {
            expect(pageTitle).to.contain(expectedTitle);
        });
    }
};
