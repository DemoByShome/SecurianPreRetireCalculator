import { browser } from '@wdio/globals'

export default class Page{

    pageUrl = 'https://www.securian.com/insights-tools/retirement-calculator.html'
    
    //Standard page headers
    get pageh1() { return $('//h1[text()="How much to save for retirement "]') }
    get pageh2() { return $('//h2[text()="Pre-retirement calculator"]') }    

    openPRCCalculator(){             
        return browser.url(this.pageUrl)        
    }
    
    maximizeWindow(){
        browser.maximizeWindow() 
    }
    
    closeWindow(){
        browser.closeWindow()
    }
}