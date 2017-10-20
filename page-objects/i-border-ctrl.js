module.exports = {
    application: {
        WELCOME_PAGE: 'pages.welcome.url',
        pages: {
            register: {
                cssSelectors: {
                    //toolbar: '[id="welcomePageNavBar"] [class="toolbar-title toolbar-title-md"]'
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
