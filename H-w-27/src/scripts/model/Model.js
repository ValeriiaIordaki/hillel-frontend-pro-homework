import config from '../config';


export default class Model{
    urlTask(){
        return config.contactsUrl + `/${this.id}`
    }
    
    constructor(data){
        this.setData(data);
    }
    setData(data){
        Object.assign(this, data);
    }
    saveList(){
        return this.id ? this.updateList() : this.createList();
    }
    updateList(){
        return fetch(`${this.urlTask()}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        });
    }

    createList(){
        return fetch(config.contactsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        })
        .then(res => res.json())
        .then((data) => {
            this.setData(data)
        });
    }
    
    delete(){
        return fetch(`${this.urlTask()}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }        
        });
    }   
}