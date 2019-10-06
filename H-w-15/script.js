'use strict'

class PhoneDirectory{
    static TABLE_PHONE_DIRECTORY_CLASS = 'table-contacts';
    static NEW_CONTACT_CLASS = 'new-contact';
    static DELET_BUTTON_CLASS = 'delBtn';

    constructor(elem){
        this.elem = elem;
        this.bindEventListeners();
        this.bindClasses();
    }

    get formTable(){
        return this.elem.parentElement.querySelector('form');
    }
    get bodyTableContacts(){
        return this.elem.querySelector('tbody');
    }
    get delContact(){
        return document.getElementById('deletContact').innerHTML;
    }
    get colectionValueInput(){
        return this.elem.querySelectorAll('input');
    }
    get numberOfColumnsTable(){
        return this.elem.firstElementChild.firstElementChild.children.length;
    }

    bindClasses(){
        this.elem.classList.add(PhoneDirectory.TABLE_PHONE_DIRECTORY_CLASS);
    } 

    static creatElem(tag){
        return tag = document.createElement(tag);
    }

    creatInformationCells(perentTag){
        for(let i = 0; i < this.numberOfColumnsTable; i++){
            let td = PhoneDirectory.creatElem('td');
            perentTag.appendChild(td);

            if(i === this.numberOfColumnsTable - 1){
                td.innerHTML = this.delContact
            }else{
                td.innerHTML = this.colectionValueInput[i].value;
            }
        }
    }
    creatNewContact(){
        let tr = PhoneDirectory.creatElem('tr');
        this.bodyTableContacts.appendChild(tr);
        tr.classList.add(PhoneDirectory.NEW_CONTACT_CLASS);

        this.creatInformationCells(tr);
    }

    resetForm(){
        this.formTable.reset();
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
        this.formTable.addEventListener('submit',this.onFormSubmit.bind(this));
        this.elem.addEventListener('click',this.onBttnClick.bind(this));
        // this.elem.querySelector('[type="text"]').addEventListener('change',this.onValidFormInput.bind(this));
    }

    // //additional task
    // onValidFormInput(e){
    //         this.validatorText(e.target)
    // }
    // validatorText(elem){
    //     if(isNaN(elem.innerHTML)){
    //         elem.parentElement.classList.add('not-corect')

    //     }else if(elem.innerHTML === '') {
    //         elem.parentElement.classList.add('not-corect')

    //     }else{
    //         elem.parentElementclassList.classList.remove('not-corect');
    //     }
    // }
}
const myPhoneDtrectory = new PhoneDirectory(document.getElementById('phone-directory'));