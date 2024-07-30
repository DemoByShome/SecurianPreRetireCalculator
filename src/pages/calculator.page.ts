import { $ } from '@wdio/globals'
import Page from './page';
import { setText, addText, click, waitForDisplayed, expectToExist, logger, setRadioBtn } from '../utils/common';
import { MaritalStatus } from '../enums/marital.status'
import { InclusionFlag } from '../enums/inclusion.flag'
import { RESOURCE_FOLDER } from '../../test/steps/constants/pathConstants';
import { USER_DATA_FILE } from '../../test/steps/constants/dataConstants';
import { userData } from '../../resources/userData'


class CalculatorPage extends Page{ 

    LOG_IDENTIFIER = "CALCULATOR_PAGE::"
    
    //Standard page headers
    get pageh1() { return super.pageh1 }
    get pageh2() { return super.pageh2 }
    
    //Textboxes on the page
    //Static
    get inputCurrentAge() { return $('input#current-age') }    
    get inputRetirementAge() { return $('input#retirement-age') }
    get inputCurrentIncome() { return $('input#current-income') }
    get inputSpouseIncome() { return $('input#spouse-income') }
    get inputCurrTotalSavings() { return $('input#current-total-savings') }
    get inputCurrAnnualSavings() { return $('input#current-annual-savings') }
    get inputSavingsIncRate() { return $('input#savings-increase-rate') }
    //Dynamic
    get inputSSOveride() { return $('input#social-security-override') }

    //Radio button to include Social Security Benefits          
    get radioSSBYes() { return $('//ul[@aria-labelledby="include-social-label"]/li/label[@for="yes-social-benefits"]')}  
    get radioSSBNo() { return $('//ul[@aria-labelledby="include-social-label"]/li/label[@for="no-social-benefits"]') }

    //Radio buttons to input marital status    
    get radioSingle() { return $('//ul[@id="marital-status-ul"]/li/label[@for="single"]') }    
    get radioMarried() { return $('//ul[@id="marital-status-ul"]/li/label[@for="married"]')  }

    //Buttons on the page
    get btnCalculate() { return $('//button[text()="Calculate"]') }
    get btnClearForm() { return $('//button[text()="Clear form"]') }

    //Links on the page 
    get linkAdjDefaultVal() { return $('//a[text()="Adjust default values"]') }

    //Alerts  
    get alertFillAllData() { return $('div#calculator-input-alert') }
    get alertRetireAgeGreater() { return $('//input[@id="retirement-age"]//parent::div/div/span')}

    //Alert Texts
    get alertFillAllDataText() { return $('//div[@id="calculator-input-alert"]/p[text()="Please fill out all required fields"]')  }
    get alertRetireAgeGreaterText() { return $('//input[@id="retirement-age"]//parent::div/div/span[text()="Planned retirement age must be greater than current age"]')}

    //expectedAlertFillDataText = "Please fill out all required fields"
    expectedRetireAgeAlertText = "Planned retirement age must be greater than current age"


    //Default Calculator Dialog Elements

    //dialog header
    get defCalcHeader() {return $('//h1[text()="Default calculator values"]')} 

    //inputs on the dialog
    get inputAddlIncome() { return $('input#additional-income') }
    get inputRetDuration() { return $('input#retirement-duration') }
    get inputExpInflationRate() { return $('//div[@id="expected-inflation-rate-div"]/div/div/input') }
    get inputRetAnnualIncome() { return $('input#retirement-annual-income') }
    get inputPreRetireInvReturn() { return $('input#pre-retirement-roi') }
    get inputPostRetireInvReturn() { return $('input#post-retirement-roi') }

    //radio buttons at the dialog
    get radioIncludeInflation() { return $('//ul[@aria-labelledby="inflation-label"]/li/label[@for="include-inflation"]') }
    get radioExcludeInflation() { return $('//ul[@aria-labelledby="inflation-label"]/li/label[@for="exclude-inflation"]') }

    //buttons at the dialog
    get btnSaveChanges() { return $('//button[text()="Save changes"]') }
    get btnCancel() { return $('//button[text()="Cancel"]') }

    //Calculator page functions

