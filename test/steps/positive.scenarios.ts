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

When(`User submits the form`, async () => {
    await CalculatorPage.clickOnCalcButton()
});

Then(`User should be able to see the retirement savings amount`, async () => {
    await ResultsPage.waitTillResultDisplayed()
});



