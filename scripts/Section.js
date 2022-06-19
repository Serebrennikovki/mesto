export default class Section {
    constructor({ items, renderer}, containerSelector){
        this._itemsList = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }
    renderer(){
        this._itemsList.forEach(element => {
            this._element = this._renderer(element.name, element.link);
            console.log(this._element);
            this.addItem();
        });
    }

    addItem(){
        document.querySelector(this._containerSelector).prepend(this._element);
    } 
} 