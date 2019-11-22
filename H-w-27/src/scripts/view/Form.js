import $ from 'jquery';

export default class ViewInfoForm{
    // static HIDDEN_CLASS = 'hidden';

    constructor(config){
        this.config = config;
        this.$formInfo = this.createForm();
        this.idUser = null;
        this.$formInfo.on('submit',this.onFormContactSubmit.bind(this));
        this.$formInfo.on('click','#bttn-delete',this.onDeleteBtnClick.bind(this));
    }
    createForm(){
        return $(`
            <form action="#" id="add-new-user" class="user-info">
                <div class="basic-data">
                    <p>Basic data:</p>
                    <input type="text" name="name" id="full-name" placeholder="Input full name">
                    <input type="text" name="surname" id="user-name" placeholder="Input user name">
                </div>
                <div class="contact-info">
                    <p>Contact info:</p>
                    <input type="email" name="email" id="email" placeholder="Input e-mail">
                    <input type="phone" name="phone" id="phone" placeholder="Input phone">
                </div>
                <div class="form-button">
                    <button type="submit" id="bttn-save">Save</button>
                    <button type="button" id="bttn-delete">Delete</button>
                </div>
            </form>`
        );
    }
    onFormContactSubmit(e){
        e.preventDefault();
        const objData = {};
        this.$formInfo.serializeArray().forEach(({name,value})=>{
           objData[name] = value;
        });

        this.config.onFormSubmit(objData);
        this.openFormNewUser();
    }
    onDeleteBtnClick(e) {
        e.stopPropagation();
        this.config.onDelBtnClick(this.idUser);
    } 
    openFormNewUser(){
        this.resetForm();
        $('#bttn-delete').addClass('hidden')
    }
    resetForm(){
        this.$formInfo[0].reset();
    }
    showInfoUser(data){
        this.$formInfo[0][0].value = data.name;
        this.$formInfo[0][1].value = data.surname;
        this.$formInfo[0][2].value = data.email;
        this.$formInfo[0][3].value = data.phone;
        this.idUser = data.id;
    }
    removeClass(){
        $('#bttn-delete').removeClass('hidden');
    }   
}
