export default class Card{
    constructor(name, url, selectorTemplate,method){
        this._name = name;
        this._url = url;
        this._template = selectorTemplate;
        this._openImage = method;
        
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
        this._cardObject =  this._element.querySelector('.card__name');
        this._cardButttonLike = this._element.querySelector('.card__button-like');
        this._cardImage = this._element.querySelector('.card__image');
        this._setEventListeners();

        this._cardImage.src = this._url;
        this._cardImage.alt = this._name;
        this._cardObject.textContent = this._name;
        return this._element;
    }

    _handleButtonLike(){
        this._cardButttonLike.classList.toggle('card__button-like_state_active');
    }

    _handleClickDelete(){
        this._element.remove();
    }

    _setEventListeners(){
        this._cardButttonLike.addEventListener('click', () => {this._handleButtonLike()});
        this._element.querySelector('.card__button-del').addEventListener('click', ()=>{this._handleClickDelete()});
        this._cardImage.addEventListener('click', ()=>{this._openImage(this._url,this._name)});
    }
}
