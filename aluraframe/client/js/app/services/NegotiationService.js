class NegotiationService {

    constructor(){
        this._httpService = new HttpService();
    }

    getWeekNegotiation(){
        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/semana')
                .then((data) =>{
                    resolve(data.map(object =>
                        new Negotiation(new Date(object.data), object.quantidade, object.valor)
                    ));
                })
                .catch(error => {
                    console.log('Server error response');
                    console.error(xhr.responseText);
                    reject("Could not connect to server");
                });
        });
    }

    getLastWeekNegotiation(){
        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/anterior')
                .then((data) =>{
                    resolve(data.map(object =>
                        new Negotiation(new Date(object.data), object.quantidade, object.valor)
                    ));
                })
                .catch(error => {
                    console.log('Server error response');
                    console.error(xhr.responseText);
                    reject("Could not connect to server");
                });
        });
    }

    getWeekBeforeLastNegotiation(){
        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/retrasada')
                .then((data) =>{
                    resolve(data.map(object =>
                        new Negotiation(new Date(object.data), object.quantidade, object.valor)
                    ));
                })
                .catch(error => {
                    console.log('Server error response');
                    console.error(xhr.responseText);
                    reject("Could not connect to server");
                });
        });
    }

    add(negotiation){

        return new Promise((resolve, reject) => {
            let data = {
                data: DateHelper.dateToText(negotiation.date),
                quantidade: negotiation.count,
                valor: negotiation.value,
            };

            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/negociacoes", true);
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