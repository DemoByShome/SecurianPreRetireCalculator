import { $ } from '@wdio/globals'
import Page from './page';
import { setText, setRadioBtn, setElementText, click } from '../utils/common';
import { MaritalStatus } from '../utils/marital.status';

class FrontPage extends Page{ 
    
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
    get radioSSBYes() { return $('input#yes-social-benefits') }      
    get radioSSBNo() { return $('input#no-social-benefits') }

    //Radio buttons to input marital status    
    get radioSingle() { return $('input#single') }
    get radioMarried() { return $('input#married')  }

    //Buttons on the page
    get btnCalculate() { return $('//button[text()="Calculate"]') }
    get btnClearForm() { return $('//button[text()="Clear form"]') }

    //Links on the page 
    get linkAdjDefaultVal() { return $('//a[text()="Adjust default values"]') }

    async waitForPageH1(){
        (await this.pageh1).waitForDisplayed({timeout:10000})        
    }

    async waitForPageH2(){
        (await this.pageh2).waitForDisplayed({timeout:10000})
    }    

    async enterGenericInfo(currentAge: string, retirementAge: string, currentIncome: string, spouseIncome: string, currTotalSavings: string, currAnnualSavings: string,  savingsIncRate: string, maritalStatus?: MaritalStatus, ssOveride?: string){
        await setText(this.inputCurrentAge, currentAge)
        await setText(this.inputRetirementAge, retirementAge)
        await setText(this.inputCurrentIncome, currentIncome)  
        await setText(this.inputSpouseIncome, spouseIncome)
        await setText(this.inputCurrTotalSavings, currTotalSavings)
        await setText(this.inputCurrAnnualSavings, currAnnualSavings)
        await setText(this.inputSavingsIncRate,savingsIncRate)
        if((typeof(maritalStatus) !== 'undefined') && (typeof(ssOveride) !== 'undefined')) { 
            (await this.radioSSBYes).click()
            if(MaritalStatus.MARRIED === maritalStatus){ 
                (await this.radioMarried).waitForEnabled({timeout: 5000});
                (await this.radioMarried).click()
            }                
            else if(MaritalStatus.SINGLE === maritalStatus){ setRadioBtn(this.radioSingle) }             
            if(ssOveride.trim.length != 0){                       
            await setElementText(this.inputSSOveride, ssOveride)
            }
        }else{
            await setRadioBtn(this.radioSSBNo)
        }     
    } 
    
    async clickOnCalcButton(){
        await click(this.btnCalculate)
        //(await this.btnCalculate).click({x:100, y:15})
    }

    async editDefaultCalcValues(){
        (await this.linkAdjDefaultVal).click()
    }

    //defaults
    openPRCCalculator(){
        return super.openPRCCalculator()
    }

    closeBrowser(): void {
        return super.closeWindow()
    }

}

export default new FrontPage()