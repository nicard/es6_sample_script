class NegotiationService {

    constructor(){
        this._httpService = new HttpService();
    }

    getNegotiations(){
        return Promise.all([
            this.getWeekNegotiation(),
            this.getLastWeekNegotiation(),
            this.getWeekBeforeLastNegotiation()]
        ).then(results => {
            return results
                .reduce((newArray, array) => newArray.concat(array),[]);
        }).catch(error => {throw new Error(error)});
    }

    getWeekNegotiation(){
        return this._httpService.get('negociacoes/semana')
            .then((data) =>{
                return data.map(object =>
                    new Negotiation(new Date(object.data), object.quantidade, object.valor)
                );
            })
            .catch(error => {
                console.log('Server error response');
                console.error(error);
                throw new Error("Could not connect to server");
            });

    }

    getLastWeekNegotiation(){
        return this._httpService.get('negociacoes/anterior')
            .then((data) =>{
                return data.map(object =>
                    new Negotiation(new Date(object.data), object.quantidade, object.valor)
                );
            })
            .catch(error => {
                console.log('Server error response');
                console.error(error);
                throw new Error("Could not connect to server");
            });
    }

    getWeekBeforeLastNegotiation(){

        return this._httpService.get('negociacoes/retrasada')
            .then((data) =>{
                return data.map(object =>
                    new Negotiation(new Date(object.data), object.quantidade, object.valor)
                );
            })
            .catch(error => {
                console.log('Server error response');
                console.error(error);
                throw new Error("Could not connect to server");
            });

    }

    add(negotiation){

        let data = {
            data: DateHelper.dateToText(negotiation.date),
            quantidade: negotiation.count,
            valor: negotiation.value,
        };
        return this._httpService.post("/negociacoes", data)
            .then((data) =>{
                return data;
            })
            .catch(error => {
                console.log('Server error response');
                console.error(error);
                throw new Error("Could not connect to server");
            });

    }
}