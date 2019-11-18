import config from '../config';
import Model from './Model';


export default class TodoCollection{
    constructor(){
        this.todoListItems = [];
    }
    fetchServerData(){
        return fetch(config.contactsUrl)
            .then(resp => resp.json())
            .then((data) => this.setData(data))
    }
    setData(data){
        this.todoListItems = data.map((elem ) => new Model(elem));
        console.log(this.todoListItems)
    }
}
