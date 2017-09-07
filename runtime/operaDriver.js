'use strict';

var selenium = require('selenium-webdriver');

/**
 * Creates a Selenium WebDriver using Opera as the browser
 * @returns {ThenableWebDriver} selenium web driver
 */
module.exports = function() {
    
        var driver = new selenium.Builder().withCapabilities({
            browserName: 'opera',
            javascriptEnabled: true,
            acceptSslCerts: true,
            operaOptions: {
                args: ['start-maximized']
            }
        }).build();
    
        driver.manage().window().maximize();
    
        return driver;
    };
