Feature: Demo script for login

  Scenario Outline: Swag Labs login
    Given I am on login page
    When I enter "<username>" and "<password>"
    Then I am redirected to Products page

    Examples:
      | username      | password     | Items |
      | standard_user | secret_sauce | 
