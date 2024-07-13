import { $,$$ } from '@wdio/globals';
import Page from './page';
import { click } from '../utils/common';

class ResultsPage extends Page{

    //Standard page headers
    get pageh1() { return super.pageh1 }
    get pageh2() { return super.pageh2 }
    get pageh3() { return $('//h3[text()="Results"]') }
    get pageh4FullResults() { return $('//h4[text()="Full results"]') }

    //Result message
    get paraResultMessage() { return $('p#result-message') }

    get tdRetirementSavingsAmt() { return $('td#retirement-amount-results') }

    get plotMonthlySavings() { return $('canvas#results-chart') }

    get tableFullResults() { return $('table#detailed-results-table') }

    get rowsFullResults() { return $$('table#detailed-results-table>tbody>tr')}
    

    get btnEditInfo() { return $('//button[contains(text(),"Edit")][contains(text(),"info") ]') }
    get btnSeeFullResults() { return $('//button[contains(text(),"See")][contains(text(),"full") ][contains(text(),"results") ]') }

    async waitForResultsHeader() {
        (await this.pageh3).waitForDisplayed({timeout: 10000})
    }

    async waitForResultsMessage(){
        (await this.paraResultMessage).waitForDisplayed({timeout: 10000})
    }

    async waitForMonthlySavingsPlot(){
        (await this.plotMonthlySavings).waitForEnabled({timeout: 10000})        
    }

    async getRetirementSavingsAmt(): Promise<string>{
        (await this.tdRetirementSavingsAmt).waitForDisplayed({timeout: 10000}) 
        return (await this.tdRetirementSavingsAmt).getText()
    }

    async clickOnBtnSeeFullResults(){
        await click(this.btnSeeFullResults)
    }

    async waitForFullResultsTbl(){
        (await this.tableFullResults).waitForDisplayed({timeout:10000})
    }

    async getNoOfFullResultsRows(): Promise<number>{
        return (await this.rowsFullResults.length)
    }

    openPRCCalculator(){
        return super.openPRCCalculator()
    }
}

export default new ResultsPage()