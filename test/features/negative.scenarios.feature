@negative_scenarios
Feature: Calculate retirement savings using Securian Pre-retirement calculator

  Background: User has opened the Securian Prer-Retirement Calculator on a browser's window

  @ScenarioN1
  Scenario: The numeric fields on the pre-retirement calculator page should not accept text
    Given User fills up the form with string values for numeric fields
    When User submits the form
    Then User should see an error message asking the user to fill all required fields    

  @ScenarioN2
  Scenario: The current age should be lesser that the retirement age to continue
    Given User fills up the form with current age greater than retirement age
    When User submits the form
    Then User should see an error message asking the user to fill all required fields
    And User will get error message as planned retirement age must be greater than current age under the field to enter retirement age


