import {ChainablePromiseElement} from "webdriverio";

export const logger = (input: string) => {
    console.log(`STEP: ${input}`)
}

export const click = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {
    await waitForClickable(elem)
    await elem.click()
    logger(`COMMON_UTILS:: Clicked on element: ${await elem.selector}`)
}

export const setRadioBtn = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {      
    if(await elem.isSelected()){
        logger(`COMMON_UTILS:: Radio button already selected: ${await elem.selector}`)
    }else{
        (await elem).scrollIntoView()                              
        await elem.click()
        logger(`COMMON_UTILS:: Selected radio button: ${await elem.selector}`)
    }    
}

export const setText = async(elem: ChainablePromiseElement<WebdriverIO.Element>, text: string) => {        
    await elem.click()
    await elem.addValue(text)    
    logger(`COMMON_UTILS:: Entered value ${text} into Webelemnt ${await elem.selector}`)    
}

export const setElementText = async(elem: ChainablePromiseElement<WebdriverIO.Element>, text: string) => {        
    let elemId = await elem.getAttribute("id")
    await elem.elementSendKeys(elemId, text)
    logger(`COMMON_UTILS:: Entered value ${text} into Webelemnt ${await elem.selector}`)    
}

export const waitForDisplayed = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {
    await elem.waitForDisplayed({timeout: 10000});    
    logger(`COMMON_UTILS:: Webelemnt ${await elem.selector} is now displayed.`)  
}

export const waitForClickable = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {
    await elem.waitForClickable({timeout: 10000});    
    logger(`COMMON_UTILS:: Webelemnt ${await elem.selector} is now clickable.`)  
}

export const waitForEnabled = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {
    await elem.waitForEnabled({timeout: 10000});
    logger(`COMMON_UTILS:: Webelemnt ${await elem.selector} is now enabled.`)  
}

export const waitTillDisappear = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {
    if(await elem.isDisplayed()){
        await elem.waitForDisplayed({reverse: true, timeout: 10000});
        logger(`COMMON_UTILS:: Webelement ${await elem.selector} is now displayed.`)  
    }else{
        logger(`COMMON_UTILS:: Webelement ${await elem.selector} is not present on the page or has already disappeared`)  
    }
    
}


