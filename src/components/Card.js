export default class Card{
    constructor(
        item,
        userId,
        selectorTemplate,
        funcOpenPopup,
        funcCardDelete,
        funcChangeButtonLike
    )   {
        this._ownerCard = item.owner._id;
        this._userId = userId;
        this._name = item.name;
        this._url = item.link;
        this._likes = item.likes;
        this._template = selectorTemplate;
        this._openImage = funcOpenPopup;
        this._openPopupConfirmation = funcCardDelete;
        this._changeButtonLike = funcChangeButtonLike;
        this._id = item._id;
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
        this._amountLike.textContent = this._likes.length;
        if(this._userId === this._ownerCard){
            this._cardButtonDel.classList.remove('card__button-del_state_disable');  
        }
        return this._element;
    }

    setStateButtonLike(amountLikes){
        this._cardButttonLike.classList.toggle('card__button-like_state_active');
        this._amountLike.textContent = amountLikes;
    }

    _handleButtonLike(){
        if(this._cardButttonLike.classList.contains('card__button-like_state_active')){
            this._cardButtonLikeState = false;
        }
        else{
            this._cardButtonLikeState = true;
        }

        this._changeButtonLike( this._cardButtonLikeState, this._id, this);
    }

    cardDelete(){
        this._element.remove();
    }

    _setEventListeners(){
        this._cardButttonLike.addEventListener('click', () => {this._handleButtonLike()});
        this._cardImage.addEventListener('click', ()=>{this._openImage(this._url,this._name)});
        this._cardButtonDel.addEventListener('click', ()=>{this._openPopupConfirmation(this._id,this)});
    }
}
