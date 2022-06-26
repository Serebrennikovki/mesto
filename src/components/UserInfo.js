export default class UserInfo{
    constructor(selectorName, selectorProfession ){
        this._selectorName = selectorName;
        this._selectorProfession = selectorProfession;
        this._inputName = document.querySelector(this._selectorName);
        this._inputProfession = document.querySelector(this._selectorProfession);
    }

getUserInfo(){
    this.infoAboutUser = {};
    this.infoAboutUser[0] = this._inputName.textContent;
    this.infoAboutUser[1] = this._inputProfession.textContent;
    return this.infoAboutUser;
}
setUserInfo({ data }){
    this._inputName.textContent = data[0];
    this._inputProfession.textContent = data[1];
}
}