class DateHelper {

    constructor(){
        throw new Error('DateHelper-class can not be instantiated');
    }

    static textToDate(text){
        return new Date(...text.split('-')
            .map((item, index) => item - index % 2)
        );
    }

    static dateToText(date){
        return date.getDate()+"/"+(date.getMonth() + 1) +"/"+date.getFullYear();
    }
}