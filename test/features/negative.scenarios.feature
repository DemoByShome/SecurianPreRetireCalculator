@negative_scenarios
Feature: Calculate retirement savings using Securian Pre-retirement calculator

  @ScenarioN1
  Scenario Outline: The numeric fields on the pre-retirement calculator page should not accept text
    Given User fills all mandatory fields at the pre-retirement calculator from "<customerData>"
    When User submits the form
    Then User should see an error message asking the user to fill all required fields.

    Examples:
      | customerData           |
      | negativeSC1Inputs.json |

  @ScenarioN2
  Scenario Outline: Calculate Retirement Savings after adjusting default calculator values
    Given User fills all mandatory fields at the pre-retirement calculator from "<customerData>"
    When User submits the form
    Then User should see an error message asking the user to fill all required fields.
    And User will get error message as planned retirement age must be greater than current age under the field to enter retirement age

    Examples:
      | customerData           |
      | negativeSC2Inputs.json |
