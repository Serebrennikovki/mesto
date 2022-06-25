import "./index.css";
import FormValidator from "../components/formValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PicturePopup from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {initialCards, objectConfig} from "../utils/data.js";
const buttonEditProfile = document.querySelector('.profile__change-button');
const buttonAddCard = document.querySelector('.profile__add-button ');
const nameInput = document.querySelector('.popup__input-text_field_name');
const jobInput = document.querySelector('.popup__input-text_field_job');
const nameCardInput = document.querySelector('#nameCardInput');
const urlCard = document.querySelector('#URLInput');
const selectorName = '.profile__name';
const selectorProfession = '.profile__job';
const selectorCardstable = '.cards__table'; 
const popupImage = new PicturePopup('.popup_function_bigImage');
const popupFormNewCard = new PopupWithForm('.popup_function_addCard',submitFormAddCard);
const popupFormEditProfile = new PopupWithForm( '.popup_function_editPtofile', submitFormEditProfile);
const userInfo = new UserInfo(selectorName, selectorProfession );
const templateCard = '#card-template';
const formAddCard = document.forms.addCard;
const formChangeProfile = document.forms.changeProfile;
const formValidators = {};

function onLoadWindow(){
  addCardInCommonView(initialCards, createCard, selectorCardstable);
  setValidate(objectConfig);
}

function createCard(cardName, cardURL){
  const card = new Card(cardName, cardURL, templateCard, openPopupImage);
  const cardView = card.render();
  return cardView;
}

function addCardInCommonView(dataArray, methodRender, selectorContainer){
  const initialViewCards = new Section({ items:dataArray, renderer:methodRender },selectorContainer)
  initialViewCards.renderer();
}


function openPopupImage(imageURl, imageName){
  popupImage.open(imageURl,imageName );
} 

function openPopupAddCard(){
  popupFormNewCard.open();
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
}

function submitFormEditProfile(evt){
  evt.preventDefault();
  popupFormEditProfile.close();
  const dataEditProfile = popupFormEditProfile.data;
  userInfo.setUserInfo( {data:dataEditProfile} );
}

function submitFormAddCard(evt){
  evt.preventDefault();
  const dataCard = {};
  dataCard.name = nameCardInput.value;
  dataCard.link = urlCard.value;
  const arrayFormCard = [];
  arrayFormCard[0] = dataCard;
  addCardInCommonView(arrayFormCard, createCard ,selectorCardstable);
  evt.target.reset();
  formValidators['addCard'].changeButtonState();
  popupFormNewCard.close();
}

document.addEventListener("DOMContentLoaded", onLoadWindow);
buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);
formChangeProfile.addEventListener('submit', submitFormEditProfile);
formAddCard.addEventListener('submit', submitFormAddCard);