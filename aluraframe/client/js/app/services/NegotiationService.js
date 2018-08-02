class NegotiationService {

    constructor(){
        this._httpService = new HttpService();
    }

    list(){
        return ConnectionFactory.getConnection()
            .then(connection => new NegotiationDAO(connection))
            .then(dao => dao.listAll())
            .catch(error => {
                throw new Error("It was not possible to get negotiations");
            });
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

    importNegotiations(negotiationsList){
        return this.getNegotiations()
            .then(data => data.filter( negotiation => !negotiationsList.list.some(
                index => JSON.stringify(negotiation) === JSON.stringify(index)
            )))
            .catch(error => {
                this._message.text = error
            });
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
                ConnectionFactory.getConnection().then(connection => {
                    new NegotiationDAO(connection).add(negotiation).then(() => {
                        return data;
                    }).catch( error => {
                        console.log(error.result.name);
                        throw new Error("Could not connect to server");
                    });
                });
            })
            .catch(error => {
                console.log('Server error response');
                console.error(error);
                throw new Error("Could not connect to server");
            });

    }

    removeAll(){
        return  ConnectionFactory.getConnection()
            .then(connection => new NegotiationDAO(connection))
            .then(dao => dao.removeAll())
            .catch(error => {
                console.log(error);
                throw new Error("it was not possible to delete negotiations");
            });
    }
}