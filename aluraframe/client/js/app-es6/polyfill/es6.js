if(!Array.prototype.includes) {
    console.log('Polyfill for Array.includes apply.');
    Array.prototype.includes = function(elemento) {
        return this.indexOf(elemento) != -1;
    };
}