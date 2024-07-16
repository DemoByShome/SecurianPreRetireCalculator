import { Given, When, Then} from '@wdio/cucumber-framework';
import FrontPage from '../../src/pages/prc.front.page';

Given(`I am on the front page`, async() => {
    await browser.refresh()
    await browser.maximizeWindow()
    await FrontPage.openPRCCalculator()        
    
    await FrontPage.waitForPageH1()
    await FrontPage.waitForPageH2()
});

When(`I enter my {string},{string},{string},{string}, {string}, {string} and {string}`, async (currentAge: string, retirementAge: string, currentIncome: string, spouseIncome: string, currTotalSavings: string, currAnnualSavings: string, savingsIncRate: string) => {
    await FrontPage.enterGenericInfo(currentAge, retirementAge, currentIncome, spouseIncome, currTotalSavings, currAnnualSavings, savingsIncRate)
});

When(`Press the Calculate button`, async () => {    
    await FrontPage.clickOnCalcButton()            
});

Then(`The alert to fill all required fields should appear`, async () => {
    await FrontPage.waitForAlertToFillData()
    await FrontPage.verifyAlertToFillDataText()
});

Then(`A alert text should appear under test box to fill retirement age`, async () => {
    await FrontPage.waitForAlertRetireAgeGreater()
    await FrontPage.verifyAlertRetireAgeGreaterText()
});