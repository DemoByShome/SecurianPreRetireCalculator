import { Given, When, Then} from '@wdio/cucumber-framework';
import FrontPage from '../../src/pages/prc.front.page';
import ResultsPage from '../../src/pages/results.page';
import DefaultCalcValuesPage from '../../src/pages/defaultCalcVal.page';

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

/*When(`I enter my {string},{string},{string},{string}, {string}, {string}, {string}, {string}, {string}`, async(currentAge: string, retirementAge: string, currentIncome: string, spouseIncome: string, currTotalSavings: string, currAnnualSavings: string, savingsIncRate: string, maritalStatus: MaritalStatus, ssOverride: string) => {
    if(maritalStatus.toUpperCase() === MaritalStatus.SINGLE){
        await FrontPage.enterGenericInfo(currentAge, retirementAge, currentIncome, spouseIncome, currTotalSavings, currAnnualSavings, savingsIncRate, MaritalStatus.SINGLE, ssOverride)
    }else if(maritalStatus.toUpperCase() === MaritalStatus.MARRIED){
        await FrontPage.enterGenericInfo(currentAge, retirementAge, currentIncome, spouseIncome, currTotalSavings, currAnnualSavings, savingsIncRate, MaritalStatus.MARRIED, ssOverride)
    }    
});*/

When(`I modify the default calculator values with {string}, {string}, {string}, {string}, {string}`, async(otherIncome: string, yearsToDepend: string, finalIncomePostRetire: string, preRetireInvReturn: string, postRetireInvReturn: string) => {
    await FrontPage.editDefaultCalcValues()
    await DefaultCalcValuesPage.fillDefaultCalcVal(otherIncome, yearsToDepend, finalIncomePostRetire, preRetireInvReturn, postRetireInvReturn)
    await DefaultCalcValuesPage.clickBtnSaveChanges()
});

When(`Press the Calculate button`, async () => {    
    await FrontPage.clickOnCalcButton()            
});

Then(`I should be able to see my retirement savings amount`, async() => {
    await ResultsPage.waitTillThePageLoads()                  
});
