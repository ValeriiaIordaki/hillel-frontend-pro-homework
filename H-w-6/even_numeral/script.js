'user strict'

let inputNumber;
let count = 0;

while(true){
// В целях избежания неправильного ввода числа, например "0000989"
    inputNumber = +prompt('Введите число.');
    if (inputNumber) break;
}
    
let inputArray = inputNumber.toString().split('');

for(let numeral of inputArray){
    if(numeral % 2 === 0) count++;
}

alert('Количество четных цифр: ' + count);

