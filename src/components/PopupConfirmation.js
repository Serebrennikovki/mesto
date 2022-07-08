import Popup from "./Popup";

export default class PopupConfirmation extends Popup{
    constructor(selectorPopup, methodSubmit){
        super(selectorPopup);
        this._method = methodSubmit;
    }
    open(){
        super.open();
    }
    setEventListeners(id){
        super.setEventListeners();
        this._idCard = id;
        this._popup.querySelector('.popup__save-button_type_confirmation').addEventListener('click', ()=>{this._method(this._idCard);})
        console.log(this._idCard);
    }
}