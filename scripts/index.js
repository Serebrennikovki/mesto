 const popupElement = document.querySelector('.popup');
 const editButton = document.querySelector('.profile__change-button');
 const closeButton = document.querySelector('.popup__close-button');

 let formElement = document.querySelector('.popup__window');
 let nameInput = document.querySelector('.popup__input-text_field_name');
 let jobInput = document.querySelector('.popup__input-text_field_job');
 let nameField =  document.querySelector('.profile__name');
 let jobField = document.querySelector('.profile__job');


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
   

 editButton.addEventListener('click', openPopup);

 closeButton.addEventListener('click', closePopup);
 formElement.addEventListener('submit', formSubmitHandler);
