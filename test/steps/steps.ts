import { Given, When, Then } from '@wdio/cucumber-framework';
import CalculatorPage from '../../src/pages/calculator.page';
import ResultsPage from '../../src/pages/results.page';


Given(`User fills up the form with Social Security Income as {string} & Marital Status as {string}`, async (inclSocialSecurityOpt: string, maritalStatus: string) => {
    await CalculatorPage.openPRCCalculator()
    await CalculatorPage.enterUserInfo(inclSocialSecurityOpt, maritalStatus) 
});

Given(`User modifies the default calculator values with Inflation details as {string}`, async (inclInflationDetails: string) => {
    await CalculatorPage.fillDefaultCalcVal(inclInflationDetails)
});

Given(`User fills up the form with string values for numeric fields`, async () => {
    CalculatorPage.openPRCCalculator()
    CalculatorPage.enterTextForMandatoryFields()
});

Given(`User fills up the form with current age greater than retirement age`, async () => {
    CalculatorPage.openPRCCalculator()
    CalculatorPage.enterLessRetAgeForMandatoryFields()
});

When(`User submits the form`, async () => {
    await CalculatorPage.clickOnCalcButton()
});

Then(`User should be able to see the retirement savings amount`, async () => {
    await ResultsPage.waitTillResultDisplayed()
});

Then(`User should see an error message asking the user to fill all required fields`, async () => {
    await CalculatorPage.verifyAlertToFillDataText()
});

Then(`User will get error message as planned retirement age must be greater than current age under the field to enter retirement age`, async () => {
    await CalculatorPage.waitForAlertRetireAgeGreater()
    await CalculatorPage.verifyAlertRetireAgeGreaterText()
});