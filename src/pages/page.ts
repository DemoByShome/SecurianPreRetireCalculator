import { browser } from '@wdio/globals'
import { waitForDisplayed } from '../utils/common'

export default class Page{

    pageUrl = 'https://www.securian.com/insights-tools/retirement-calculator.html'
    
    //Standard page headers
    get pageh1() { return $('//h1[text()="How much to save for retirement "]') }
    get pageh2() { return $('//h2[text()="Pre-retirement calculator"]') }    

    //function to validate whether the page has loaded
    //return type: void
    async validatePageLoad(){
        waitForDisplayed(this.pageh1)
        waitForDisplayed(this.pageh2)
    } 

    //function to open the pre-retirement calculator page
    //return type: void
    async openPRCCalculator(){ 
        await browser.refresh()
        await browser.maximizeWindow()            
        return (await browser.url(this.pageUrl))       
    }
    
    //function to maximise the browser window
    //return type: void
    maximizeWindow(){
        browser.maximizeWindow() 
    }
    
    //function to close the browser window
    //return type: void
    closeWindow(){
        browser.closeWindow()
    }
}