import $ from 'jquery';

import TodoCollection from "../model/Collection";
import TodoListView from '../view/List';




export default class Controller{
    constructor(){
        this.collection = new TodoCollection;
        this.todoListView = new TodoListView(
                $('#containerTodoList'),	
                $('#newTodoForm'),	
                $('#todoItemTemplate').html(),
                {
                    onTodoClick: this.onTodoItemClick.bind(this),
                    onDelBtnClick: this.onDeleteBtnClick.bind(this)
                }
            );

        this.collection.fetchServerData()
        .then(this.todoListView.renderTodoList(this.collection.todoListItems));

    }
    getModelById(id) {
        return this.collection.todoListItems.find((item) => item.id == id)
    }
    
    onTodoItemClick(id){
        const model = this.getModelById(id);
        model.changeState({completed: !model.completed})
        .then(() => this.todoListView.renderTodosList(this.collection.todoListItems));    
    }

    onDeleteBtnClick(id){
        const model = this.getModelById(id);
        model.deleteTodo(null)
        .then(() => this.todoListView.renderTodosList(this.collection.todoListItems));

    }

}