export class ProxyFactoryService {

    static create(object, props, action){
        return new Proxy(object, {
            get(target, prop, receiver){
                if(props.includes(prop) && ProxyFactoryService._isFunction(target[prop])){
                    return function (){
                        console.log(`intercepitando ${prop}`);
                        let result = Reflect.apply(target[prop], target, arguments);
                        action(target);
                        return result;
                    }
                }

                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver){
                let result = Reflect.set(target, prop, value, receiver);
                if(prop.includes(prop))
                    action(target);
                return result;
            }
        });
    }

    static _isFunction(func){
        return typeof(func) === typeof(Function);
    }
}