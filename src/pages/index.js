import "./index.css";
import FormValidator from "../components/formValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PicturePopup from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import Api from "../components/Api.js";
import {initialCards, objectConfig} from "../utils/data.js";
const buttonEditProfile = document.querySelector('.profile__change-button');
const buttonAddCard = document.querySelector('.profile__add-button ');
const nameInput = document.querySelector('.popup__input-text_field_name');
const jobInput = document.querySelector('.popup__input-text_field_job');
const selectorName = '.profile__name';
const selectorProfession = '.profile__job';
const selectorCardstable = '.cards__table'; 
const popupImage = new PicturePopup('.popup_function_bigImage');
popupImage.setEventListeners();
const popupFormNewCard = new PopupWithForm('.popup_function_addCard',submitFormAddCard);
popupFormNewCard.setEventListeners();
const popupFormEditProfile = new PopupWithForm( '.popup_function_editPtofile', submitFormEditProfile);
popupFormEditProfile.setEventListeners();
const popupConfirmation = new PopupConfirmation('.popup_function_confirmation',submitConfirmation);
popupConfirmation.setEventListeners();
const popupFormChangeAvatar = new PopupWithForm('.popup_function_changeAvatar', submitChangeAvatar);
popupFormChangeAvatar.setEventListeners();
const userInfo = new UserInfo( selectorName, selectorProfession );
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44/',
  headers: {
    authorization: 'bbed6d25-98f7-4c99-a8e5-9c526d6e53f4',
    'Content-Type': 'application/json'
  }
})
const templateCard = '#card-template';
const formValidators = {};
const containerViewCards = new Section({ renderer: createCard },selectorCardstable);
//---------------------------------//
const nameProfile = document.querySelector(selectorName);
const profesiionProfile =document.querySelector(selectorProfession);
const imageProfile = document.querySelector('.profile__avatar');
const buttonChangeImageProfile = document.querySelector('.profile__changeAvatar-button');


function onLoadWindow(){
  Promise.all([api.getUserInfo(), api.getInitialCards() ])
      .then((data)=> {
        const userInfo = data[0];
        const initialCards = data[1];
        nameProfile.textContent = userInfo.name;
        profesiionProfile.textContent = userInfo.about;
        imageProfile.src = userInfo.avatar;
        const userId = userInfo._id;
        const arrayCardsCreateUser = [];
        const arrayCardsCreateOther = [];
        for (let i = 0; i< initialCards.length; i++){
          const objCard = {};
          objCard.name = initialCards[i].name;
          objCard.link = initialCards[i].link;
          objCard.likes = initialCards[i].likes.length;
          objCard.id = initialCards[i]._id;
          objCard.ownerId = initialCards[i].owner._id;
          if (objCard.ownerId === userId){
            arrayCardsCreateUser.push(objCard);
         }
         else{
          arrayCardsCreateOther.push(objCard);
         }
        }
        containerViewCards.renderer({items:arrayCardsCreateOther}, false);
        containerViewCards.renderer({items:arrayCardsCreateUser},true);
      })
      .catch((error)=>{
        console.log(error);
        })
      setValidate(objectConfig);
}

function createCard(cardName, cardURL, amountLikes, idCard, creator){
  const card = new Card(cardName, cardURL, amountLikes, idCard, templateCard, openPopupImage, openPopupConfimation,changeStatusButtonLike);
  const cardView = card.render();
  if(creator){
    card.addButtonDelete();
  }
  return cardView;
}

function openPopupImage(imageURl, imageName){
  popupImage.open(imageURl,imageName);
} 

function openPopupConfimation(id,element){
  popupConfirmation.open(id,element);
}

function submitConfirmation(id,element){
  popupConfirmation.setStateSaveButtonLoading('Удаление...');
    api.deleteCard(id)
    .then((answer)=>{console.log(answer);
      element.cardDelete();
      popupConfirmation.close();
    })
    .finally(()=>{
      popupConfirmation.setStateSaveButtonNormal('Да');
    })
    .catch((error)=>{
      console.log(error);
      })
}

function openPopupAddCard(){
  popupFormNewCard.open();
  formValidators['addCard'].resetValidation();
} 

function setValidate(config){
  const formList = Array.from(document.querySelectorAll(config.formSelector)); 
  formList.forEach((formElement)=> {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}

function openPopupEditProfile(){  
  popupFormEditProfile.open();
  const dataUser = userInfo.getUserInfo();
  nameInput.value = dataUser.name;
  jobInput.value = dataUser.profession;
  formValidators['changeProfile'].resetValidation();
}

function submitFormEditProfile(evt,data,element){
  evt.preventDefault();
  element.setStateSaveButtonLoading('Сохранение...');
  api.changeUserInfo(data)
    .then(()=>{
      popupFormEditProfile.close();
      userInfo.setUserInfo( {data : data} );
    })
    .finally(()=>{
      element.setStateSaveButtonNormal('Сохранить');
    })
    .catch((error)=>{
      console.log(error);
      })
}

function submitFormAddCard(evt, data,element){
  element.setStateSaveButtonLoading('Сохранение...');
  evt.preventDefault();
  data.likes = 0;

  api.addCard(data)
    .then((answer)=>{
      data.id = answer._id;
      const cardHTML = createCard(data.name, data.link, data.likes, data.id, true);
      containerViewCards.addItem(cardHTML);
      formValidators['addCard'].changeButtonState();
      popupFormNewCard.close();
    })
    .finally(()=>{
      element.setStateSaveButtonNormal('Создать');
    })
    .catch((error)=>{
      console.log(error);
      }) 
}

function changeStatusButtonLike(stateButtonLike, idCard,card){
  if (stateButtonLike){
    api.addLike(idCard)
      .then(answer=>{
        card.setAmountLike(answer.likes.length);
      })
      .catch((error)=>{
        console.log(error);
        })
  }
  else{
    api.deleteLike(idCard)
      .then(answer=>{
        card.setAmountLike(answer.likes.length);
      })
      .catch((error)=>{
        console.log(error);
        })
  }
}

function openPopupChangeAvatar(){
  popupFormChangeAvatar.open();
}

function submitChangeAvatar(evt, data, element){
  element.setStateSaveButtonLoading('Сохранение...');
  evt.preventDefault();
  api.changeAvatar(data.urlAvatar)
  .then((answer)=>{
    console.log(answer);
    imageProfile.src = data.urlAvatar;
    popupFormChangeAvatar.close();
  })
  .catch((error)=>{
    console.log(error);
    })
  .finally(()=>{
    element.setStateSaveButtonNormal('Сохранить');
  })
    
}

document.addEventListener("DOMContentLoaded", onLoadWindow);
buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);
buttonChangeImageProfile.addEventListener('click', openPopupChangeAvatar);