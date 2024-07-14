import { browser } from '@wdio/globals'

export default class Page{

    //Standard page headers
    get pageh1() { return $('//h1[text()="How much to save for retirement "]') }
    get pageh2() { return $('//h2[text()="Pre-retirement calculator"]') }
    
    openPRCCalculator(){
        browser.maximizeWindow()        
        return browser.url('https://www.securian.com/insights-tools/retirement-calculator.html')
    }    
}