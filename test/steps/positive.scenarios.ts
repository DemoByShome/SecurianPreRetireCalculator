import { Given, When, Then } from '@wdio/cucumber-framework';
import CalculatorPage from '../../src/pages/calculator.page';
import ResultsPage from '../../src/pages/results.page';
import { DEFAULT_DATA_FILE } from '../../test/steps/constants/dataConstants';

Given(`User fills up the form with or without {string} & either of the {string}`, async (inclSocialSecurityOpt: string, maritalStatus: string) => {
    await CalculatorPage.openPRCCalculator()
    await CalculatorPage.enterUserInfo(DEFAULT_DATA_FILE, inclSocialSecurityOpt, maritalStatus) 
});

Given(`User modifies the default calculator values with or without {string}`, async (inclInflationDetails: string) => {
    await CalculatorPage.fillDefaultCalcVal(DEFAULT_DATA_FILE, inclInflationDetails)
});

When(`User submits the form`, async () => {
    await CalculatorPage.clickOnCalcButton()
});

Then(`User should be able to see the retirement savings amount`, async () => {
    await ResultsPage.waitTillResultDisplayed()
});



