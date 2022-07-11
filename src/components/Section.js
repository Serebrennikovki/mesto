export default class Section {
    constructor({renderer}, containerSelector){
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._container = document.querySelector(this._containerSelector);
    }
    renderer(items, userId){
        items.forEach(element => {
            this._element = this._renderer(element, userId);
            this.addItem(this._element);
        });
    }

    addItem(element){
        this._container.prepend(element);
    } 
} 