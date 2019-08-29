'user strict'

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min );
}

function getInputNumber(){
    let userNumber;
    while (true) {
        usersNumber = prompt('Введите число от 0 до 10', '');
        if(usersNumber && usersNumber <= 10 && usersNumber >= 0) break;
    }
    
    return userNumber;
}

function playGame(userNumber, randomNumber){
    let balance = 0;
    if(usersNumber == randomNumber) {
        balance += 100;
        alert('Вы выиграли! Вам начислино 100 грн!');
    } else {
        alert('Вы проиграли! Очень жаль.');
    }

    return balance;
}


function main(){
    let continueGame;
    let balance = 0;
    do {
        let randomNumber = getRandomNumber(0, 10);
        let userNumber = getInputNumber();
        alert(randomNumber);
        balance += playGame(userNumber, randomNumber);
        continueGame = confirm('Хотите продолжить?');
    } while(continueGame);

    alert('Ваш баланс: ' + balance + '! Вы можете забрать свой выиграш.');
}

main();
