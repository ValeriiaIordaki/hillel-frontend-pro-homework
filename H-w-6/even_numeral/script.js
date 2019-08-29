'user strict'

function getArray(){
    let inputNumber;
    while(true){
        inputNumber = prompt('Введите число.');
        if (!isNaN(inputNumber)) break;
    }

    return Number(inputNumber).toString().split('');
}

function countEven(inputArray){
    let count = 0;
    for(let numeral of inputArray) {
        if(numeral % 2 === 0) count++;
    }

    return count;
}

function main(){
    let userArray = getArray();
    let count = countEven(userArray);
    alert('Количество четных цифр: ' + count);
}

main();
