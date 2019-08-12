'user strict'

function getOperation(){
    let operation;
    while(true){
        operation = prompt('Введите желаемую операцию (add, sub, mult, div)', '');
        if (operation == 'add' || operation == 'sub' || operation == 'mult' || operation == 'div') {
            return operation;
        }
    }
}

function getOperand(indexOfOperand){
    let operand;
    while(true){
        operand = prompt('Введите переменную №' + indexOfOperand, '');
        if (isNaN(operand) || operand < 0) {
            continue;
        }

        operand = Number(operand);
        if (Number.isInteger(operand)) {
            return operand;
        }
    }
}

function add(operand1, operand2){
    return operand1 + operand2;
}

function sub(operand1, operand2){
    return operand1 - operand2;
}

function mult(operand1, operand2){
    return operand1 * operand2;
}

function div(operand1, operand2){
    return operand1 / operand2;
}

function main(){
    operation = getOperation();
    operand1 = getOperand(1);
    operand2 = getOperand(2);

    let result;
    switch(operation) {
        case 'add':
            result = add(operand1, operand2);
            break;
        case 'sub':
            result = sub(operand1, operand2);
            break;
        case 'mult':
            result = mult(operand1, operand2);
            break;
        case 'div':
            result = div(operand1, operand2);
            break;
    }
    alert('Результат = ' + result);
}

main();
