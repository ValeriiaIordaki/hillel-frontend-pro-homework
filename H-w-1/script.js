"user strict"

const Student1 = {
  studentName: 'Alex',
  height: 184
};
const Student2 = {
  studentName: 'Ann',
  height: 172
};
const Student3 = {
  studentName: 'Bob',
  height: 197
};

const averageHeight = (Student1.height + Student2.height + Student3.height) / 3;

console.log(Student1.studentName, Student1.height);
console.log(Student2.studentName, Student2.height);
console.log(Student3.studentName, Student3.height);
console.log('Average Height', averageHeight);
console.log('Average Height', Math.round(averageHeight));