    //function to enter values into the mandatiory fields of the calculator page
    //return type: void 
    async enterUserInfo(includeSocialSecIncome?: string, maritalStatus?: string){                      
        logger(this.LOG_IDENTIFIER + `Test data captured from file: ` + RESOURCE_FOLDER + USER_DATA_FILE)
        logger(this.LOG_IDENTIFIER + `Test data entry started for the fields on the calculator page.`)

        this.validatePageLoad()        
        try{
            await setText(this.inputCurrentAge, userData.mandatoryFields.currentAge)
        }catch(error){
            if(error instanceof Error){
                addText(this.inputCurrentAge, userData.mandatoryFields.currentAge)
            }
        }
        await setText(this.inputRetirementAge, userData.mandatoryFields.retirementAge)
        await setText(this.inputCurrentIncome, userData.mandatoryFields.currentAnnualIncome)  
        await setText(this.inputSpouseIncome, userData.mandatoryFields.spouseAnnualIncome)
        await setText(this.inputCurrTotalSavings, userData.mandatoryFields.currentRetirementSavings)
        await setText(this.inputCurrAnnualSavings, userData.mandatoryFields.annualSavingsPercentage)
        await setText(this.inputSavingsIncRate, userData.mandatoryFields.savingsIncreaseRate)
        if(typeof(includeSocialSecIncome) !== undefined){
            if(String(includeSocialSecIncome).toUpperCase() == InclusionFlag.INCLUDED){ //include social security option

                await click(this.radioSSBYes)
                
                if(typeof(maritalStatus) !== undefined){
                    if(String(maritalStatus).toUpperCase() === MaritalStatus.MARRIED){
                        await waitForDisplayed(this.radioMarried)
                        await click(this.radioMarried)
                    }else{
                        logger(this.LOG_IDENTIFIER + "Continuing with Marital Status = 'Single'.")
                    }
                }else{
                    logger(this.LOG_IDENTIFIER + "Continuing with Marital Status = 'Single'.")
                }
                           
        
                await waitForDisplayed(this.inputSSOveride)
        
                if(userData.socialSecIncomeFields.socialSecOverrideAmt !== null || String(userData.socialSecIncomeFields.socialSecOverrideAmt).length !==0){
                    try{
                        await setText(this.inputSSOveride, userData.socialSecIncomeFields.socialSecOverrideAmt)
                    }catch(error){
                        await waitForDisplayed(this.inputSSOveride)
                        await setText(this.inputSSOveride, userData.socialSecIncomeFields.socialSecOverrideAmt)
                    }                        
                }else{
                    logger(this.LOG_IDENTIFIER + "Continuing with no Social Security Override amount.")
                } 
        
                logger(this.LOG_IDENTIFIER + `Test data entry completed for the fields on the page 
                    with Social Security Benefits = Yes.`)           
            }else if(String(includeSocialSecIncome).toUpperCase() == InclusionFlag.EXCLUDED){
                logger(this.LOG_IDENTIFIER + "Continuing with no social security income option.")
                logger(this.LOG_IDENTIFIER + `Test data entry completed for the fields on the page 
                    with Social Security Benefits = No.`)            
            } 
        } else{
            logger(this.LOG_IDENTIFIER + "Continuing with no social security income option.")
            logger(this.LOG_IDENTIFIER + `Test data entry completed for the fields on the page 
                    with Social Security Benefits = No.`) 
        }    
    } 

    //function to enter only text values into the mandatiory fields of the calculator page
    //return type: void 
    async enterTextForMandatoryFields(){                      
        logger(this.LOG_IDENTIFIER + `Test data captured from file: ` + RESOURCE_FOLDER + USER_DATA_FILE)
        logger(this.LOG_IDENTIFIER + `Test data entry started for the fields on the calculator page.`)

        this.validatePageLoad()        
        
        await addText(this.inputCurrentAge, userData.negativeSC1Fields.currentAge)
        await addText(this.inputRetirementAge, userData.negativeSC1Fields.retirementAge)    
        await setText(this.inputCurrentIncome, userData.negativeSC1Fields.currentAnnualIncome)  
        await setText(this.inputSpouseIncome, userData.negativeSC1Fields.spouseAnnualIncome)
        await setText(this.inputCurrTotalSavings, userData.negativeSC1Fields.currentRetirementSavings)
        await setText(this.inputCurrAnnualSavings, userData.negativeSC1Fields.annualSavingsPercentage)
        await setText(this.inputSavingsIncRate, userData.negativeSC1Fields.savingsIncreaseRate)            
    }

    //function to enter current age greater than retirement age into the mandatiory fields of the calculator page
    //return type: void 
    async enterLessRetAgeForMandatoryFields(){                      
        logger(this.LOG_IDENTIFIER + `Test data captured from file: ` + RESOURCE_FOLDER + USER_DATA_FILE)
        logger(this.LOG_IDENTIFIER + `Test data entry started for the fields on the calculator page.`)

        this.validatePageLoad()        
        try{
            await setText(this.inputCurrentAge, userData.negativeSC2Fields.currentAge)
        }catch(error){
            if(error instanceof Error){
                addText(this.inputCurrentAge, userData.negativeSC2Fields.currentAge)
            }
        }
        await setText(this.inputRetirementAge, userData.negativeSC2Fields.retirementAge)
        await setText(this.inputCurrentIncome, userData.mandatoryFields.currentAnnualIncome)  
        await setText(this.inputSpouseIncome, userData.mandatoryFields.spouseAnnualIncome)
        await setText(this.inputCurrTotalSavings, userData.mandatoryFields.currentRetirementSavings)
        await setText(this.inputCurrAnnualSavings, userData.mandatoryFields.annualSavingsPercentage)
        await setText(this.inputSavingsIncRate, userData.mandatoryFields.savingsIncreaseRate)            
    }
    
