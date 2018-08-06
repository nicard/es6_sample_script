import {currentInstance} from "./controllers/NegotiationController";
import {} from "./polyfill/fetch";

let controller = currentInstance();

document.querySelector('.form').onsubmit = controller.add.bind(controller);
document.querySelector('[type=button]').onclick = controller.removeAll.bind(controller);