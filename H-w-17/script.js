'use strict'
class UsersCatalog{
    static USERS_URL = 'https://jsonplaceholder.typicode.com/users';
    static USER_CLASS = 'user';

    static listUsers = document.querySelector('ul.users-list');
    static userInfo = document.querySelector('div.user-info');
    static userNameTemp = document.getElementById('user-sidebar-temp').innerHTML;
    static userInfoTemp = document.getElementById('user-info-temp').innerHTML;

    constructor(){
        this.createCatalogUsers();
        this.bindEventListener();
    }

    createCatalogUsers(){
        fetch(UsersCatalog.USERS_URL)
        .then( resp => resp.json())
        .then((data)=>{
            UsersCatalog.addUsersToList(data);
            UsersCatalog.fetchUserInfo(data[0].id)
        })
        .catch(() => {
            console.error('Error loading.');
        })
    }
    bindEventListener(){
        UsersCatalog.listUsers.addEventListener('click',this.onClickUser)
    }
    onClickUser(event){
        UsersCatalog.clearInfo();
        if(event.target.classList.contains(UsersCatalog.USER_CLASS)){
            const userId = event.target.getAttribute('id');
            UsersCatalog.fetchUserInfo(userId)
        }
    }

    static addUsersToList(arrayUser){
        const users = arrayUser.map((elem) =>{
            return UsersCatalog.userNameTemp.replace('{{name}}', elem.name)
                                            .replace('{{id-user}}',elem.id)
        });
        UsersCatalog.listUsers.insertAdjacentHTML('beforeend',users.join(' '))
    }
    static fetchUserInfo(id){
        fetch(`${UsersCatalog.USERS_URL}/${id}`)
            .then( resp => resp.json())
            .then((data)=>{
                UsersCatalog.addUserInfo(data);
            })
    }
    static addUserInfo(userInfo){
       const info = UsersCatalog.userInfoTemp.replace('{{name}}', userInfo.name)
                                        .replace('{{user-name}}', userInfo.username)
                                        .replace('{{email}}', userInfo.email)
                                        .replace('{{street}}', userInfo.address.street)
                                        .replace('{{suite}}', userInfo.address.suite)
                                        .replace('{{city}}', userInfo.address.city)
                                        .replace('{{zipcode}}', userInfo.address.zipcode)
                                        .replace('{{geo}}', `${userInfo.address.geo.lat}, ${userInfo.address.geo.lat}`)
                                        .replace('{{phone}}', userInfo.phone)
                                        .replace('{{website}}', userInfo.website)
                                        .replace('{{nameCompany}}', userInfo.company.name)
                                        .replace('{{catchPhrase}}', userInfo.company.catchPhrase)
                                        .replace('{{bs}}', userInfo.company.bs)

        UsersCatalog.userInfo.insertAdjacentHTML('beforeend', info)
    }
    static clearInfo(){
        UsersCatalog.userInfo.innerHTML = '';
    }
   
}
const usersCatalog = new UsersCatalog();
