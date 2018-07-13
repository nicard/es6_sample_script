class MessageView {
    constructor(element){
        this._element = element;
    }

    update(model){
        this._element.innerHTML = this._template(model);
    }
    _template(model){
        return model.text ? `
            <p class="alert alert-success">${model.text}</p>
        ` : `<p></p>`;
    }
}