import $ from 'jquery';

export default class TodoListView{
    constructor(config){
        this.$containerList= $('#containerTodoList');
        this.config = config;
        this.$containerList.on('click', '.todo-list__item', this.onTodoItemToggle.bind(this));
        this.$containerList.on('click', '.delete-bttn', this.onDeleteBtnClick.bind(this));
    }
    getElemId($elem) {
        return $elem.data('todoId');
    }
    onTodoItemToggle(e){
        const id = this.getElemId($(e.target));  
        this.config.onTodoToggle(id);
    }
    onDeleteBtnClick(e) {
        e.stopPropagation();
        this.config.onDelBtnClick(this.getElemId($(e.target).parent()));
    }
    

    renderTodoList(data){	       
        this.$containerList.empty();
        data.forEach(item => this.renderTodo(item));	
    }
    renderTodo(todo) {
        this.$containerList.append(this.getTodoItemHtml(todo))
    }
    getTodoItemHtml({id, title, completed}){	
        this.$containerList.append(`
            <div data-todo-id="${id}" class="todo-list__item ${completed? 'done': ''}">
                <p class="todo-list__item__title">${title}</p>
                <span class="delete-bttn">&#65794</span>
            </div>`);	
    }	
}