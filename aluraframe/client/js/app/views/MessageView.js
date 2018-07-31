class MessageView extends View{

    template(model){
        return model.text ? `
            <p class="alert alert-success">${model.text}</p>
        ` : `<p></p>`;
    }
}