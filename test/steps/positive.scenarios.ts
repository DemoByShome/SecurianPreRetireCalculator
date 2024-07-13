import { Given, When, Then} from '@wdio/cucumber-framework';
import FrontPage from '../../src/pages/prc.front.page';
import ResultsPage from '../../src/pages/results.page';
import { click } from '../../src/utils/common';

Given(`I am on the front page`, async() => {
    await FrontPage.openPRCCalculator()
    expect( (await FrontPage.pageh1).getText()).toEqual("How much to save for retirement ")
    expect( (await FrontPage.pageh2).getText()).toEqual("Pre-retirement calculator") 
});

When(`I enter my {string},{string},{string},{string}, {string}, {string} and {string}`, async (currentAge: string, retirementAge: string, currentIncome: string, spouseIncome: string, currTotalSavings: string, currAnnualSavings: string, savingsIncRate: string) => {
    await FrontPage.enterGenericInfo(currentAge, retirementAge, currentIncome, spouseIncome, currTotalSavings, currAnnualSavings, savingsIncRate)
});

When(`Press the Calculate button`, async () => {
    await FrontPage.clickOnCalcButton()
});

Then(`I should be able to see my {string}`, async(retirementSavings: string) => {
    await ResultsPage.waitForResultsHeader()
    await ResultsPage.waitForResultsMessage()
    await ResultsPage.waitForMonthlySavingsPlot()
    expect(await ResultsPage.getRetirementSavingsAmt()).toEqual(retirementSavings)        
});

When(`I clicked on the See Full Results button`, async() => {
    await click(ResultsPage.btnSeeFullResults)        
});

Then(`I get the list of qualifying retirement amount at the end of each year`, async() => {
    await ResultsPage.waitForFullResultsTbl()
    expect(await ResultsPage.getNoOfFullResultsRows()).toBeGreaterThan(0)
});