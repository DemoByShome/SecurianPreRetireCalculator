import {ChainablePromiseElement} from "webdriverio";

export const logger = (input: string) => {
    console.log(`STEP: ${input}`)
}

export const click = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {
    await elem.click()
    logger(`COMMON_UTILS:: Clicked on element: ${await elem.selector}`)
}

export const setRadioBtn = async(elem: ChainablePromiseElement<WebdriverIO.Element>) => {
    await elem.click()
    logger(`COMMON_UTILS:: Chosen radio button: ${await elem.selector}`)
}

export const setText = async(elem: ChainablePromiseElement<WebdriverIO.Element>, text: string) => {
    await elem.setValue(text)
    logger(`COMMON_UTILS:: Entered value ${text} into Webelemnt ${await elem.selector}`)
}


