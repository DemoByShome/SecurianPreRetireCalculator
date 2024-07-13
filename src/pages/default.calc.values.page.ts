import { $ } from '@wdio/globals'
import { setRadioBtn, setText } from '../utils/common'

export default class DefaultCalcValuesPage{

    get inputAddlIncome() { return $('input#additional-income') }
    get inputRetDuration() { return $('input#retirement-duration') }
    get inputExpInflationRate() { return $('input#expected-inflation-rate') }
    get inputRetAnnualIncome() { return $('input#retirement-annual-income') }
    get inputPreRetireInvReturn() { return $('input#pre-retirement-roi') }
    get inputPostRetireInvReturn() { return $('input#post-retirement-roi') }

    get radioIncludeInflation() { return $('input#include-inflation') }
    get radioExcludeInflation() { return $('input#exclude-inflation') }

    get btnSaveChanges() { return $('//button[text()="Save changes"]') }
    get btnCancel() { return $('//button[text()="Cancel"]') }

    async fillDefaultCalcVal(addlIncome: string, retDuration: string, retAnnualIncome: string, preRetireInvReturn: string, postRetireInvReturn: string, expInflationRate?: string){
        setText(this.inputAddlIncome, addlIncome)
        setText(this.inputRetDuration, retDuration)
        setText(this.inputRetAnnualIncome, retAnnualIncome)
        setText(this.inputPreRetireInvReturn, preRetireInvReturn)
        setText(this.inputPostRetireInvReturn, postRetireInvReturn)
        if (typeof(expInflationRate) !== 'undefined') {
            setRadioBtn(this.radioIncludeInflation)
        }else{
            setRadioBtn(this.radioExcludeInflation)
        }
    }

    


}