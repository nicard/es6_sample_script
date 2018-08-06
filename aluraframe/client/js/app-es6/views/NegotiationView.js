import {View} from './View';
import {DateHelper} from "../helpers/DateHelper";
import {currentInstance} from "../controllers/NegotiationController";

export class NegotiationView extends View
{
    constructor(element){
        super(element);
        element.addEventListener('click', (event) => {
           if(event.target.nodeName === 'TH')
               currentInstance().orderData(event.target.textContent.toLowerCase());
        });
    }

    template(listModel){
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATE</th>
                    <th>COUNT</th>
                    <th>VALUE</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${listModel.list.map( n => 
                   `
                        <tr>
                            <td>${DateHelper.dateToText(n.date)}</td>
                            <td>${n.count}</td>
                            <td>${n.value}</td>
                            <td>${n.volume}</td>
                        </tr>                        
                   ` 
                ).join('')}
            </tbody>
            
            <tfoot>           
                <td colspan="3"></td>
                <td>
                    ${listModel.totalVolume}
                </td>            
            </tfoot>
        </table>
        `;
    }
}
