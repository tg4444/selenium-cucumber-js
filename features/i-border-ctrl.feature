@test
Feature: Welcome page
  The welcome page works correctly
  
  Scenario: Click toggle
    Given The browser url is ${WELCOME_PAGE}
    When I click the ${WELCOME_PAGE_TOGGLE} element
    And I click the ${WELCOME_PAGE_REGISTER_BUTTON} element
    Then A new URL that contains ".+register" is loaded
    And The ${REGISTER_PAGE_TOOLBAR} element contains the "register" text