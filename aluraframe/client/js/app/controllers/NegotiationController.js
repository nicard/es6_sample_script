class NegotiationController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#data');
        this._inputValue = $('#valor');
        this._inputCount = $('#quantidade');
        this._negotiationList = new NegotiationList();
        this._negotiationView = new NegotiationView($('#negotiationView'));
        this._messageView = new MessageView($('#messageView'));
        this._message = new Message();
        this._messageView.update(this._message);

        this._negotiationView.update(this._negotiationList);
        Object.freeze(this);
    }

    add(event){
        event.preventDefault();
        this._negotiationList.add(this._createNegotiation());
        this._negotiationView.update(this._negotiationList);
        this._message.text = "Negotiation Added";
        this._messageView.update(this._message);
        this._clearForm();
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