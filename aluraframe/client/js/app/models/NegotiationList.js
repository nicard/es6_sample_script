class NegotiationList {
    constructor(){
        this._negotiationList = [];
    }

    add(negociacao){
        this._negotiationList.push(negociacao);
    }

    get list(){
        return [].concat(this._negotiationList);
    }

}