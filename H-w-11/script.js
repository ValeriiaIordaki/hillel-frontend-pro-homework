'use strict'

function Student(name,marks) {
    this.name = name,
    this.marks = marks
}

Student.prototype.averageMark = function(){
    return this.marks.reduce(
    	(sum, elem) => sum + elem, 0
    ) / this.marks.length;
}

// test:
const students = [ 
    new Student('Student 1', [10, 9, 8, 0, 10]), 
    new Student('Student 12', [10, 0, 8, 0, 3, 4])
];

console.log(students);
console.log(`Student 1 average mark: ${students[0].averageMark()}`);

// additional task:
function averageMarkGroup(arr){
    return arr.reduce(
    	(sum, elem) => sum + elem.averageMark(), 0
    ) / arr.length;
}
console.log(`Average group mark: ${averageMarkGroup(students)}`); 
