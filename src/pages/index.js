import "./index.css";
import FormValidator from "../components/formValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PicturePopup from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import Api from "../components/Api.js";
import {objectConfig} from "../utils/data.js";
const buttonEditProfile = document.querySelector('.profile__change-button');
const buttonAddCard = document.querySelector('.profile__add-button ');
const nameInput = document.querySelector('.popup__input-text_field_name');
const jobInput = document.querySelector('.popup__input-text_field_job');
const selectorName = '.profile__name';
const selectorProfession = '.profile__job';
const selectorAvatar = '.profile__avatar';
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
const userInfo = new UserInfo( selectorName, selectorProfession, selectorAvatar );
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
const buttonChangeImageProfile = document.querySelector('.profile__changeAvatar-button');
let userId;


function onLoadWindow(){
  Promise.all([api.getUserInfo(), api.getInitialCards() ])
      .then(([info, initialCards])=> {
        userInfo.setUserInfo({data: info});
        userInfo.setUserAvatar(info.avatar);
        userId = info._id;
        containerViewCards.renderer(initialCards, userId);
      })
      .catch((error)=>{
        console.log(error);
        })
      setValidate(objectConfig);
}

function createCard(item,userId){
  const card = new Card(item, userId, templateCard, openPopupImage, openPopupConfimation,changeStatusButtonLike);
  const cardView = card.render();
  return cardView;
}

function openPopupImage(imageURl, imageName){
  popupImage.open(imageURl,imageName);
} 

function openPopupConfimation(id,element){
  popupConfirmation.open(id,element);
}

function submitConfirmation(id,element){
  popupConfirmation.setStateSaveButton('Удаление...');
    api.deleteCard(id)
    .then((answer)=>{console.log(answer);
      element.cardDelete();
      popupConfirmation.close();
    })
    .finally(()=>{
      popupConfirmation.setStateSaveButton('Да');
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
  jobInput.value = dataUser.about;
  formValidators['changeProfile'].resetValidation();
}

function submitFormEditProfile(evt,data,element){
  evt.preventDefault();
  element.setStateSaveButton('Сохранение...');
  api.changeUserInfo(data)
    .then(()=>{
      popupFormEditProfile.close();
      userInfo.setUserInfo( {data : data} );
    })
    .finally(()=>{
      element.setStateSaveButton('Сохранить');
    })
    .catch((error)=>{
      console.log(error);
      })
}

function submitFormAddCard(evt, data,element){
  element.setStateSaveButton('Сохранение...');
  evt.preventDefault();
  api.addCard(data)
    .then((cardData)=>{
      const cardHTML = createCard(cardData, userId);
      containerViewCards.addItem(cardHTML);
      popupFormNewCard.close();
    })
    .finally(()=>{
      element.setStateSaveButton('Создать');
    })
    .catch((error)=>{
      console.log(error);
      }) 
}

function changeStatusButtonLike(stateButtonLike, idCard,card){
  if (stateButtonLike){
    api.addLike(idCard)
      .then(answer=>{
        card.setStateButtonLike(answer.likes.length);
      })
      .catch((error)=>{
        console.log(error);
        })
  }
  else{
    api.deleteLike(idCard)
      .then(answer=>{
        card.setStateButtonLike(answer.likes.length);
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
  element.setStateSaveButton('Сохранение...');
  evt.preventDefault();
  api.changeAvatar(data.avatar)
  .then(()=>{
    userInfo.setUserAvatar(data.avatar);
    popupFormChangeAvatar.close();
  })
  .finally(()=>{
    element.setStateSaveButton('Сохранить');
  })
  .catch((error)=>{
    console.log(error);
    })  
}

document.addEventListener("DOMContentLoaded", onLoadWindow);
buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);
buttonChangeImageProfile.addEventListener('click', openPopupChangeAvatar);