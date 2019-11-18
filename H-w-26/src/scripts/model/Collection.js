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
        
    }
    getModelById(id) {
        return this.todoListItems.find((item) => item.id == id)
        
    }
    deleteTodo(id){
        const model = this.getModelById(id);
        this.todoListItems = this.todoListItems.filter(elem => elem != model);
        return model.delete();
    }
}
