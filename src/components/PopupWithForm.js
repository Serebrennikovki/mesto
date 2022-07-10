import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(classSelector, methodSubmit){
        super(classSelector);
        this._methodSubmit = methodSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input-text'); 
        this._form = this._popup.querySelector('.popup__window');
        this._saveButton = this._popup.querySelector('.popup__save-button');
    }
    _getInputValues(){
        this.data ={};
         this._inputList.forEach((element)=>{
            this.data[element.name] = element.value;
         });
         return this.data;
    }

    confirmData(evt){
        this._getInputValues();
        this._methodSubmit(evt, this.data , this);
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt)=>{this.confirmData(evt)});
    }


    setStateSaveButtonLoading(text){
        this._saveButton.textContent = text;
    }

    setStateSaveButtonNormal(text){
        this._saveButton.textContent = text;
    }

    close(){
        this._form.reset();
        super.close();
    }
}