@positive_scenarios
Feature: Calculate retirement savings using Securian Pre-retirement calculator

  @ScenarioP1
  Scenario Outline: Calculate Retirement Savings
    Given User fills all mandatory fields at the pre-retirement calculator from "<customerData>"
    When User submits the form
    Then User should be able to see my retirement savings amount

    Examples:
      | customerData         |
      | basicUserInputs.json |

  @ScenarioP2
  Scenario Outline: Calculate Retirement Savings after adjusting default calculator values
    Given User fills all mandatory fields at the pre-retirement calculator from "<customerData>"
    And User modifies the default calculator values from "<defaultCalculatorInputs>"
    When User submits the form
    Then User should be able to see my retirement savings amount

    Examples:
      | customerData         | defaultCalculatorInputs |
      | basicUserInputs.json | defCalValues.json       |
