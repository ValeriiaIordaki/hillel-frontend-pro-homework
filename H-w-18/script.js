'use strict'
class UsersCatalog{
    static USERS_URL = 'https://jsonplaceholder.typicode.com/users';
    static USER_CLASS = 'user';
    static BTTN_ADD_USER_CLASS = 'add-user';
    static HIDDEN_CLASS = 'hidden';
    static REQUEST_HEADERS = `'Content-Type':'application/json'`;

    static usersList = document.querySelector('ul.users-list');
    static userInfo = document.querySelector('div.user-info');
    static userNameTemp = document.getElementById('user-sidebar-temp').innerHTML;
    static formDataUser = document.getElementById('add-new-user');
    static bttnSave = document.getElementById('bttn-save');
    static bttnDelete = document.getElementById('bttn-delete');

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
    }
    
    bindEventListener(){
        UsersCatalog.userInfo.addEventListener('click', this.onClickBttn)
        UsersCatalog.usersList.parentElement.addEventListener('click',this.onClickUser)
    }
    onClickUser(event){
        switch(true){
            case (event.target.classList.contains(UsersCatalog.USER_CLASS)):
                const userId = event.target.getAttribute('id');
                UsersCatalog.fetchUserInfo(userId);
                UsersCatalog.removeClass(UsersCatalog.bttnDelete, UsersCatalog.HIDDEN_CLASS)

            break;
            case (event.target.classList.contains(UsersCatalog.BTTN_ADD_USER_CLASS)):
                UsersCatalog.addClass(UsersCatalog.bttnDelete, UsersCatalog.HIDDEN_CLASS);
                UsersCatalog.resetForm();
            break;
        }
    }
    onClickBttn(event){
        switch(true){
            case (event.target == UsersCatalog.bttnDelete):
                const userId = UsersCatalog.id;
                UsersCatalog.deletUser(userId);
                UsersCatalog.addClass(UsersCatalog.bttnDelete, UsersCatalog.HIDDEN_CLASS)
                UsersCatalog.resetForm();
            break;
            case (event.target == UsersCatalog.bttnSave):
                    UsersCatalog.addUser()
                UsersCatalog.addClass(UsersCatalog.bttnDelete, UsersCatalog.HIDDEN_CLASS);
                UsersCatalog.resetForm();
            break;
        }
    }
    static deletUser(id){
        UsersCatalog.requestJson(`${UsersCatalog.USERS_URL}/${id}`, {method: 'DELETE'})
        .then (
            document.getElementById(`${id}`).remove()
        )
    }
    static addUser(){
        const user = UsersCatalog.getFormValues();
        const options = UsersCatalog.getOptionsObj('POST', UsersCatalog.REQUEST_HEADERS, user);
        UsersCatalog.requestJson(UsersCatalog.USERS_URL, options);
        UsersCatalog.getUsersList();

    }
    static requestJson(url, optionsObj = {}){
        return fetch(url, {
            method: optionsObj.method,
            body: JSON.stringify(optionsObj.body)
        })
        .then(res => res.json())
        .catch(err => console.warn(err))
    }   
    static getUsersList(){
        UsersCatalog.requestJson(UsersCatalog.USERS_URL)
        .then((data)=>{
            UsersCatalog.addUsersToList(data);
        }) 
    }
    static addUsersToList(arrayUser){
        UsersCatalog.usersList.innerHTML = ''
        const users = arrayUser.map((elem) =>{
            return UsersCatalog.userNameTemp.replace('{{name}}', elem.name)
                                            .replace('{{id-user}}',elem.id)
        });
        UsersCatalog.usersList.insertAdjacentHTML('beforeend',users.join(' '))
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
        }}
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

    static getOptionsObj(method,body){
        return { method, body}
    }
    
    
}
const usersCatalog = new UsersCatalog();
