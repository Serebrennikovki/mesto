const handleForm = (event) =>{
    event.preventDefault();
    const currentForm = event.currentTarget;
    const currentElement = event.target;
    const submitButton = currentForm.querySelector('.popup__save-button');
    validateInput(currentElement);
    changeButtonState(submitButton, currentForm.checkValidity());
 }

 const  validateInput = (element) => {
    const errorMessage = document.querySelector(`#${element.id}-error`);
    errorMessage.textContent = element.validationMessage;
    return element.checkValidity();
  }

  const changeButtonState = (button, isFormValid) => {
    if(isFormValid){
        button.disable = false;
        button.classList.remove('popup__save-button_state_disable');
        button.classList.add('popup__save-button_state_active');
       }
       else {
        button.disable = true;
        button.classList.add('popup__save-button_state_disable');
        button.classList.remove('popup__save-button_state_active');
       }
  }

formAddCard.addEventListener('input', handleForm);
formChangeProfile.addEventListener('input', handleForm);
