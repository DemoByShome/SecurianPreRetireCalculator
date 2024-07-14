import { $ } from '@wdio/globals';
import Page from './page';

class ResultsPage extends Page{

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
    async waitForResultsHeader() {
        (await this.pageh3).waitForDisplayed({timeout: 10000})
    }

    async waitTillProcessing(){
        (await this.paraSpinnerText).waitForDisplayed({reverse: true, timeout: 10000})
    }

    async waitForResultsMessage(){
        (await this.paraResultMessage).waitForDisplayed({timeout: 10000})
    }

    async waitForMonthlySavingsPlot(){
        (await this.plotMonthlySavings).waitForEnabled({timeout: 10000})        
    }

    async waitForRetirementSavingsAmt(){        
        (await this.tdRetirementSavingsAmt).waitForEnabled({timeout: 10000})
    }   

    //default
    openPRCCalculator(){
        return super.openPRCCalculator()
    }
}

export default new ResultsPage()