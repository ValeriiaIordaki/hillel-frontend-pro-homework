import $ from 'jquery';

export default class InfoForm{
    // static HIDDEN_CLASS = 'hidden';

    constructor(config){
        this.config = config;

        this.$formInfo = this.createForm();
        this.$bttnDel = this.$formInfo.find('#bttn-delete');
        this.$name = this.$formInfo.find('#full-name');
        this.$surname = this.$formInfo.find('#surname');
        this.$email = this.$formInfo.find('#email');
        this.$phone = this.$formInfo.find('#phone');
        this.$idInput = this.$formInfo.find('#id-input');

        this.bindEventsListener();
    }
    bindEventsListener(){
        this.$formInfo.on('submit',this.onFormSubmit.bind(this));
        this.$formInfo.on('click','#bttn-delete',this.onDeleteBtnClick.bind(this));
    }
    onFormSubmit(e){
        e.preventDefault();

        const data = this.getFormData();
        this.config.onSubmit(data);
        this.openFormNewUser();
    }
    onDeleteBtnClick(e) {
        const id = this.$idInput.val();
        this.config.onDelete(id);
        this.openFormNewUser();

    } 
    getFormData(){
        const objData = {};
        this.$formInfo.serializeArray().forEach(({name,value})=>{
           objData[name] = value;
        });
        return objData;
    }
    createForm(){
        return $(`
            <form action="#" id="add-new-user">
                <div class="user-info">
                    <div class="basic-data">
                        <p>Basic data:</p>
                        <input type="text" name="name" id="full-name" placeholder="Input full name">
                        <input type="text" name="surname" id="surname" placeholder="Input user name">
                    </div>
                    <div class="contact-info">
                        <p>Contact info:</p>
                        <input type="email" name="email" id="email" placeholder="Input e-mail">
                        <input type="phone" name="phone" id="phone" placeholder="Input phone">
                        <div class="form-button">
                            <button type="submit" id="bttn-save">Save</button>
                            <button type="button" id="bttn-delete">Delete</button>
                        </div>
                    </div>
                    <input name = "id" type="hidden" id="id-input">
                </div>
            </form>`
        );
    }
   
    openFormNewUser(){
        this.resetForm();
        this.$idInput.val('');
        this.$bttnDel.addClass('hidden')
    }
    resetForm(){
        this.$formInfo[0].reset();
    }
    showInfoUser(data){
        this.removeClass();
        this.$name.val(data.name);
        this.$surname.val(data.surname);
        this.$email.val(data.email);
        this.$phone.val(data.phone);
        this.$idInput.val(data.id);
    }
    removeClass(){
        this.$bttnDel.removeClass('hidden');
    }   
}
