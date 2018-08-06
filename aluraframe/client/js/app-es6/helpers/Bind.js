import {ProxyFactoryService} from "../services/ProxyFactoryService";

export class Bind {
    constructor(model, view, ...props){
        let proxy = ProxyFactoryService.create(model, props, (model) => view.update(model));
        view.update(model);

        return proxy;
    }
}