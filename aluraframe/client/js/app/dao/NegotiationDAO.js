class NegotiationDAO {

    constructor(connection){
        this._connection = connection;
        this._store = 'negotiations';
    }

    add(negotiation){
        return new Promise((resolve, reject) => {
           let request = this._connection.transaction([this._store], 'readwrite')
               .objectStore(this._store)
               .add(negotiation);
           request.onsuccess = e => {
             resolve();
           };

           request.onerror = e => {
              console.log(e.target.error.name);
              reject('Can´t is possible to add negotiation');
           };
        });
    }

    remove(negotiation){
        /**
         * @todo remove single negotiation
         */
    }

    removeAll(){
        return new Promise((resolve, reject) => {
            let request = this._connection.transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();
            request.onsuccess = e => resolve('Negotiations removed');

            request.onerror = e => {
                console.log(e.target.error.name);
                reject('Can´t is possible to remove negotiations');
            };
        });
    }

    listAll(){
        return new Promise((resolve, reject) => {
            let cursor = this._connection.transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let list = [];

            cursor.onsuccess = e => {
                let atual = e.target.result;
                if(atual){
                    let data = atual.value;
                    list.push(new Negotiation(data._date,data._count,data._value,));
                    atual.continue();
                } else
                    resolve(list);
            };

            cursor.onerror = e => {
                console.log(e.target.error.name);
                reject('Can´t is possible to show negotiations');
            };
        });
    }

}