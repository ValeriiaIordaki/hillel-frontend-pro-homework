'user strict'

function copy(obj){
    const clonedObj = {};

    for (let key in obj){
        if(typeof obj[key] === 'object'){
            clonedObj[key] = copy(obj[key]);
        }
        else {
            clonedObj[key] = obj[key]
        }
    }
    return clonedObj;
}

//Проверка:
const checkObj = {
    name: 'Alex', 
    age: 33,
    address: { 
        country: 'UA', 
        city: 'Dnipro',
        zipCode: {'code': 49000}
    }
};

const objCopy = copy(checkObj);

checkObj.address.zipCode.code = 10001;
checkObj.address.country = 'USA';
checkObj.address.city = 'New York';

console.log(objCopy);
console.log(checkObj);
