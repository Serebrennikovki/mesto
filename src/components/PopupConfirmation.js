import Popup from "./Popup";

export default class PopupConfirmation extends Popup{
    constructor(selectorPopup, methodSubmit){
        super(selectorPopup);
        this._method = methodSubmit;
        this._saveButton = this._popup.querySelector('.popup__save-button');
    }
    
    open(id, element){
        this._idCard = id;
        this._element = element;
        super.open();
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.querySelector('.popup__save-button_type_confirmation').addEventListener('click', ()=>{this._method(this._idCard,this._element);})
    }

    setStateSaveButton(text){
        this._saveButton.textContent = text;
    }
}