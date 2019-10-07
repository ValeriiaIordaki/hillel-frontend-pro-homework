'use strict'

class PhoneDirectory{
    static TABLE_PHONE_DIRECTORY_CLASS = 'table-contacts';
    static NEW_CONTACT_CLASS = 'new-contact';
    static DELET_BUTTON_CLASS = 'delBtn';

    static formTable = document.querySelector('form');
    static bodyTableContacts = document.querySelector('tbody');
    static delContact = document.getElementById('deletContact').innerHTML;
    static colectionValueInput = document.querySelectorAll('input');

    constructor(elem){
        this.elem = elem;
        this.bindEventListeners();
        this.bindClasses();
    }
    static creatElem(tag){
        return tag = document.createElement(tag);
    }

    bindClasses(){
        this.elem.classList.add(PhoneDirectory.TABLE_PHONE_DIRECTORY_CLASS);
    } 
    creatInformationCells(perentTag){
        let numberOfColumnsTable = this.elem.firstElementChild.firstElementChild.children.length;

        for(let i = 0; i < numberOfColumnsTable; i++){
            let td = PhoneDirectory.creatElem('td');
            perentTag.appendChild(td);

            if(i === numberOfColumnsTable - 1){
                td.innerHTML = PhoneDirectory.delContact
            }else{
                td.innerHTML = PhoneDirectory.colectionValueInput[i].value;
            }
        }
    }
    creatNewContact(){
        let tr = PhoneDirectory.creatElem('tr');
        PhoneDirectory.bodyTableContacts.appendChild(tr);
        tr.classList.add(PhoneDirectory.NEW_CONTACT_CLASS);

        this.creatInformationCells(tr);
    }

    resetForm(){
        PhoneDirectory.formTable.reset();
    }

    onFormSubmit(){
        this.creatNewContact();
        this.resetForm();
    }
    onBttnClick(e){
        if(e.target.classList.contains(PhoneDirectory.DELET_BUTTON_CLASS)){
           e.target.closest('.new-contact').remove();
        }
    }

    bindEventListeners(){
        PhoneDirectory.formTable.addEventListener('submit',this.onFormSubmit.bind(this));
        this.elem.addEventListener('click',this.onBttnClick.bind(this));
    }

}
const myPhoneDtrectory = new PhoneDirectory(document.getElementById('phone-directory'));