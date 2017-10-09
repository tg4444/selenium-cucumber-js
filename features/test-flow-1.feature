@test
Feature: Test flow 1
  I can search for and buy workwear
  
  Scenario: Check email
    Given I am on the ${pages.zmail.url} page
    When I set the "******" value to the ${pages.zmail.cssSelectors.username} field
    And I set the "******" value to the ${pages.zmail.cssSelectors.password} field
    And I click the ${pages.zmail.cssSelectors.loginButton} element
    