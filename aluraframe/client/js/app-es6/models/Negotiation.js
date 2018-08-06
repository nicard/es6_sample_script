class Negotiation {
    constructor(date, count, value){
        this._date = new Date(date.getTime());
        this._count = count;
        this._value = value;
        Object.freeze(this);
    }

    get volume(){
        return this._count * this._value;
    }

    get count(){
        return this._count;
    }

    get value(){
        return this._value;
    }

    get date(){
        return new Date(this._date.getTime());
    }

}