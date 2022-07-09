export default class Card{
    constructor(name, url, amountLikes, idCard, selectorTemplate, funcOpenPopup,funcCardDelete,funcChangeButtonLike){
        this._name = name;
        this._url = url;
        this._likes = amountLikes;
        this._template = selectorTemplate;
        this._openImage = funcOpenPopup;
        this._openPopupConfirmation = funcCardDelete;
        this._changeButtonLike = funcChangeButtonLike;
        this._id = idCard;
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
        this._amountLike = this._element.querySelector('.card__amount-like');
        this._cardButtonDel = this._element.querySelector('.card__button-del');
        this._setEventListeners();

        this._cardImage.src = this._url;
        this._cardImage.alt = this._name;
        this._cardImage.id = this._id;
        this._cardObject.textContent = this._name;
        this._amountLike.textContent = this._likes;
        return this._element;
    }

    setAmountLike(amountLikes){
        this._amountLike.textContent = amountLikes;
    }

    _handleButtonLike(){
        this._cardButttonLike.classList.toggle('card__button-like_state_active');
        this._changeButtonLike(this._cardButttonLike, this._id);
    }

    addButtonDelete(){
        this._cardButtonDel.classList.remove('card__button-del_state_disable');
        this._cardButtonDel.addEventListener('click', ()=>{this._openPopupConfirmation(this._id,this._element)});
    }

    _setEventListeners(){
        this._cardButttonLike.addEventListener('click', () => {this._handleButtonLike()});
        this._cardImage.addEventListener('click', ()=>{this._openImage(this._url,this._name)});
    }
}
