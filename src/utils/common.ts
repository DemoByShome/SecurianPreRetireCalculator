import {ChainablePromiseElement} from "webdriverio";
import report from '@wdio/allure-reporter';

const LOG_IDENTIFIER = "COMMON_UTILS:: "

export const logger = (input: string) => {
    console.log(`STEP: ${input}`)
    report.addStep(`STEP: ${input}`)
}

export const click = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {
    await waitForClickable(elem)
    await elem.click()    
    logger(LOG_IDENTIFIER + `Clicked on element: ${await elem.selector}`)
}

export const setRadioBtn = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {      
    if(await elem.isSelected()){
        logger(LOG_IDENTIFIER + `Radio button already selected: ${await elem.selector}`)
    }else{
        (await elem).scrollIntoView()                              
        await elem.click()
        logger(LOG_IDENTIFIER + `Selected radio button: ${await elem.selector}`)
    }    
}

export const setText = async(elem: ChainablePromiseElement<WebdriverIO.Element>, text: string) => {        
    await elem.click()
    await elem.addValue(text)    
    logger(LOG_IDENTIFIER + `Entered value ${text} into Webelemnt ${await elem.selector}`)    
}

export const addText = async(elem: ChainablePromiseElement<WebdriverIO.Element>, text: string) => {     
    try{
        await elem.addValue(text) 
    }catch(error){
        if(error instanceof Error){
            await elem.waitForDisplayed({timeout: 10000})
            await elem.waitForEnabled({timeout: 10000})
            await elem.addValue(text)
        }        
    }
       
    logger(LOG_IDENTIFIER + `Entered value ${text} into Webelemnt ${await elem.selector}`)    
}

export const setElementText = async(elem: ChainablePromiseElement<WebdriverIO.Element>, text: string) => {        
    let elemId = await elem.getAttribute("id")
    await elem.elementSendKeys(elemId, text)
    logger(LOG_IDENTIFIER + `Entered value ${text} into Webelemnt ${await elem.selector}`)    
}

export const waitForDisplayed = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {
    await elem.waitForDisplayed({timeout: 10000});    
    logger(LOG_IDENTIFIER + `Webelemnt ${await elem.selector} is now displayed.`)  
}

export const waitForClickable = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {
    await elem.waitForClickable({timeout: 10000});    
    logger(LOG_IDENTIFIER + `Webelemnt ${await elem.selector} is now clickable.`)  
}

export const waitForEnabled = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {
    await elem.waitForEnabled({timeout: 10000});
    logger(LOG_IDENTIFIER + `Webelemnt ${await elem.selector} is now enabled.`)  
}

export const waitTillDisappear = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {
    if(await elem.isDisplayed()){
        await elem.waitForDisplayed({reverse: true, timeout: 10000});
        logger(LOG_IDENTIFIER + `Webelement ${await elem.selector} is now displayed.`)  
    }else{
        logger(LOG_IDENTIFIER + `Webelement ${await elem.selector} is not present on the page or has already disappeared`)  
    }
    
}

export const expectToExist = async(elem: ChainablePromiseElement<WebdriverIO.Element>) =>{
    expect(await elem).toExist
    logger(LOG_IDENTIFIER + `Webelement ${await elem.selector} exists on the page.`)
}