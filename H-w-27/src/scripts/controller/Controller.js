import CollectionContacts from "../model/Collection";
import ViewContacts from '../view/Contact';
import FormInfo from '../view/Form';
import $ from 'jquery';





export default class Controller{
    constructor(){
        this.collection = new CollectionContacts;
        this.contactsList = new ViewContacts({
                    onContactsClick: this.onContactsItemClick.bind(this),
                    onAddBttnClick: this.onAddBttnItemClick.bind(this),
        });

        this.form = new FormInfo({
            onFormSubmit: this.onFormSubmit.bind(this),
            onDelBtnClick: this.onDeleteContactClick.bind(this),
        });

        $('#container').append(this.contactsList.$containerUsers)
                       .append(this.form.$formInfo)
        this.renderData = this.renderData.bind(this);
        this.collection.fetchServerData().then(this.renderData);
        this.form.openFormNewUser();
    }
    
    renderData(){
        this.contactsList.renderContactsList(this.collection.contactListUsers)
    }
    onContactsItemClick(id){
        const model = this.collection.getModelById(id);
        this.form.showInfoUser(model);
        this.form.removeClass();
    }
    onFormSubmit(data){
       this.collection.addContact(data)
            .then(this.renderData());
    }
    onAddBttnItemClick(){
        this.form.openFormNewUser();
    }
    onDeleteContactClick(id){
        this.collection.deleteContact(id)
            .then(this.renderData());
        this.form.openFormNewUser();
    }

}