import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(classSelector, methodSubmit){
        super(classSelector);
        this._methodSubmit = methodSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input-text'); 
        this._form = this._popup.querySelector('.popup__window');
    }
    getInputValues(){
        this.data ={};
         this._inputList.forEach((element, index)=>{
            this.data[index] = element.value;
         });
         return this.data;
    }
    setEventListeners(){
        super.setEventListeners();
        this._popup.querySelector('.popup__save-button').addEventListener('submit', ()=> {methodSubmit(evt, this._getInputValues.bind(this))});
    }
    close(){
        this._form.reset();
        super.close();
    }
}