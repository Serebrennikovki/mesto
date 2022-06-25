import Popup from './Popup.js';

export default class PicturePopup extends Popup {

    open( link, name ){
        super.open();
        this._image = this._popup.querySelector('.bigImage__img');
        this._name = this._popup.querySelector('.bigImage__name');
        this._name.textContent = name;
        this._image.src = link;
        this._image.alt = name;
    }

}