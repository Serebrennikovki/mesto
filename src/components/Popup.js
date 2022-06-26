export default class Popup{
    constructor(selectorPopup){
        this._classCSSPopup = selectorPopup;
        this._popup = document.querySelector(this._classCSSPopup);
        this._handleEscKey = this._handleEscClose.bind(this);
    }
    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscKey);

    }
    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup',  this._handleEscKey);
    }
    _handleEscClose(evt){
        if( evt.code === 'Escape'){
            this.close();
        }
    }
    setEventListeners(){
        this._popup.querySelector('.popup__close-button').addEventListener('click',()=>{this.close()});
        this._popup.querySelector('.popup__overlay').addEventListener('mousedown', ()=>{this.close()});
    }
}