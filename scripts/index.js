import FormValidator from "./formValidator.js";
import Card from "./Card.js";
const popupEditProfile = document.querySelector('.popup_function_editPtofile');
const buttonEditProfile = document.querySelector('.profile__change-button');
const buttonAddCard = document.querySelector('.profile__add-button ');
const popupAddCard = document.querySelector('.popup_function_addCard');
const nameInput = document.querySelector('.popup__input-text_field_name');
const jobInput = document.querySelector('.popup__input-text_field_job');
const nameCardInput = document.querySelector('#nameCardInput');
const urlCard = document.querySelector('#URLInput');
const nameField =  document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__job');
const cardsTable = document.querySelector('.cards__table');
const popupBigImage = document.querySelector('.popup_function_bigImage');
const imageOpened =  popupBigImage.querySelector('.bigImage__img');
const nameImageOpened =  popupBigImage.querySelector('.bigImage__name');
const templateCard = '#card-template';
const formAddCard = document.forms.addCard;
const formChangeProfile = document.forms.changeProfile;
const formValidators = {};
const closeButtons = document.querySelectorAll('.popup__close-button');

function onLoadWindow(){
  initialCards.forEach((item)=>{
    cardsTable.append(createCard(item.name,item.link,templateCard,openPopupImage));
  })
  setValidate(objectConfig);
  return cardsTable;
}

function createCard(cardName, cardURL,templateSelector, functionImage){
  const card = new Card(cardName, cardURL, templateSelector, functionImage);
  const cardView = card.render();
  return cardView;
}


function openPopupImage(imageURl, imageName){
  openPopup(popupBigImage);
  imageOpened.src = imageURl;
  imageOpened.alt = imageName;
  nameImageOpened.textContent = imageName;
} 

function openPopupAddCard(){
  openPopup(popupAddCard);
} 

function clickOverlay(evt){
  if(evt.target.classList.contains('popup__overlay')){
    closePopup(evt.currentTarget);
  }
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
  openPopup(popupEditProfile);
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
}

function submitFormEditProfile(evt){
  evt.preventDefault();
  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function openPopup(namePopup){
  namePopup.classList.add('popup_opened');
  document.addEventListener('keyup', handleKeyEscape);
  namePopup.addEventListener('mousedown', clickOverlay);
}

function closePopup(namePopup){
  namePopup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleKeyEscape);
  namePopup.removeEventListener('mousedown', clickOverlay);  
}

function handleKeyEscape(event){
  if(event.code === 'Escape'){
      closePopup(document.querySelector('.popup_opened'));
  }
}

function submitFormAddCard(evt){
  evt.preventDefault();
  const newCard = createCard(nameCardInput.value, urlCard.value, templateCard);
  cardsTable.prepend(newCard);
  evt.target.reset();
  formValidators['addCard'].changeButtonState();
  closePopup(popupAddCard);
}

document.addEventListener("DOMContentLoaded", onLoadWindow);
buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);
formChangeProfile.addEventListener('submit', submitFormEditProfile);
formAddCard.addEventListener('submit', submitFormAddCard);

closeButtons.forEach((button) => { 
  const popup = button.closest('.popup');
  console.log(popup);
  button.addEventListener('click', () => closePopup(popup));
});