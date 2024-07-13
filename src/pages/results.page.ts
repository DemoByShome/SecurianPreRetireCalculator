import { $,$$ } from '@wdio/globals';
import Page from './page';

class ResultsPage extends Page{

    //Standard page headers
    get pageh1() { return super.pageh1 }
    get pageh2() { return super.pageh2 }
    get pageh3() { return $('//h3[text()="Results"]') }
    get pageh4FullResults() { return $('//h4[text()="Full results"]') }

    //Result message
    get paraResultMessage() { return $('p#result-message') }

    get plotMonthlySavings() { return $('canvas#results-chart') }

    get tableFullResults() { return $('table#detailed-results-table') }

    get rowsFullResults() { return $$('table#detailed-results-table>tbody>tr')}
    

    get btnEditInfo() { return $('//button[contains(text(),"Edit")][contains(text(),"info") ]') }
    get btnSeeFullResults() { return $('//button[contains(text(),"See")][contains(text(),"full") ][contains(text(),"results") ]') }

    openPRCCalculator(){
        return super.openPRCCalculator()
    }
}

export default new ResultsPage()