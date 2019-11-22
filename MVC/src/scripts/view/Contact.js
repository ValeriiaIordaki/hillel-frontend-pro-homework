import $ from 'jquery';


export default class ViewContacts{
    constructor(config){
        this.config = config;
        
        this.$containerUsers = this.createElement(`<div id="containerContacts" class="container-users">
                                                    <span class="like-h2">List of Users:</span>
                                                    </div>` );
        this.$listContacts = this.createElement('<ul class="list-contacts"></ul>');
        this.$bttnAddContacts = this.createElement('<button id="add-user" type="button" class="add-user">Add</button>');
        
        this.$containerUsers.append(this.$listContacts)
                            .append(this.$bttnAddContacts);

        this.$listContacts.on('click', '.list-contacts__user', this.onUserClick.bind(this));
        this.$bttnAddContacts.on('click', this.onBttnAddUserClick.bind(this));
    }
    getElemId($elem) {
        return $elem.data('userId');
    }
    onUserClick(e){
        const id = this.getElemId($(e.target)); 
        this.config.onContactsClick(id);
    }
    onBttnAddUserClick(e){
        e.stopPropagation();
        this.config.onAddBttnClick();

    }
    createElement(html){
        return $(html);
    }

    renderContactsList(data){	       
        this.$listContacts.empty();
        data.forEach(item => this. renderContactsItem(item));	
    }
    
    renderContactsItem({id, name}){	
        this.$listContacts.append(
            `<li class="list-contacts__user" data-user-id="${id}">${name}</li>`
        );	
    }	
}