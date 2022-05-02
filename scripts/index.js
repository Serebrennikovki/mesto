 const popupElement = document.querySelector('.popup');
 const editButton = document.querySelector('.profile__change-button');
 const closeButton = document.querySelector('.popup__close-button');
 const addButton = document.querySelector('.profile__add-button ');
 const addCardPopup = document.getElementById('addCard');
 const closeButton_addCard = addCardPopup.querySelector('.popup__close-button'); 
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
    return card;
    }

 function openPopup(button){
     
     document.addEventListener('keyup', onDocumentKeyUp); 
     if(button === 'editButton'){
      popupElement.classList.add('popup_opened');
      nameInput.value = nameField.textContent;
      jobInput.value = jobField.textContent;
     }
     else {
      const addCardPopup = document.getElementById('addCard');
      console.log(addCardPopup);
      addCardPopup.classList.add('popup_opened');
      console.log(addCardPopup.classList);
      document.addEventListener('keyup', onDocumentKeyUp);
     }
     
    }

 function closePopup(){
     popupElement.classList.remove('popup_opened');
     addCardPopup.classList.remove('popup_opened');
     document.removeEventListener('keyup', onDocumentKeyUp);    
 }
 function closePopup_addCard(){
  addCardPopup.classList.remove('popup_opened');
 }

 function onDocumentKeyUp(event){
    if(event.code === 'Escape'){
        closePopup();
        closePopup_addCard();
    }
     else if(event.code === 'Enter'){
        formSubmitHandler();
    }
 }

 function formSubmitHandler(evt){
    evt.preventDefault();
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
    closePopup();
}

function formSubmitAddCard(evt){
  evt.preventDefault();
  const newCard = createCard(UrlCard.value, nameCardInput.value);
  console.log(cardsTable);
  Array.from(cardsTable);
  console.log(typeof(cardsTable));
  console.log(newCard);
  cardsTable.prepend(newCard);
  closePopup();
}
   
 document.addEventListener("DOMContentLoaded", onLoadWindow);
 editButton.addEventListener('click',() => openPopup('editButton'));
 addButton.addEventListener('click', () => openPopup('addbutton'));
 closeButton.addEventListener('click', closePopup);
 formElement.addEventListener('submit', formSubmitHandler);
 formElementAddCard.addEventListener('submit', formSubmitAddCard);

 closeButton_addCard.addEventListener('click',closePopup_addCard);

 
