export default class Section {
    constructor({renderer}, containerSelector){
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._container = document.querySelector(this._containerSelector);
    }
    renderer({items}){
        this._itemsList = items;
        this._itemsList.forEach(element => {
            this._element = this._renderer(element.name, element.link);
            this.addItem();
        });
    }

    addItem(){
        this._container.prepend(this._element);
    } 
} 