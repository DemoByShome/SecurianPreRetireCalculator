import { Given, When, Then } from '@wdio/cucumber-framework';
import CalculatorPage from '../../src/pages/calculator.page';
import ResultsPage from '../../src/pages/results.page';
import { RESOURCE_FOLDER } from './constants/pathConstants';

Given(`User fills all mandatory fields at the pre-retirement calculator from {string}`, async(dataFile: string) => {
    await CalculatorPage.openPRCCalculator()
    await CalculatorPage.enterUserInfo(RESOURCE_FOLDER + dataFile)
});

Given(`User fills all mandatory fields at the pre-retirement calculator with social sucurity option from {string}`, async (dataFile: string) => {
    await CalculatorPage.openPRCCalculator()
    await CalculatorPage.enterUserInfoWithSSBenefit(RESOURCE_FOLDER + dataFile)
});

Given(`User modifies the default calculator values from {string}`, async (dataFile: string) => {
    await CalculatorPage.fillDefaultCalcVal(RESOURCE_FOLDER + dataFile)
});

Given(`User modifies the default calculator values from {string} including Inflation details`, async (dataFile: string) => {
    await CalculatorPage.fillDefaultCalcValIncInflation(RESOURCE_FOLDER + dataFile)
});

When(`User submits the form`, async () => {
    await CalculatorPage.clickOnCalcButton()
});

Then(`User should be able to see my retirement savings amount`, async () => {
    await ResultsPage.waitTillResultDisplayed()
});

