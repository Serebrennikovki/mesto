export default class UserInfo{
    constructor(selectorName, selectorProfession ){
        this._selectorName = selectorName;
        this._selectorProfession = selectorProfession;
        this._inputName = document.querySelector(this._selectorName);
        this._inputProfession = document.querySelector(this._selectorProfession);
    }

getUserInfo(){
    this.infoAboutUser = {};
    this.infoAboutUser.name = this._inputName.textContent;
    this.infoAboutUser.profession= this._inputProfession.textContent;
    return this.infoAboutUser;
}
setUserInfo({ data }){
    this._inputName.textContent = data.name;
    this._inputProfession.textContent = data.profession;
}
}