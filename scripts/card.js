export default class Card{
    constructor(name, url, selectorTemplate){
        this._name = name;
        this._url = url;
        this._template = selectorTemplate;
    }

    _getTemplate(){
        const cardElement = document.querySelector(this._template)
        .content
        .querySelector('.card')
        .cloneNode(true);

        return cardElement;
    }

     render(){
        this._element = this._getTemplate();
        this._setEventListeners();

        
        this._element.querySelector('.card__image').src = this._url;
        this._element.querySelector('.card__name').textContent = this._name;
        return this._element;
    }

    _handleButtonLike(){
        this._element.querySelector('.card__button-like').classList.toggle('card__button-like_state_active');
    }

    _deleteClickHandler(){
        this._element.remove();
    }

    _setEventListeners(){
        this._element.querySelector('.card__button-like').addEventListener('click', () => {this._handleButtonLike()});
        this._element.querySelector('.card__button-del').addEventListener('click', ()=>{this._deleteClickHandler()});
    }
}
