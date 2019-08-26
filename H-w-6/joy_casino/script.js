'user strict'

function randomNum(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min );
}

let balance = 0;
let continueGame;

do {
    let userNumber, result;
    while (true) {
        usersNumber = prompt('Введите число от 0 до 10', '');
        if (usersNumber && usersNumber <= 10 && usersNumber >= 0) break;
    }

    let randomNumber = randomNum(0, 10);
    alert(randomNumber);

    if (usersNumber == randomNumber) {
        balance += 100;
        alert('Вы выиграли! Вам начислино 100 грн! Текущий баланс: ' + balance + ' грн');
    } else {
        alert('Вы проиграли! Очень жаль. Текущий баланс: ' + balance + ' грн')
    }
    continueGame = confirm('Хотите продолжить?');
} while (continueGame)

alert('Ваш баланс: ' + balance + '! Вы можете забрать свой выиграш.');
