import { browser } from '@wdio/globals'
import { waitForDisplayed, logger } from '../utils/common'

export default class Page{

    LOG_IDENTIFIER = "PAGE:: "

    pageUrl = 'https://www.securian.com/insights-tools/retirement-calculator.html'
    
    //Standard page headers
    get pageh1() { return $('//h1[text()="How much to save for retirement "]') }
    get pageh2() { return $('//h2[text()="Pre-retirement calculator"]') }    

    //function to validate whether the page has loaded
    //return type: void
    async validatePageLoad(){
        logger(this.LOG_IDENTIFIER + `Waiting for the page headers ` + await this.pageh1.selector 
            + ` & ` + await this.pageh2.selector + ` to be displayed.`)
        await waitForDisplayed(this.pageh1)
        await waitForDisplayed(this.pageh2)
    } 

    //function to open the pre-retirement calculator page
    //return type: void
    async openPRCCalculator(){
        logger(this.LOG_IDENTIFIER + `Loading Securian Pre-retirement calculation for testing`)
        await this.maximizeBrowserWindow()
        await this.refreshBrowser()                    
        return (await browser.url(this.pageUrl))       
    }

    //function to refresh browser
    //return type: void
    async refreshBrowser(){
        await browser.refresh()
        logger(this.LOG_IDENTIFIER + `Refreshed browser window.`) 
    }
    
    //function to maximise the browser window
    //return type: void
    async maximizeBrowserWindow(){
        await browser.maximizeWindow()
        logger(this.LOG_IDENTIFIER + `Maximized browser window for better visibility.`) 
    }
    
    //function to close the browser window
    //return type: void
    async closeBrowserWindow(){
        await browser.closeWindow()
        logger(this.LOG_IDENTIFIER + `Closed the browser window.`) 
    }
}