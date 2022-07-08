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
const userInfo = new UserInfo( selectorName, selectorProfession );
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44/',
  headers: {
    authorization: 'bbed6d25-98f7-4c99-a8e5-9c526d6e53f4',
    'Content-Type': 'application/json'
  }
})
const templateCard = '#card-template';
const formAddCard = document.forms.addCard;
const formChangeProfile = document.forms.changeProfile;
const formValidators = {};
const containerViewCards = new Section({ renderer: createCard },selectorCardstable);
//---------------------------------//
const nameProfile = document.querySelector(selectorName);
const profesiionProfile =document.querySelector(selectorProfession);
const imageProfile = document.querySelector('.profile__avatar');


function onLoadWindow(){
  const arrayCards = [];
  api.getInitialcard()
  .then((result) => {
    for (let i = 0; i< result.length; i++){
      const objCard = {};
      objCard.name = result[i].name;
      objCard.link = result[i].link;
      objCard.likes = result[i].likes.length;
      objCard.id = result[i]._id;
      arrayCards[i] = objCard;
    }
  containerViewCards.renderer({items:arrayCards});
  setValidate(objectConfig);
  });

    api.getUsersInfo()
    .then((userData) => {
      nameProfile.textContent = userData.name;
      profesiionProfile.textContent = userData.about;
      imageProfile.src = userData.avatar;
    })
}

function createCard(cardName, cardURL, amountLikes, idCard, creator){
  const card = new Card(cardName, cardURL, amountLikes, idCard, templateCard, openPopupImage, openPopupConfimation);
  const cardView = card.render();
  if(creator){
    card.addButtonDelete();
  }
  return cardView;
}

function openPopupImage(imageURl, imageName){
  popupImage.open(imageURl,imageName);
} 

function openPopupConfimation(id){
  popupConfirmation.open();
  popupConfirmation.setEventListeners(id);
}

function submitConfirmation(id){
    api.deleteCard(id)
    .then((answer)=>{console.log(answer);})
    popupConfirmation.close();
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
  nameInput.value = dataUser[0];
  jobInput.value = dataUser[1];
  formValidators['changeProfile'].resetValidation();
}

function submitFormEditProfile(evt){
  evt.preventDefault();
  const dataInputs = popupFormEditProfile.getInputValues();
  popupFormEditProfile.close();
  userInfo.setUserInfo( {data : dataInputs} );

    api.changeUserInfo(dataInputs)
    .then((answer)=>{console.log(answer);})
}

function submitFormAddCard(evt){
  evt.preventDefault();
  const data = popupFormNewCard.getInputValues();
  const dataCard = {};
  dataCard.name = data[0];
  dataCard.link = data[1];
  dataCard.likes = 0;

  api.addCard(data)
  .then((answer)=>{
      dataCard.id = answer._id;
      const arrayFormCard = [];
      arrayFormCard[0] = dataCard;
      containerViewCards.renderer({items:arrayFormCard},true);
    })
    evt.target.reset();
    formValidators['addCard'].changeButtonState();
    popupFormNewCard.close();
}

document.addEventListener("DOMContentLoaded", onLoadWindow);
buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);
formChangeProfile.addEventListener('submit', submitFormEditProfile);
formAddCard.addEventListener('submit', submitFormAddCard);