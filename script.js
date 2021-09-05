// Operator functions
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;
const operate = (a, operator, b) => operator(a,b);

let test = operate(1, divide, 4)
console.log(test)
    
