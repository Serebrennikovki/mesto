 const popupElement = document.querySelector('.popup');
 const editButton = document.querySelector('.profile__change-button');
 const closeButton = document.querySelector('.popup__close-button')

 function openPopup(){
     popupElement.classList.add('popup_opened');
     document.addEventListener('keyup', onDocumentKeyUp); 
 }

 function closePopup(){
     popupElement.classList.remove('popup_opened');
     document.removeEventListener('keyup', onDocumentKeyUp); 
     
 }

 function onDocumentKeyUp(event){
    console.log(event.code);
    if(event.code === 'Escape'){
        closePopup();
    }
 }

 editButton.addEventListener('click', openPopup);

 closeButton.addEventListener('click', closePopup);

