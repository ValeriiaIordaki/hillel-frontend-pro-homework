'user strict'

function userName(){
    let name;
    while(true) {
        name = prompt('What\'s your name?');
        if (isNaN(name)) break;
    }
    return name;
}

function inputNumbers(){
    let numbers = prompt('Input your numbers separated by \',\'');
    return numbers.split(',').filter(elem => elem);
}

function maxNumber(arr){
    return Math.max.apply(null, arr);
}

function minNumber(arr){
    return Math.min.apply(null, arr);
}

function validator(arr, max, min){
    console.log(arr);
    if( arr == '' || arr.find( arr => isNaN(arr))) {
        max.style.backgroundColor = 'rgba(207, 0, 15, 0.5)';
        min.style.backgroundColor = 'rgba(207, 0, 15, 0.5)';
    } else{
        max.innerHTML += `${maxNumber(arr)};`;
        min.innerHTML += `${minNumber(arr)};`;
    }
}

function main(){
    let greeting = document.getElementById('greeting');
    let max = document.getElementById('max');
    let min = document.getElementById('min');
    greeting.innerHTML += `${userName()}!`;

    let userArray = inputNumbers();
    validator(userArray, max, min); 
}

main();
