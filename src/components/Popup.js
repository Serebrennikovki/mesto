export default class Popup{
    constructor(selectorPopup){
        this._classCSSPopup = selectorPopup;
    }
    open(){
        this._popup = document.querySelector(this._classCSSPopup);
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }
    close(){
        this._popup.classList.remove('popup_opened');
        this._buttonClose.removeEventListener('click', ()=>{this.close()});
    }
    _handleEscClose(evt){
        if( evt.code === 'Escape'){
            this.close();
        }
    }
    setEventListeners(){
        this._buttonClose = this._popup.querySelector('.popup__close-button');
        this._buttonClose.addEventListener('click', ()=>{this.close()});
        document.addEventListener('keyup', (evt)=>{this._handleEscClose(evt)});
        this._popup.querySelector('.popup__overlay').addEventListener('mousedown', ()=>{this.close()});
    }
}