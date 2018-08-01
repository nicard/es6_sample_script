var ConnectionFactory = (function(){
    const db_name = 'negotiation_system';
    const db_version = 1;
    const stores = ['negotiations'];
    var connection = null;
    var closeConnection = null;

    return class ConnectionFactory {

        constructor(){
            throw new Error('This class can´t be instanced');
        }

        static getConnection(){
            return new Promise((resolve,reject) => {
                let openRequest = window.indexedDB.open(db_name, db_version);

                openRequest.onupgradeneeded = e => {
                    this._createStore(e.target.result);
                };

                openRequest.onsuccess = e => {
                    if(!connection) {
                        connection = e.target.result;
                        closeConnection = connection.close.bind(connection);
                        connection.close = function () {
                            throw new Error('This connection can´t be closed');
                        }
                    }
                    resolve(e.target.result);
                };

                openRequest.onerror = e => {
                    reject(e.target.error.name);
                };
            });
        }

        static _createStore(connection){
            stores.forEach(store => {
                if(connection.objectStoreNames.contains('store'))
                    ConectionFactory._deleteStore(e.target.result, store);
                connection.createObjectStore(store, {autoIncrement: true});
            });

        }

        static _deleteStore(connection, store){
            connection.deleteObjectStore(store, {autoIncrement: true});
        }

        static _closeConnection(){
            if(connection){
                closeConnection();
                connection = null;
            }
        }
    }
})();

