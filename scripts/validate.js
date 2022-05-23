 const objectConfig = {
  formSelector: '.popup__window',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_state_disable',
 }

  const showInputError = (elementForm, elementInput, errorMessage) => {
    const elementSpan = elementForm.querySelector(`#${elementInput.id}-error`);
    elementSpan.textContent = errorMessage;
  } 

  const hideInputError = (elementForm, elementInput) => {
    elementSpan = elementForm.querySelector(`#${elementInput.id}-error`);
    elementSpan.textContent = '';
  }

  const isValidInput = (elementForm, elementInput) =>{
    if (!elementInput.validity.valid){
      showInputError(elementForm, elementInput, elementInput.validationMessage);
    } else{
      hideInputError(elementForm, elementInput);
    }
  }

  const enableValidation = (сonfig) => {
    const listForm = Array.from(document.querySelectorAll(сonfig.formSelector));
    listForm.forEach((elementForm) => {
      elementForm.addEventListener('submit', (evt)=>{
        evt.preventDefault;
      })
      setEventListeners(elementForm, сonfig.inputSelector,  сonfig.submitButtonSelector, сonfig.inactiveButtonClass);
    })
  }

  const setEventListeners = (elementForm, classInput, classButtonSubmit, classButtonDisable) => {
    const listInput = Array.from(elementForm.querySelectorAll(classInput));
    const elementButton = elementForm.querySelector(classButtonSubmit);
    listInput.forEach((inputElement) => { inputElement.addEventListener('input', () => {
      isValidInput(elementForm, inputElement); 
      changeButtonState(elementButton, listInput, classButtonDisable);}
      )} );
  }

  const hasInvalidInput = (listInput) => {
    return listInput.some((elementInput)=> {
      return !elementInput.validity.valid;
    })
  }

 const changeButtonState = (button, listInput, classButtonDisable) => {
    if(!hasInvalidInput(listInput)){
        button.disabled = false;
        button.classList.remove(classButtonDisable);
       }
       else {
        button.disabled = true;
        button.classList.add(classButtonDisable);
       }
  }

  enableValidation(objectConfig);
