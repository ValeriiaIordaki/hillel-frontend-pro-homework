'use strict';

function createCalculator(value) {
    return {
        add: (arg) => value += arg,
        sub: (arg) => value -= arg,
        divide: (arg) => value /= arg,
        mult: (arg) => value *= arg,
        set: (arg) => value = arg
    }
}

const calculator = createCalculator(10);

console.log(calculator.add(45)); // возвращает 55 
console.log(calculator.sub(45)); // возвращает 10 
console.log(calculator.divide(5)); // возвращает 2 
console.log(calculator.mult(5)); // возвращает 10 
console.log(calculator.set(100)); // устанавливает базовое значение в 100 
console.log(calculator.mult(5)); // возвращает 500