import config from '../config';


export default class Model{
    constructor(data){
        Object.assign(this, data);
    }
    urlTask(){
        return config.contactsUrl + `/${this.id}`
    }
    save(){
        return this.id ? this.update() : this.create();
    }
    update(){
        return fetch(`${this.urlTask()}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        });
    }

    create(){
        console.log('create')
    }
    
    delete(){
        return fetch(`${this.urlTask()}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }        
        });
    }
    
    toggleState(){
        this.completed = !this.completed;
        return this.save();
    }
    
   
}