@positive_scenarios
Feature: Calculate retirement savings using Securian Pre-retirement calculator

  Background: User has opened the Securian Prer-Retirement Calculator on a browser's window

  @ScenarioP1
  Scenario: Calculate Retirement Savings
    Given User fills up the form with or without "<Social Security Income>" & either of the "<Marital Status>"
    When User submits the form
    Then User should be able to see the retirement savings amount

    Examples:
      | Social Security Income | Marital Status |
      | Exclude                | Single         |
      | Include                | Single         |
      | Include                | Married        |

  @ScenarioP2
  Scenario: Calculate Retirement Savings w/o Social Security Option & by adjusting default calculator values
    Given User fills up the form with or without "<Social Security Income>" & "<Marital Status>"
    And User modifies the default calculator values with or without "<Inflation details>"
    When User submits the form
    Then User should be able to see the retirement savings amount

    Examples:
      | Social Security Income | Marital Status | Inflation details |
      | Exclude                | Single         | Exclude           |
      | Exclude                | Single         | Include           |
      | Include                | Married        | Exclude           |
      | Include                | Single         | Include           |
      | Include                | Married        | Include           |