    //function to click on Calculate button
    //return type: void
    async clickOnCalcButton(){
        try{
            await click(this.btnCalculate)            
        }catch(error){            
            if(error instanceof Error){                
                (await this.btnCalculate).click({x:100, y:15})
            }else throw error           
        }        
    }

    //function to click on the link to enable the dialog to modify default calculator values
    //return type: void 
    async editDefaultCalcValues(){
        await click(this.linkAdjDefaultVal)
        logger(this.LOG_IDENTIFIER + `Clicked on ${await this.linkAdjDefaultVal.selector} to modify default calculator values.`) 
    }

    //function to wait until the alert to fill all mandatory data appears on the pre-retitement calculator page
    //return type: void
    async waitForAlertToFillData(){
        logger(this.LOG_IDENTIFIER + `Waiting for ${await this.alertFillAllData.selector} to be displayed.`)
        await waitForDisplayed(this.alertFillAllData)        
    }

    //function to verify whether the alert to fill all mandatory data appears with the alert text
    //return type: void
    async verifyAlertToFillDataText(){
        logger(this.LOG_IDENTIFIER + `Waiting for ${await this.alertFillAllData.selector} to be displayed.`)
        await this.waitForAlertToFillData()
        logger(this.LOG_IDENTIFIER + `Waiting for ${await this.alertFillAllDataText.selector} to be displayed.`)       
        await expectToExist(this.alertFillAllDataText)
    }

    //function to wait util the Alert to enter retirement age greater than current age appears
    //return type: void 
    async waitForAlertRetireAgeGreater(){
        logger(this.LOG_IDENTIFIER + `Waiting for ${await this.alertRetireAgeGreater.selector} to be displayed.`)
        await waitForDisplayed(this.alertRetireAgeGreater)
    }

    //function to verify the text of the alert to enter retirement age greater than current age appears with the alert  
    //return type: void
    async verifyAlertRetireAgeGreaterText(){
        logger(this.LOG_IDENTIFIER + `Waiting for ${await this.alertRetireAgeGreater.selector} to be displayed.`)
        await this.waitForAlertRetireAgeGreater()
        logger(this.LOG_IDENTIFIER + `Waiting for ${await this.alertRetireAgeGreaterText.selector} to be displayed.`)
        await expectToExist(this.alertRetireAgeGreaterText)               
    } 
    
    
    //Default calculator dialog functions
    
    //function to wait until the dialog to modify default calculator values loads
    //return type: void
    async waitForDefCalcDialogLoad(){
        logger(this.LOG_IDENTIFIER + `Waiting for Dialog with fields for default calculator values to be displayed.`)
        waitForDisplayed(this.defCalcHeader)
    }
    
    //function to click on button Save Changes on the dialog to modify default calculator values
    //return type: void
    async clickBtnSaveChanges(){        
        click(this.btnSaveChanges)
        logger(this.LOG_IDENTIFIER + `Clicked on element: ${await this.btnSaveChanges.selector}`)
    }

    //function to fill all the values under the dialog to modify default calculator values
    //return type: void
    async fillDefaultCalcVal(inclInflationDetails: string){        
        logger(this.LOG_IDENTIFIER + `Test data captured from file: ` + RESOURCE_FOLDER + USER_DATA_FILE)
        logger(this.LOG_IDENTIFIER + `Test data entry started for the fields on the Default Calculator Values dialog.`)
        this.editDefaultCalcValues()
        this.waitForDefCalcDialogLoad()
        setText(this.inputAddlIncome, userData.defaultCalcValues.otherIncome)
        setText(this.inputRetDuration, userData.defaultCalcValues.yearsToDepend)

        if(inclInflationDetails.toUpperCase() == InclusionFlag.INCLUDED){
            await setRadioBtn(this.radioIncludeInflation)

            await waitForDisplayed(this.inputExpInflationRate)
            await setText(this.inputExpInflationRate, userData.defCalcInflationFields.expectedInflationRate)
        }else{
            logger(this.LOG_IDENTIFIER + "Continuing with no inflation details on the default calculator")
        }      

        setText(this.inputRetAnnualIncome, userData.defaultCalcValues.finalIncomePostRetire)
        setText(this.inputPreRetireInvReturn, userData.defaultCalcValues.preRetireInvReturn)
        setText(this.inputPostRetireInvReturn, userData.defaultCalcValues.postRetireInvReturn) 
        
        this.clickBtnSaveChanges()
        logger(this.LOG_IDENTIFIER + `Test data entry completed for the fields on the Default Calculator Values dialog.`)               
    }

    

    //defaults inherited functions

    //function to validate whether the pre-retirement calculator page has loaded successfully & properly
    //return type: void
    async validatePageLoad(){
        return await super.validatePageLoad()
    } 

    //function to open the pre-retirement calculator page
    //return type: void
    async openPRCCalculator(){
        return await super.openPRCCalculator()
    }

    //function to close the browser window
    //return type: void
    async closeBrowserWindow(){
        return await super.closeBrowserWindow()
    }

}

export default new CalculatorPage()