'user strict'

const input = document.querySelector('input#count');
const button = document.querySelector('#addBtn');
const ul = document.querySelector('#list');

button.addEventListener('click', onBtnClick);

function createLi(num){
    let newLi;
    for(let index = 1; index <= num; index++){
        newLi = document.createElement('li');
        newLi.textContent = `${index}`;
        document.querySelector('ul').append(newLi);
    }
}

function removeList(){
    while(ul.firstChild){
        document.querySelector('li').remove();
    }
}

function onBtnClick(){
    let listLength = input.value;
    if(ul.innerHTML !== ''){
        removeList()
    }
   createLi(listLength); 
}
