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
    post(url, data){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    console.log(xhr.responseText);
                    if (xhr.status === 200) {
                        resolve(null);
                    } else {
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.send(JSON.stringify(data));
        });
    }
}