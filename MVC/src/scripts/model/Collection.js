import config from '../config';
import Model from './Model';


export default class CollectionContacts{
    constructor(){
        this.contactListUsers = [];
    }
    fetchServerData(){
        return fetch(config.contactsUrl)
            .then(resp => resp.json())
            .then((data) => {
                this.setData(data)
            })
    }
    setData(data){
        this.contactListUsers = data.map((elem ) => new Model(elem));
        
    }
    getModelById(id) {
        return this.contactListUsers.find((item) => item.id == id);   
    }
    deleteContact(id){
        const model = this.getModelById(id);
        this.contactListUsers = this.contactListUsers.filter(elem => elem != model);
        return model.delete();
    }
    addContact(data){
        const model = new Model(data);
        this.contactListUsers.push(model);
        return model.saveList();
    }
}
