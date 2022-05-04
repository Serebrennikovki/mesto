const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__change-button');
const closeButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button ');
const addCardPopup = document.getElementById('addCard');
const closeButtonAddCard = addCardPopup.querySelector('.popup__close-button'); 
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }];

let formElement = document.querySelector('.popup__window');
let formElementAddCard = addCardPopup.querySelector('.popup__window')
let nameInput = document.querySelector('.popup__input-text_field_name');
let jobInput = document.querySelector('.popup__input-text_field_job');
let nameCardInput = document.getElementById('nameCardInput');
let UrlCard = document.getElementById('URLInput');
let nameField =  document.querySelector('.profile__name');
let jobField = document.querySelector('.profile__job');
const cardsTable = document.querySelector('.cards__table');
const imagePopup = document.getElementById('bigImage');
const closeButton_imagePopup = document.querySelector('.bigImage__button-close');

function onLoadWindow(){
  for (let i = 0; i < 6; i++){
    cardsTable.append(createCard(initialCards[i].link,initialCards[i].name));
  }
  return cardsTable;
}

function createCard(cardURL, cardName){
  const templateCard = document.querySelector('#card-template');
  const card = templateCard.content.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = cardURL;
  card.querySelector('.card__name').textContent = cardName;
  card.querySelector('.card__button-like').addEventListener('click',()=>{ changeStateButtonLike(card.querySelector('.card__button-like'))});
  card.querySelector('.card__button-del').addEventListener('click', ()=>{card.remove()});
  card.querySelector('.card__image').addEventListener('click',()=>{openPopupImage(cardURL, cardName)});
  return card;
}

function changeStateButtonLike(element){
  element.classList.toggle('card__button-like_state_active');
}

function openPopupImage(imageURl, imageName){
  document.addEventListener('keyup', onDocumentKeyUp);
  imagePopup.classList.add('popup_opened');
  imagePopup.querySelector('.bigImage__img').src = imageURl;
  imagePopup.querySelector('.bigImage__name').textContent = imageName;
}

function openPopupAddCard(){
  const addCardPopup = document.getElementById('addCard');
  addCardPopup.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}

function openPopupChangeProfile(){ 
  document.addEventListener('keyup', onDocumentKeyUp); 
  popupElement.classList.add('popup_opened');
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
}

function submitFormHandler(evt){
  evt.preventDefault();
  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;
  closePopup();
}
  
function submitFormAddCard(evt){
  evt.preventDefault();
  const newCard = createCard(UrlCard.value, nameCardInput.value);
  cardsTable.prepend(newCard);
  closePopup();
}

function closePopup(){
  popupElement.classList.remove('popup_opened');
  addCardPopup.classList.remove('popup_opened');
  imagePopup.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);    
}

function onDocumentKeyUp(event){
  if(event.code === 'Escape'){
      closePopup();
  }
    else if(event.code === 'Enter'){
      submitFormHandler();
  }
}

function submitFormAddCard(evt){
  evt.preventDefault();
  const newCard = createCard(UrlCard.value, nameCardInput.value);
  cardsTable.prepend(newCard);
  closePopup();
}
   
document.addEventListener("DOMContentLoaded", onLoadWindow);
editButton.addEventListener('click', openPopupChangeProfile);
addButton.addEventListener('click', openPopupAddCard);
formElement.addEventListener('submit', submitFormHandler);
formElementAddCard.addEventListener('submit', submitFormAddCard);
closeButton_imagePopup.addEventListener('click', closePopup);
closeButtonAddCard.addEventListener('click',closePopup);

 
