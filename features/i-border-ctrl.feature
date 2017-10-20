@test
Feature: Welcome page
  The welcome page works correctly
  
  Scenario: Click toggle
    Given The browser url is ${pages.welcome.url}
    When I click the ${pages.welcome.cssSelectors.toggle} element
    And I click the ${pages.welcome.cssSelectors.registerButton} element
    Then A new URL that contains ".+register" is loaded
    And The ${pages.register.cssSelectors.toolbar} element contains the "register" text

