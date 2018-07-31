class NegotiationView extends View {

    template(listModel){
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
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
