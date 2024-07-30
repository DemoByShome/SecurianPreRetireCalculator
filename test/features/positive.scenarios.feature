@positive_scenarios
Feature: Calculate retirement savings using Securian Pre-retirement calculator

  Background: User has opened the Securian Prer-Retirement Calculator on a browser's window

  @ScenarioP1
  Scenario: Calculate Retirement Savings
    Given User fills up the form with Social Security Income as "<Included/Excluded>" & Marital Status as "<Single/Married>"
    When User submits the form
    Then User should be able to see the retirement savings amount

    Examples:
      | Social Security Income | Marital Status |
      | Excluded               | Single         |
      | Included               | Single         |
      | Included               | Married        |

  @ScenarioP2
  Scenario: Calculate Retirement Savings w/o Social Security Option & by adjusting default calculator values
    Given User fills up the form with Social Security Income as "<Included/Excluded>" & Marital Status as "<Single/Married>"
    And User modifies the default calculator values with Inflation details as "<Included/Excluded>"
    When User submits the form
    Then User should be able to see the retirement savings amount

    Examples:
      | Social Security Income | Marital Status | Inflation details |
      | Excluded               | Single         | Excluded          |
      | Excluded               | Single         | Included          |
      | Included               | Married        | Excluded          |
      | Included               | Single         | Included          |
      | Included               | Married        | Included          |
