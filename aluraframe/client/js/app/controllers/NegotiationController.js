class NegotiationController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#data');
        this._inputValue = $('#valor');
        this._inputCount = $('#quantidade');
        this._order = '';

        this._negotiationList = new Bind(
            new NegotiationList(),
            new NegotiationView($('#negotiationView')),
            'add', 'removeAll', 'order', 'reverseOrder'
        );

        this._message = new Bind(
            new Message(),
            new MessageView($('#messageView')),
            'text'
        );


        this._service = new NegotiationService();
        this._init();
    }

    _init(){
        this._service
            .list()
            .then(negotiations => negotiations.forEach(
                negotiation => this._negotiationList.add(negotiation)
            ))
            .catch( error => this._message.text = error);

        setInterval(() => this._import(), 50000)
        this._import();
    }

    orderData(column){
        if(this._order === column) {
         this._negotiationList.reverseOrder();
        } else
         this._negotiationList.order((a, b) => a[column] - b[column]);

        this._order = column;
    }

    add(event){
        event.preventDefault();
        let negotiationData = this._createNegotiation();
        this._service
            .add(negotiationData)
            .then(()=>{
                this._negotiationList.add(negotiationData);
                this._clearForm();
                this._message.text = "Negotiation Added";
            })
            .catch(error => {this._message.text = error});
    }

    _import(){
        this._service
            .importNegotiations(this._negotiationList)
            .then(data => {
                data.forEach( negotiation => this._negotiationList.add(negotiation));
            })
            .catch(error => {
                this._message.text = error
            });
    }

    removeAll(event){
        event.preventDefault();
        this._service
            .removeAll()
            .then(result => {
                    this._negotiationList.removeAll();
                    this._message.text = result;
                }
            )
            .catch( error => {
                this._message.text = error
            });
    }

    _createNegotiation(){
        return new Negotiation(
            DateHelper.textToDate(this._inputDate.value),
            parseInt(this._inputCount.value),
            parseFloat(this._inputValue.value)
        );
    }

    _clearForm(){
        this._inputDate.value = '';
        this._inputValue.value = 0;
        this._inputCount.value = 1;
        this._inputDate.focus();
    }

}