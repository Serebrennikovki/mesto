 const objectConfig = {
  formSelector: '.popup__window',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_state_disable',
  activeButtonClass: 'popup__save-button_state_active',
 }

  const showInputError = (elementForm, elementInput, errorMessage) => {
    console.log(12);
    const elementSpan = elementForm.querySelector(`#${elementInput.id}-error`);
    console.log(elementSpan);
    console.log(errorMessage);
    elementSpan.textContent = errorMessage;
  } 

  const hideInputError = (elementForm, elementInput) => {
    elementSpan = elementForm.querySelector(`#${elementInput.id}-error`);
    elementSpan.textContent = '';
  }

  const isValidInput = (elementForm, elementInput) =>{
    console.log(elementInput);
    if (!elementInput.validity.valid){
      showInputError(elementForm, elementInput, elementInput.validationMessage);
    } else{
      hideInputError(elementForm, elementInput);
    }
  }

  const enableValidation = (сonfig) => {
    const listForm = Array.from(document.querySelectorAll(сonfig.formSelector));
    console.log(listForm);
    listForm.forEach((elementForm) => {
      elementForm.addEventListener('submit', (evt)=>{
        evt.preventDefault;
      })
      setEventListeners(elementForm, сonfig.inputSelector,  сonfig.submitButtonSelector, сonfig.activeButtonClass, сonfig.inactiveButtonClass);
    })
  }

  const setEventListeners = (elementForm, classInput, classButtonSubmit, classButtonActive, classButtonDisable) => {
    const listInput = Array.from(elementForm.querySelectorAll(classInput));
    const elementButton = elementForm.querySelector(classButtonSubmit);
    listInput.forEach((inputElement) => { inputElement.addEventListener('input', () => {
      isValidInput(elementForm, inputElement); 
      changeButtonState(elementButton, listInput, classButtonActive, classButtonDisable);}
      )} );
  }

  const hasInvalidInput = (listInput) => {
    return listInput.some((elementInput)=> {
      return !elementInput.validity.valid;
    })
  }

 const changeButtonState = (button, listInput, classButtonActive, classButtonDisable) => {
   console.log(hasInvalidInput(listInput));
    if(!hasInvalidInput(listInput)){
        button.disabled = false;
        button.classList.remove(classButtonDisable);
        button.classList.add(classButtonActive);
       }
       else {
        button.disabled = true;
        button.classList.add(classButtonDisable);
        button.classList.remove(classButtonActive);
       }
  }
  enableValidation(objectConfig);
