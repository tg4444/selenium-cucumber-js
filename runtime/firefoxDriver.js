'use strict';

//var firefox = require('geckodriver');
var firefox = require('selenium-webdriver/firefox');
var selenium = require('selenium-webdriver');

/**
 * Creates a Selenium WebDriver using Firefox as the browser
 * @returns {ThenableWebDriver} selenium web driver
 */
module.exports = function() {

    // var driver = new selenium.Builder().withCapabilities({
    //     browserName: 'firefox',
    //     javascriptEnabled: true,
    //     acceptSslCerts: true,
    //     'webdriver.firefox.bin': firefox.path
    // }).build();
    var options = new firefox.Options();

    var profile = new firefox.Profile();
    profile.setPreference('browser.tabs.remote.autostart', false);
    profile.setPreference('browser.tabs.remote.autostart.1', false);
    profile.setPreference('browser.tabs.remote.autostart.2', false);
    profile.setPreference('browser.tabs.remote.force-enable', false);

    options.setProfile(profile);

    var driver = new selenium.Builder().forBrowser('firefox').setFirefoxOptions(options).build();

    driver.manage().window().maximize();

    return driver;
};
