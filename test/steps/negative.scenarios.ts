import { Given, When, Then } from '@wdio/cucumber-framework';
import CalculatorPage from '../../src/pages/calculator.page';
import { RESOURCE_FOLDER } from './constants/pathConstants';

Given(`User fills all mandatory fields at the pre-retirement calculator from {string}`, async (dataFile: string) => {
    await CalculatorPage.openPRCCalculator()
    await CalculatorPage.enterUserInfo(RESOURCE_FOLDER + dataFile)
});

When(`User submits the form`, async function(){
    await CalculatorPage.clickOnCalcButton()
});

Then(`User should see an error message asking the user to fill all required fields.`, async () => {    
    await CalculatorPage.verifyAlertToFillDataText()
});

Then(`User will get error message as planned retirement age must be greater than current age under the field to enter retirement age`, async () => {
    await CalculatorPage.waitForAlertRetireAgeGreater()
    await CalculatorPage.verifyAlertRetireAgeGreaterText()
});