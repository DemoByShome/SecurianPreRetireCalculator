@positive_scenarios
Feature: Calculate retirement savings using Securian Pre-retirement calculator
  /*
  | Scenario# | Description                                                     |
  | SC1       | Calculate Retirement Savings excluding social security benefits |
  */

  @Scenario1
  Scenario Outline: Calculate Retirement Savings excluding social security benefits
    Given I am on the front page
    When I enter my "<Current Age>","<Retirement Age>","<Current annual income>","<Spouse's annual income>", "<Current retirement Savings>", "<Annual savings percentage>" and "<Savings increase rate>"
    And Press the Calculate button
    Then I should be able to see my retirement savings amount

    Examples:
      | Current Age | Retirement Age | Current annual income | Spouse's annual income | Current retirement Savings | Annual savings percentage | Savings increase rate |
      |          40 |             68 |              1,00,000 |                 75,000 |                   5,00,000 |                        10 |                     1 |
