Feature: Calculate retirement savings using Securian Pre-retirement calculator

  Scenario Outline: Calculate Retirement Savings excluding social security benefits
    Given I am on the front page
    When I enter my "<Current Age>","<Retirement Age>","<Current annual income>","<Spouse's annual income>", "<Current retirement Savings>", "<Annual savings percentage>" and "<Savings increase rate>"
    And Press the Calculate button
    Then I should be able to see my "<Retirement savings>"
    When I clicked on the See Full Results button
    Then I get the list of qualifying retirement amount at the end of each year

    Examples:
      | Current Age | Retirement Age | Current annual income | Spouse's annual income | Current retirement Savings | Annual savings percentage | Savings increase rate | Retirement savings |
      |          40 |             68 |              1,00,000 |                 75,000 |                   5,00,000 |                        10 |                     1 | $4,372,690.03     |
