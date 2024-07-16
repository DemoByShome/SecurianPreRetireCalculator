@positive_scenarios
Feature: Calculate retirement savings using Securian Pre-retirement calculator
  /*
  | Scenario# | Description                                                            |
  | SC1       | Calculate Retirement Savings excluding                                 |
  | SC2       | Calculate Retirement Savings after adjusting default calculator values |
  */

  @ScenarioP1
  Scenario: Calculate Retirement Savings
    Given I am on the front page
    When I enter my "<Current Age>","<Retirement Age>","<Current annual income>","<Spouse's annual income>", "<Current retirement Savings>", "<Annual savings percentage>" and "<Savings increase rate>"
    And Press the Calculate button
    Then I should be able to see my retirement savings amount

    Examples:
      | Current Age | Retirement Age | Current annual income | Spouse's annual income | Current retirement Savings | Annual savings percentage | Savings increase rate |
      |          40 |             68 |              1,00,000 |                 75,000 |                   5,00,000 |                        10 |                     1 |

  @ScenarioP2
  Scenario: Calculate Retirement Savings after adjusting default calculator values
    Given I am on the front page
    When I enter my "<Current Age>","<Retirement Age>","<Current annual income>","<Spouse's annual income>", "<Current retirement Savings>", "<Annual savings percentage>" and "<Savings increase rate>"
    And I modify the default calculator values with "<Other Income>", "<Years to depend>", "<Final income post retire>", "<Pre retire inv return>", "<Post retire inv return >"
    And Press the Calculate button
    Then I should be able to see my retirement savings amount

    Examples:
      | Current Age | Retirement Age | Current annual income | Spouse's annual income | Current retirement Savings | Annual savings percentage | Savings increase rate | Other Income | Years to depend | Final income post retire | Pre retire inv return | Post retire inv return |
      |          40 |             68 |              1,00,000 |                 75,000 |                   5,00,000 |                        10 |                     1 |          500 |              20 |                       75 |                     8 |                      5 |
