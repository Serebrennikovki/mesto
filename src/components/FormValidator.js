export default class FormValidator{
    constructor(elementForm, config){
         this._form  = elementForm;
         this._window = config.formSelector;
         this._selectorInput = config.inputSelector;
         this._selectorSubmitButton = config.submitButtonSelector;
         this._classInactiveButton = config.inactiveButtonClass;
    }

    _showInputError(){
        this._form.querySelector(`#${this._element.id}-error`).textContent = this._element.validationMessage;
    }

    _hideInputError(){
        this._form.querySelector(`#${this._element.id}-error`).textContent = '';
    }

    _isValidInput () {   
        if (!this._element.validity.valid){
          this._showInputError();
        } else{
          this._hideInputError();
        }
      }
    _setEvenListeners(){
        this._inputList = Array.from(this._form.querySelectorAll(this._selectorInput));
        this._button = this._form.querySelector(this._selectorSubmitButton);
        this._inputList.forEach((inputElement) => { inputElement.addEventListener('input', () => {
            this._element = inputElement;
            this._isValidInput(); 
            this.changeButtonState();}
            )} );
        }

    _hasInvalidInput () {
          return this._inputList.some((elementInput)=> {
            return !elementInput.validity.valid;
          })
        }

    changeButtonState(){
      if(!this._hasInvalidInput()){
        this._button.disabled = false;
        this._button.classList.remove(this._classInactiveButton);
      }
      else {
        this._button.disabled = true;
        this._button.classList.add(this._classInactiveButton);
        }
    }

    enableValidation(){
      this._form.addEventListener('submit', (evt)=>{
        evt.preventDefault;
      })
      this._setEvenListeners();
    }
}
