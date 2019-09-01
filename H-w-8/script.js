'user strict'

const input = document.querySelector('input');
const button = document.querySelector('#addBtn');
const ul = document.querySelector('#list');

input.addEventListener('change', onInputChange);
button.addEventListener('click', onBtnClick);

function onInputChange(){
    return +input.value;
}

function getList(num){
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
    let numberOfLi = onInputChange();
    if(ul.innerHTML !== ''){
        removeList()
    }
   getList(numberOfLi); 
}
