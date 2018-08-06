class HttpService {

    _hanldeError(response){
        if(!response.ok)
            throw new Error(response.text());
        return response.json();
    }


    get(url){
        return fetch(url)
            .then(response => this._hanldeError(response));
    }

    post(url, data){
        return fetch(url, {
            headers: { 'Content-type': 'application/json' },
            method: 'post',
            body: JSON.stringify(data)
        }).then(response => this._hanldeError(response));
    }
}