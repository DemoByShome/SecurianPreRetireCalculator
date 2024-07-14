import { Given, When, Then} from '@wdio/cucumber-framework';
import FrontPage from '../../src/pages/prc.front.page';
import ResultsPage from '../../src/pages/results.page';

Given(`I am on the front page`, async() => {
    await FrontPage.openPRCCalculator()
    await FrontPage.waitForPageH1()
    await FrontPage.waitForPageH2()
    //expect( (await FrontPage.pageh1).getText()).toEqual("How much to save for retirement ")
    //expect( (await FrontPage.pageh2).getText()).toEqual("Pre-retirement calculator") 
});

When(`I enter my {string},{string},{string},{string}, {string}, {string} and {string}`, async (currentAge: string, retirementAge: string, currentIncome: string, spouseIncome: string, currTotalSavings: string, currAnnualSavings: string, savingsIncRate: string) => {
    await FrontPage.enterGenericInfo(currentAge, retirementAge, currentIncome, spouseIncome, currTotalSavings, currAnnualSavings, savingsIncRate)
});

When(`Press the Calculate button`, async () => {
    await FrontPage.clickOnCalcButton()
});

Then(`I should be able to see my retirement savings amount`, async() => {
    await ResultsPage.waitForResultsHeader()
    await ResultsPage.waitTillProcessing()
    await ResultsPage.waitForResultsMessage()
    await ResultsPage.waitForMonthlySavingsPlot()
    await ResultsPage.waitForRetirementSavingsAmt()
    //expect(await ResultsPage.getRetirementSavingsAmt()).toEqual(retirementSavings)        
});
