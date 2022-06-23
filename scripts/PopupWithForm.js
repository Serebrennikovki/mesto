import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(classSelector, methodSubmit){
        super(classSelector);
        this._methodSubmit = methodSubmit;
    }
    _getInputValues(){
        this._inputList = this._popup.querySelectorAll('.popup__input-text');
        this.data ={};
         this._inputList.forEach((element, index)=>{
            this.data[index] = element.value;
         });
    }
    setEventListeners(){
        super.setEventListeners();
        this._popup.querySelector('.popup__save-button').addEventListener('submit', ()=> methodSubmit(evt));
    }
    close(){
        this._getInputValues();
        this._popup.querySelector('.popup__window').reset();
        super.close();
        return this.data;
    }
}