export default class Api{
    constructor(option){
        this._baseUrl = option.baseUrl;
        this._headers = option.headers;
    }

    _sendRequest(res){
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    

    getInitialCards(){
        return fetch(`${this._baseUrl}cards`,
        {
            method: 'GET',
            headers: this._headers,
        })
          .then(res=>this._sendRequest(res))
    }

    getUserInfo(){
        return fetch(`${this._baseUrl}users/me`,{
            method: 'GET',
            headers: this._headers,
        })
        .then(res=>this._sendRequest(res))
    }

    addCard(data){
        return fetch(`${this._baseUrl}cards` ,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
              })
        })
        .then(res=>this._sendRequest(res))
    }

    changeUserInfo(data){
        return fetch(`${this._baseUrl}users/me`,{
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: data.name,
            about: data.about
        })
    })
            .then(res=>this._sendRequest(res))
    }

    deleteCard(idCard){
        return fetch(`${this._baseUrl}cards/${idCard}`,{
            method:'DELETE',
            headers: this._headers,
        })
        .then(res=>this._sendRequest(res))
    }
    
    addLike(id){
        return fetch(`${this._baseUrl}cards/${id}/likes`,{
            method: 'PUT',
            headers: this._headers
        })
            .then(res=>this._sendRequest(res))
    }

    deleteLike(id){
    return fetch(`${this._baseUrl}cards/${id}/likes`,{
        method: 'DELETE',
        headers: this._headers
    })
        .then(res=>this._sendRequest(res))
    }

    changeAvatar(link){
        console.log(link);
        return fetch(`${this._baseUrl}users/me/avatar`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            })
        })
        .then(res=>this._sendRequest(res))
    }

}