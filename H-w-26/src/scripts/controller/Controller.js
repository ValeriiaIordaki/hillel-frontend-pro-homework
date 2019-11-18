// import $ from 'jquery';

import TodoCollection from "../model/Collection";
import TodoListView from '../view/List';




export default class Controller{
    constructor(){
        this.collection = new TodoCollection;
        this.todoListView = new TodoListView({
                    onTodoToggle: this.onTodoItemToggle.bind(this),
                    onDelBtnClick: this.onDeleteBtnClick.bind(this)
        });

        this.renderData = this.renderData.bind(this);
        this.tyyt()
    }
    tyyt(){
        this.collection.fetchServerData().then(this.renderData)
    }
    renderData(){
        this.todoListView.renderTodoList(this.collection.todoListItems)
    }
    onTodoItemToggle(id){
        const model = this.collection.getModelById(id);
        model.toggleState()
            .then(() => this.renderData()); 
    }
    

    onDeleteBtnClick(id){
        this.collection.deleteTodo(id)
            .then(() => this.renderData());

    }

}