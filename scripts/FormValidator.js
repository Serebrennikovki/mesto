class FormValidator{
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

    _isValidInput () {   //проверка валиден ли вход
        if (!this._element.validity.valid){
          this._showInputError();
        } else{
          this._hideInputError();
        }
      }
    _setEvenListeners(){
        this._listInput = Array.from(this._form.querySelectorAll('.popup__input-text'));
        this._listInput.forEach((inputElement) => { inputElement.addEventListener('input', () => {
            this._element = inputElement;
            this._isValidInput(); 
            this.changeButtonState();}
            )} );
        }

    _hasInvalidInput () {
          return this._listInput.some((elementInput)=> {
            return !elementInput.validity.valid;
          })
        }

    changeButtonState(){
      this._button = this._form.querySelector(this._selectorSubmitButton);
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