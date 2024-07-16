@negative_scenarios
Feature: Calculate retirement savings using Securian Pre-retirement calculator
  /*
  | Scenario# | Description                                                                             |
  | SC1       | The numeric fields on the Front Page should not accept text                             |
  | SC2       | Retirement savings calculation with Current Age greater than Retirement Age should fail |
  */

  @ScenarioN1
  Scenario: The numeric fields on the Front Page should not accept text
    Given I am on the front page
    When I enter my "<Current Age>","<Retirement Age>","<Current annual income>","<Spouse's annual income>", "<Current retirement Savings>", "<Annual savings percentage>" and "<Savings increase rate>"
    And Press the Calculate button
    Then The alert to fill all required fields should appear

    Examples:
      | Current Age | Retirement Age | Current annual income | Spouse's annual income | Current retirement Savings | Annual savings percentage | Savings increase rate |
      | text        | text           | text                  | text                   | test                       | text                      | text                  |

  @ScenarioN2
  Scenario: Retirement savings calculation with Current Age greater than Retirement Age should fail
    Given I am on the front page
    When I enter my "<Current Age>","<Retirement Age>","<Current annual income>","<Spouse's annual income>", "<Current retirement Savings>", "<Annual savings percentage>" and "<Savings increase rate>"
    And Press the Calculate button
    Then The alert to fill all required fields should appear
    And A alert text should appear under test box to fill retirement age

    Examples:
      | Current Age | Retirement Age | Current annual income | Spouse's annual income | Current retirement Savings | Annual savings percentage | Savings increase rate |
      |          68 |             40 |              1,00,000 |                 75,000 |                   5,00,000 |                        10 |                     1 |
