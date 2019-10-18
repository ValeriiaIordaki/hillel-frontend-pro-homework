'use strict'
class UsersCatalog{
    static USERS_URL = 'https://jsonplaceholder.typicode.com/users';
    static USER_CLASS = 'user';
    static BTTN_ADD_USER_CLASS = 'add-user';
    static HIDDEN_CLASS = 'hidden';

    static usersList = document.querySelector('ul.users-list');
    static userInfo = document.querySelector('div.user-info');
    static userNameTemp = document.getElementById('user-sidebar-temp').innerHTML;
    static formDataUser = document.getElementById('add-new-user');
    static bttnSave = document.getElementById('bttn-save');
    static bttnDelete = document.getElementById('bttn-delete');
    static bttnAdd = document.getElementById('add-user');

    // elems to form
    static fullNameInput = document.getElementById('full-name');
    static userNameInput = document.getElementById('user-name');
    static phoneInput = document.getElementById('phone');
    static emailInput = document.getElementById('email');
    static websiteInput = document.getElementById('website');
    static streetInput = document.getElementById('street');
    static suiteInput = document.getElementById('suite');
    static zipcodeInput = document.getElementById('zipcode');
    static id = null;

    constructor(){
        this.init();
        this.bindEventListener();
    }

    init(){
        UsersCatalog.getUsersList();
        UsersCatalog.openFormNewUser();
    }
    
    bindEventListener(){
        UsersCatalog.usersList.addEventListener('click',this.onClickUser)
        UsersCatalog.bttnAdd.addEventListener('click',this.onClickBttnAddUser)
        UsersCatalog.formDataUser.addEventListener('submit', this.onSubmitSaveUser)
        UsersCatalog.bttnDelete.addEventListener('click', this.onClickBttnDeleteUser)
    }
    onClickUser(event){
        if (event.target.classList.contains(UsersCatalog.USER_CLASS)){
            const userId = event.target.dataset.userId;

            UsersCatalog.fetchUserInfo(userId);
            UsersCatalog.removeClass(UsersCatalog.bttnDelete, UsersCatalog.HIDDEN_CLASS)
        }
    }
    onClickBttnAddUser(){
        UsersCatalog.addClass(UsersCatalog.bttnDelete, UsersCatalog.HIDDEN_CLASS);
        UsersCatalog.resetForm();
    }
    onSubmitSaveUser(event){
        event.preventDefault();
        const user = UsersCatalog.getFormValues(); 

        UsersCatalog.creatUser(user);
        UsersCatalog.openFormNewUser();
    }
    onClickBttnDeleteUser(){
        const userId = UsersCatalog.id;

        UsersCatalog.deletUser(userId);
        UsersCatalog.openFormNewUser();
    }
    static openFormNewUser(){
        UsersCatalog.addClass(UsersCatalog.bttnDelete, UsersCatalog.HIDDEN_CLASS);
        UsersCatalog.resetForm();
    }
    static getUsersList(){
        UsersCatalog.requestJson(UsersCatalog.USERS_URL)
        .then(UsersCatalog.addUsersToList) 
    }
    static requestJson(url, method = 'GET', body = null){
        return fetch(url, {method, body})
        .then(res => res.json())
        .catch(err => console.warn(err))
    } 

    static deletUser(id){
        UsersCatalog.requestJson(`${UsersCatalog.USERS_URL}/${id}`, 'DELETE')
        .then (UsersCatalog.getElemList(id).remove())
    }
    static getElemList(id){
        return document.querySelector(`#user${id}`)
    }

    static creatUser(user){
        UsersCatalog.requestJson(UsersCatalog.USERS_URL, 'POST', user)
        .then((data) =>{
            user.id = data.id;
            UsersCatalog.addUserToList(user);
        })
    }  
    static addUserToList(user){
        const el = UsersCatalog.creatNewUser(user);
        UsersCatalog.usersList.append(el);
    }
    static getHtmlNewUser(user){
        return  UsersCatalog.getUserElemHtml(user);
    }
    static creatNewUser(user){
        const html = UsersCatalog.getHtmlNewUser(user);
        const template = document.createElement('template');
        template.insertAdjacentHTML('afterbegin', html.trim());
        return template.firstElementChild;
    }

    static addUsersToList(arrayUser){
        const users = arrayUser.map(UsersCatalog.getUserElemHtml);
        UsersCatalog.usersList.insertAdjacentHTML('beforeend',users.join(''))
    }
    static getUserElemHtml(elem){
        return UsersCatalog.userNameTemp.replace('{{name}}', elem.name)
                                        .replace('{{id}}', elem.id)
                                        .replace('{{id}}', elem.id);
    }
    static setFormValues(userObj){
        UsersCatalog.fullNameInput.value = userObj.name;
        UsersCatalog.userNameInput.value = userObj.username;
        UsersCatalog.phoneInput.value = userObj.phone;
        UsersCatalog.emailInput.value = userObj.email;
        UsersCatalog.websiteInput.value = userObj.website;
        UsersCatalog.streetInput.value = userObj.address.street;
        UsersCatalog.suiteInput.value = userObj.address.suite;
        UsersCatalog.zipcodeInput.value = userObj.address.zipcode;
    }
    static getFormValues() {
        return { 
            name: UsersCatalog.fullNameInput.value,
            username: UsersCatalog.userNameInput.value,
            phone: UsersCatalog.phoneInput.value,
            email: UsersCatalog.emailInput.value,
            website: UsersCatalog.websiteInput.value,
            address: { 
                street: UsersCatalog.streetInput.value,
                suite: UsersCatalog.suiteInput.value,
                zipcode: UsersCatalog.zipcodeInput.value,
            }
        }
    } 

    static fetchUserInfo(id){
        return UsersCatalog.requestJson(`${UsersCatalog.USERS_URL}/${id}`)
         .then((data)=>{
           UsersCatalog.setFormValues(data)
           UsersCatalog.id = data.id;
         })
    } 
    static removeClass(elem, nameClass){
        elem.classList.remove(nameClass);
    }  
    static addClass(elem, nameClass){
        elem.classList.add(nameClass);
    }
    static resetForm(){
        UsersCatalog.formDataUser.reset();
    }
}
const usersCatalog = new UsersCatalog();