'user strict'

function getUserName() {
    let name = prompt('What\'s your name?', '');

    (name === '' || name === null || !isNaN(name))? getUserName() : name;
}

function inputNumbers(){
    let numbers = prompt('Input your numbers separated by \',\'');
    return numbers.split(',').filter(elem => elem);
}

function getMaxNumber(arr){
    let max = arr[0];
    for(let key of arr){
        if(+max < +key) max = key;
    }
    return +max;
}

function getMinNumber(arr){
    let min = arr[0];
    for(let key of arr){
        if(+min > +key) min = key;
    }
    return +min;
}

function isArrayInvalid(arr, max, min){
    console.log(arr);
    if( arr == '' || arr.find( arr => isNaN(arr))) {
        max.style.backgroundColor = 'rgba(207, 0, 15, 0.5)';
        min.style.backgroundColor = 'rgba(207, 0, 15, 0.5)';
    } else{
        max.innerHTML += `${getMaxNumber(arr)};`;
        min.innerHTML += `${getMinNumber(arr)};`;
    }
}

function main(){
    let greeting = document.getElementById('greeting');
    let max = document.getElementById('max');
    let min = document.getElementById('min');
    greeting.innerHTML += `${getUserName()}!`;

    let userArray = inputNumbers();
    isArrayInvalid(userArray, max, min); 
}

main();
