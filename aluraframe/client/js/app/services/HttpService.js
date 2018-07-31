class HttpService {

    get(url){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            /* Configuration */
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        console.log('Getting week negotiation.');
                        resolve(JSON.parse(xhr.responseText));
                    } else{
                        console.log('Server error response.');
                        console.error(xhr.responseText);
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send();
        });
    }
    post(data, url){

    }
}