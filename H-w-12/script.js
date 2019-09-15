'use strict'

function Hamburger(size,stuffing) {
    this.size = size,
    this.stuffing = stuffing,
    this.topping = []
}

//Const:
// SIZE
Hamburger.SIZE_SMALL = {
    cost: 50,
    calories: 20
};
Hamburger.SIZE_BIG = {
    cost: 100,
    calories: 40
};

// STIFFING
Hamburger.STUFFING_CHEESE = {
    cost: 10,
    calories: 20 
};
Hamburger.STUFFING_SALAD = { 
    cost: 20,
    calories: 5
};
Hamburger.STUFFING_POTATO = { 
    cost: 15,
    calories: 10
};

// ADITION
Hamburger.TOPPING_SPICE = { 
    cost: 15,
    calories: 0
};
Hamburger.TOPPING_MAYO = { 
    cost: 20,
    calories: 5
};

//Methods for Hamburger: 
function addTopping (toppingUser) {
    this.topping.push(toppingUser);
};
Hamburger.prototype.addTopping = addTopping;

function calculateCalories() {
    let calories = this.size.calories + this.stuffing.calories 
                   + this.topping.reduce((sum, elem) => sum + elem.calories, 0);
    return calories;
};
Hamburger.prototype.calculateCalories = calculateCalories;

function calculatePrice() {
    let cost = this.size.cost + this.stuffing.cost 
               + this.topping.reduce((sum, elem) => sum + elem.cost, 0);
    return cost;
};
Hamburger.prototype.calculatePrice = calculatePrice;


//Check: 

// маленький гамбургер с начинкой из сыра
const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// спросим сколько там калорий
console.log("Calories:" + hamburger.calculateCalories());
// сколько стоит
console.log("Price: " + hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// А сколько теперь стоит?
console.log("Price with spice: " + hamburger.calculatePrice());
console.log(hamburger);