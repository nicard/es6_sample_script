class NegotiationController {

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#data');
        this._inputValue = $('#valor');
        this._inputCount = $('#quantidade');
        Object.freeze(this);
    }

    add(event){
        event.preventDefault();

        let date = DateHelper.textToDate(this._inputDate.value);

        let negociation = new Negotiation(
            date,
            this._inputValue.value,
            this._inputCount.value
        );

        console.log(DateHelper.dateToText(negociation.date));
    }
}