module.exports = {
    application: {
         /**
         * The 'shortcuts' make it easier to use structured variables within the test case text.
         * For example, instead of using ${application.pages.welcome.url}, you can use ${WELCOME_PAGE}.
         */
        shortcuts: {
            WELCOME_PAGE: 'pages.welcome.url',
            WELCOME_PAGE_TOGGLE: 'pages.welcome.cssSelectors.toggle',
            WELCOME_PAGE_REGISTER_BUTTON: 'pages.welcome.cssSelectors.registerButton',
            WELCOME_PAGE_LOGIN_BUTTON: 'pages.welcome.cssSelectors.loginButton',

            REGISTER_PAGE_TOOLBAR: 'pages.register.cssSelectors.toolbar'
        },
        /**
         * The 'pages' is a structure intended to hold variables for each page that will be tested.
         */
        pages: {
            register: {
                cssSelectors: {
                    toolbar: '[id="registerPageNavBar"] [class="toolbar-title toolbar-title-md"]'
                }
            },
            welcome: {
                url: 'http://localhost:8100/',
                cssSelectors: {
                    toggle: '[id="welcomeToggle"]',
                    registerButton: '[id="welcomeRegisterBtn"]',
                    loginButton: '[id="welcomeLoginBtn"]'
                }
            }
        }
    }
};
