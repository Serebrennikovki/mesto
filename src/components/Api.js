export default class Api{
    constructor(option){
        this._baseUrl = option.baseUrl;
        this._headers = option.headers;
    }

    getInitialcard(){
        return fetch(this._baseUrl+'/cards ',
        {
            method: 'GET',
            headers: this._headers,
        })
          .then(res => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
          .catch((error)=>{
            console.log(error);
        })
    }

    getUsersInfo(){
        return fetch(this._baseUrl+'/users/me',{
            method: 'GET',
            headers: this._headers,
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
          .catch((error)=>{
            console.log(error);
        })
    }

    addCard(data){
        return fetch( this._baseUrl+'cards',{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data[0],
                link: data[1]
              })
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
          .catch((error)=>{
            console.log(error);
        })
    }

    changeUserInfo(data){
        return fetch(this._baseUrl+'/users/me',{
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: data[0],
            about: data[1],
        })
    })
            .then(res => {
                if(res.ok){
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((error)=>{
                console.log(error);
                })

    }

    deleteCard(idCard){
        return fetch(this._baseUrl+'/cards/'+idCard,{
            method:'DELETE',
            headers: this._headers,
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((error)=>{
            console.log(error);
            })
    }
    
}