'use strict';
/*
var selenium = require('selenium-webdriver');


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
    */

/**
 * Creates a Selenium WebDriver using Edge as the browser
 * @returns {ThenableWebDriver} selenium web driver
 */

    var edge = require('selenium-webdriver/edge');

    module.exports = function() {
    
     var service = new edge.ServiceBuilder('C:\\Users\\IEUser\\Desktop\\MicrosoftWebDriver.exe')
         .setPort(17556)
         .build();
    
     var options = new edge.Options();
     // configure browser options ...
    
     var driver = edge.Driver.createSession(options, service);
     return driver;
    };