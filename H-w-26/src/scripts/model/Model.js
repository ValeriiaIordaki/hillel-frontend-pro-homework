import config from '../config';


export default class Model{
    constructor(data){
        Object.assign(this, data);
    }
    deleteTodo(data) {
        Object.assign(this, data); 
        return this.delete();
    }
    
    changeState(data) {
        Object.assign(this, data);
        return this.update();
    }
    
    update(){
        return fetch(config.todosUrl+`/${this.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        });
    }
    
    delete(){
        return fetch(config.todosUrl+`/${this.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }        
        });
    }
}