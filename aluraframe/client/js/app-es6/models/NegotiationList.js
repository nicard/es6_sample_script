export class NegotiationList {
    constructor(){
        this._negotiationList = [];
    }

    add(negociacao){
        this._negotiationList.push(negociacao);
    }

    get list(){
        return [].concat(this._negotiationList);
    }

    get totalVolume(){
        return this._negotiationList.reduce((total, n) => total += n.volume, 0);
    }

    removeAll(){
        this._negotiationList = [];
    }

    order(criteria){
        this._negotiationList.sort(criteria);
    }

    reverseOrder() {
        this._negotiationList.reverse();
    }
}