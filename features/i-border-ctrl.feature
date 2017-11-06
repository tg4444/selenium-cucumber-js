
Feature: Application test
  The application works correctly
  
  Scenario: Go to the Register page
    Given The browser url is ${WELCOME_PAGE}
    When I click the ${WELCOME_PAGE_TOGGLE} element
    And I click the ${WELCOME_PAGE_REGISTER_BUTTON} element
    Then A new URL that contains ".+register" is loaded
    And The ${REGISTER_PAGE_TOOLBAR} element contains the "register" text

  Scenario: Go to the Login page
    Given The browser url is ${WELCOME_PAGE}
    When I click the ${WELCOME_PAGE_TOGGLE} element
    And I click the ${WELCOME_PAGE_LOGIN_BUTTON} element
    Then A new URL that contains ".+login" is loaded
    And The ${LOGIN_PAGE_TOOLBAR} element contains the "login" text


  Scenario: Go to the Home page
    #@Inject(Go to the Login page)
    And I click the ${LOGIN_PAGE_SUBMIT_BUTTON} element
    Then A new URL that contains ".+home" is loaded
    And The ${HOME_PAGE_TOOLBAR} element contains the "home" text

  @lastTest    
  Scenario: Go to the Wizard page
    #@Inject(Go to the Home page)
    And I click the ${HOME_PAGE_NEW_TRIP_BUTTON} element
    Then A new URL that contains ".+wizard" is loaded
    And The ${WIZARD_PAGE_TOOLBAR} element contains the "wizard" text