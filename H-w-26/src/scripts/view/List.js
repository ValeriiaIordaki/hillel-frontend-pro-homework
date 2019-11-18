import $ from 'jquery';

export default class TodoListView{
    constructor($listContainer, $form, template, config){
        this.$containerList = $listContainer;
        this.$form = $form;
        this.todoItemTemplate = template;
        this.config = config;
        // this.$todoListElement.on('click', '.todo-item', this.onTodoItemClick.bind(this));
        // this.$todoListElement.on('click', '.delete-btn', this.onDeleteBtnClick.bind(this))
    }
    getElemId($elem) {
        return $elem.data('todoId');
    }
    
    onTodoItemClick(e){
        const id = this.getElemId($(e.target));    
        this.config.onTodoClick(id);
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
        console.log(work)
      }
    getTodoItemHtml({id, title, completed}){	
        return todoItemTemplate	
                        .replace('{{id}}', id)	
                        .replace('{{title}}', title)	
                        .replace('{{isDoneClass}}', completed ? TODO_ITEM_DONE_CLASS : '')	
    }	
}