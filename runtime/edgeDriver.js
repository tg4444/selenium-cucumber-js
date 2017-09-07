'use strict';

var selenium = require('selenium-webdriver');

/**
 * Creates a Selenium WebDriver using Opera as the browser
 * @returns {ThenableWebDriver} selenium web driver
 */
module.exports = function() {
    
        var driver = new selenium.Builder().withCapabilities({
            browserName: 'edge',
            javascriptEnabled: true,
            acceptSslCerts: true,
            'webdriver.edge.driver': 'C:\Users\IEUser\Desktop\MicrosoftWebDriver.exe'
        }).build();
    
        driver.manage().window().maximize();
    
        return driver;
    };
