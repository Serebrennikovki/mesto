 const popupElement = document.querySelector('.popup');
 const editButton = document.querySelector('.profile__change-button');
 const closeButton = document.querySelector('.popup__close-button');
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
 let nameInput = document.querySelector('.popup__input-text_field_name');
 let jobInput = document.querySelector('.popup__input-text_field_job');
 let nameField =  document.querySelector('.profile__name');
 let jobField = document.querySelector('.profile__job');
 const cardsTable = document.querySelector('.cards__table');

 function onLoadWindow(){
     console.log('hi');
     console.log(cardsTable);
     const cardArray = document.querySelectorAll('.card');
     console.log(cardArray);
     for (let i = 0; i<cardArray.length; i++ ){
      let cardIMG = cardArray[i].querySelector('.card__image');
      console.log(cardIMG);
      cardIMG.src = initialCards[i].link;
      let cardName = cardArray[i].querySelector('.card__name');
      console.log(cardName);
      cardName.textContent = initialCards[i].name;
     }
    
     }



 function openPopup(){
     popupElement.classList.add('popup_opened');
     document.addEventListener('keyup', onDocumentKeyUp); 
     nameInput.value = nameField.textContent;
     jobInput.value = jobField.textContent;
    }

 function closePopup(){
     popupElement.classList.remove('popup_opened');
     document.removeEventListener('keyup', onDocumentKeyUp); 
     
 }

 function onDocumentKeyUp(event){
    if(event.code === 'Escape'){
        closePopup();
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
   
 document.addEventListener("DOMContentLoaded", onLoadWindow());
 editButton.addEventListener('click', openPopup);

 closeButton.addEventListener('click', closePopup);
 formElement.addEventListener('submit', formSubmitHandler);

 
