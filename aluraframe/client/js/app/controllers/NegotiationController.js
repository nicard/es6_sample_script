class NegotiationController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#data');
        this._inputValue = $('#valor');
        this._inputCount = $('#quantidade');

        this._negotiationList = new Bind(
            new NegotiationList(),
            new NegotiationView($('#negotiationView')),
            'add', 'removeAll'
        );

        this._message = new Bind(
            new Message(),
            new MessageView($('#messageView')),
            'text'
        );


        this._service = new NegotiationService();
        Object.freeze(this);
    }

    add(event){
        event.preventDefault();
        let negotiationData = this._createNegotiation();
        this._service.add(negotiationData)
            .then(()=>{
                this._negotiationList.add(negotiationData);
                this._message.text = "Negotiation Added";
            })
            .catch(error => {this._message.text = error});
        this._clearForm();
    }

    import(event){
        event.preventDefault();

        Promise.all([
            this._service.getWeekNegotiation(),
            this._service.getLastWeekNegotiation(),
            this._service.getWeekBeforeLastNegotiation()]
        ).then(results => {
            results
                .reduce((newArray, array) => newArray.concat(array),[])
                .forEach( negotiation => this._negotiationList.add(negotiation))
            this._message.text = "Negotations imported.";
        }).catch(error => {this._message.text = error});
    }

    removeAll(event){
        event.preventDefault();
        this._negotiationList.removeAll();
        this._message.text = "Negotiation's removed.";
    }

    _createNegotiation(){
        return new Negotiation(
            DateHelper.textToDate(this._inputDate.value),
            this._inputValue.value,
            this._inputCount.value
        );
    }

    _clearForm(){
        this._inputDate.value = '';
        this._inputValue.value = 0;
        this._inputCount.value = 1;
        this._inputDate.focus();
    }
}