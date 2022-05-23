const popupEditProfile = document.querySelector('.popup_function_editPtofile');
const buttonEditProfile = document.querySelector('.profile__change-button');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button');
const buttonAddCard = document.querySelector('.profile__add-button ');
const popupAddCard = document.querySelector('.popup_function_addCard');
const buttonCloseAddCard = popupAddCard.querySelector('.popup__close-button'); 
const nameInput = document.querySelector('.popup__input-text_field_name');
const jobInput = document.querySelector('.popup__input-text_field_job');
const nameCardInput = document.querySelector('#nameCardInput');
const UrlCard = document.querySelector('#URLInput');
const nameField =  document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__job');
const cardsTable = document.querySelector('.cards__table');
const popupBigImage = document.querySelector('.popup_function_bigImage');
const buttonCloseBigImage = popupBigImage.querySelector('.bigImage__button-close');
const imageOpened =  popupBigImage.querySelector('.bigImage__img');
const nameImageOpened =  popupBigImage.querySelector('.bigImage__name');
const templateCard = document.querySelector('#card-template');
const formAddCard = document.forms.addCard;
const formChangeProfile = document.forms.changeProfile;


function onLoadWindow(){
  for (let i = 0; i < initialCards.length; i++){
    cardsTable.append(createCard(initialCards[i].link,initialCards[i].name));
  }
  return cardsTable;
}

function createCard(cardURL, cardName){
  const card = templateCard.content.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardURL;
  cardImage.alt = cardName;
  card.querySelector('.card__name').textContent = cardName;
  card.querySelector('.card__button-like').addEventListener('click',()=>{ changeStateButtonLike(card.querySelector('.card__button-like'))});
  card.querySelector('.card__button-del').addEventListener('click', ()=>{card.remove()});
  cardImage.addEventListener('click',()=>{openPopupImage(cardURL, cardName)});
  return card;
}

function changeStateButtonLike(element){
  element.classList.toggle('card__button-like_state_active');
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
  closePopup(evt.target.parentNode);
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
  namePopup.querySelector('.popup__overlay').addEventListener('click', clickOverlay);
}

function closePopup(namePopup){
  namePopup.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
  namePopup.querySelector('.popup__overlay').removeEventListener('click', clickOverlay);  
}

function onDocumentKeyUp(event){
  if(event.code === 'Escape'){
      closePopup(document.querySelector('.popup_opened'));
  }
}

function submitFormAddCard(evt){
  evt.preventDefault();
  const newCard = createCard(UrlCard.value, nameCardInput.value);
  cardsTable.prepend(newCard);
  evt.target.reset();// попап после добавление одной карточки закрывается!!!! Зачем блокировать?!
  changeButtonState(evt.target.parentNode.querySelector('.popup__save-button'), [UrlCard, nameCardInput], objectConfig.inactiveButtonClass);
  closePopup(popupAddCard);//
}
   
document.addEventListener("DOMContentLoaded", onLoadWindow);
buttonEditProfile.addEventListener('click', openPopupEditProfile);
buttonAddCard.addEventListener('click', openPopupAddCard);
formChangeProfile.addEventListener('submit', submitFormEditProfile);
formAddCard.addEventListener('submit', submitFormAddCard);
buttonCloseBigImage.addEventListener('click', ()=>{closePopup(popupBigImage)});
buttonCloseAddCard.addEventListener('click',()=>{closePopup(popupAddCard)});
buttonCloseEditProfile.addEventListener('click',()=>{closePopup(popupEditProfile)});
