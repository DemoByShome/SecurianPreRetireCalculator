import { $ } from '@wdio/globals';
import Page from './page';
import { logger, waitForDisplayed, waitTillDisappear} from '../utils/common';

class ResultsPage extends Page{

    LOG_IDENTIFIER = "RESULTS_PAGE::"

    //Standard page headers
    get pageh1() { return super.pageh1 }
    get pageh2() { return super.pageh2 }
    get pageh3() { return $('//h3[text()="Results"]') }
    get pageh4FullResults() { return $('//h4[text()="Full results"]') }

    //Processing spinner 
    get paraSpinnerText() { return $('p#calcSpinnerOnly-text') }

    //Result message
    get paraResultMessage() { return $('p#result-message') }
    
    //Plot & Massage showing the retirrement savings info
    get plotMonthlySavings() { return $('canvas#results-chart') }
    get tdRetirementSavingsAmt() { return $('td#retirement-amount-results') }
    
    //Buttons on the page
    get btnEditInfo() { return $('//button[contains(text(),"Edit")][contains(text(),"info") ]') }
    
    //all wait functions
    async waitTillResultDisplayed(){                
        (await this.pageh3).waitForExist({timeout:10000})
        await waitForDisplayed(this.pageh3)
        await waitTillDisappear(this.paraSpinnerText)
        //await waitForDisplayed(this.paraResultMessage)
        await waitForDisplayed(this.plotMonthlySavings)
        await waitForDisplayed(this.tdRetirementSavingsAmt)
        logger(this.LOG_IDENTIFIER + `The Retirement Calculation Results are now available on the Results Page.`)
    }
       

    //defaults
    async closeWindow(){
       return await super.closeBrowserWindow()
    }
}

export default new ResultsPage()