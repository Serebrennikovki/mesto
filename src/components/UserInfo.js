export default class UserInfo{
    constructor(selectorName, selectorProfession, selectorAvatar ){
        this._selectorName = selectorName;
        this._selectorProfession = selectorProfession;
        this._selectorAvatar = selectorAvatar;
        this._inputName = document.querySelector(this._selectorName);
        this._inputProfession = document.querySelector(this._selectorProfession);
        this._selectorAvatar = document.querySelector(this._selectorAvatar);
    }

getUserInfo(){
    this.infoAboutUser = {};
    this.infoAboutUser.name = this._inputName.textContent;
    this.infoAboutUser.about= this._inputProfession.textContent;
    return this.infoAboutUser;
}
setUserInfo({ data }){
    this._inputName.textContent = data.name;
    this._inputProfession.textContent = data.about;
}
setUserAvatar(link){
    this._selectorAvatar.src = link;
}
}