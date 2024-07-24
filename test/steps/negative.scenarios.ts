import { Given, When, Then } from '@wdio/cucumber-framework';
import CalculatorPage from '../../src/pages/calculator.page';
import { NEGATIVE_SC1_DATA_FILE, NEGATIVE_SC2_DATA_FILE } from '../../test/steps/constants/dataConstants';


Given(`User fills up the form with string values for numeric fields`, async () => {
    CalculatorPage.openPRCCalculator()
    CalculatorPage.enterUserInfo(NEGATIVE_SC1_DATA_FILE, "", "")
});

When(`User submits the form`, async () => {
    await CalculatorPage.clickOnCalcButton()
});


Then(`User should see an error message asking the user to fill all required fields`, async () => {
    await CalculatorPage.verifyAlertToFillDataText()
});

Then(`User will get error message as planned retirement age must be greater than current age under the field to enter retirement age`, async () => {
    await CalculatorPage.waitForAlertRetireAgeGreater()
    await CalculatorPage.verifyAlertRetireAgeGreaterText()
});

Given(`User fills up the form with current age greater than retirement age`, async () => {
    CalculatorPage.openPRCCalculator()
    CalculatorPage.enterUserInfo(NEGATIVE_SC2_DATA_FILE, "", "")
});