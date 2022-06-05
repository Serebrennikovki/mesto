import FormValidator from "./formValidator.js";
import Card from "./card.js";
const popupEditProfile = document.querySelector('.popup_function_editPtofile');
const buttonEditProfile = document.querySelector('.profile__change-button');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button');
const buttonAddCard = document.querySelector('.profile__add-button ');
const popupAddCard = document.querySelector('.popup_function_addCard');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__close-button'); 
const nameInput = document.querySelector('.popup__input-text_field_name');
const jobInput = document.querySelector('.popup__input-text_field_job');
const nameCardInput = document.querySelector('#nameCardInput');
const urlCard = document.querySelector('#URLInput');
const nameField =  document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__job');
const cardsTable = document.querySelector('.cards__table');
const popupBigImage = document.querySelector('.popup_function_bigImage');
const buttonCloseBigImage = popupBigImage.querySelector('.bigImage__button-close');
const imageOpened =  popupBigImage.querySelector('.bigImage__img');
const nameImageOpened =  popupBigImage.querySelector('.bigImage__name');
const templateCard = '#card-template';
const formAddCard = document.forms.addCard;
const formChangeProfile = document.forms.changeProfile;

function onLoadWindow(){
  initialCards.forEach((item)=>{
    cardsTable.append(createCard(item.name,item.link,templateCard));
  })
  setValidate();
  return cardsTable;
}

function createCard(cardName, cardURL,templateSelector){
  const card = new Card(cardName, cardURL, templateSelector);
  const cardView = card.render();
  cardView.querySelector('.card__image').addEventListener('click', ()=>{openPopupImage(cardURL,cardName)});
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

function setValidate(){
  const validateAddCard = new FormValidator (formAddCard, objectConfig);
  validateAddCard.enableValidation();

  const validateChangeProfile = new FormValidator (formChangeProfile, objectConfig);
  validateChangeProfile.enableValidation();
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
  document.addEventListener('keyup', onDocumentKeyUp);
  namePopup.addEventListener('click', clickOverlay);
}

function closePopup(namePopup){
  namePopup.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
  namePopup.removeEventListener('click', clickOverlay);  
}

function onDocumentKeyUp(event){
  if(event.code === 'Escape'){
      closePopup(document.querySelector('.popup_opened'));
  }
}

function resetButton(button){
  button.disable = true;
  button.classList.add(objectConfig.inactiveButtonClass);
}

function submitFormAddCard(evt){
  evt.preventDefault();
  const newCard = createCard(nameCardInput.value, urlCard.value, templateCard);
  cardsTable.prepend(newCard);
  evt.target.reset();
  resetButton (evt.currentTarget.querySelector('.popup__save-button'));
  closePopup(popupAddCard);
}

document.addEventListener("DOMContentLoaded", onLoadWindow);
buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);
formChangeProfile.addEventListener('submit', submitFormEditProfile);
formAddCard.addEventListener('submit', submitFormAddCard);
buttonCloseBigImage.addEventListener('click', ()=>{closePopup(popupBigImage)});
buttonCloseAddCard.addEventListener('click',()=>{closePopup(popupAddCard)});
buttonCloseEditProfile.addEventListener('click',()=>{closePopup(popupEditProfile)});