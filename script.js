const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector("#clear");
const plusButton = document.querySelector("#plus");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");
const equalsButton = document.querySelector("#equals")

let num1, currentOperation, num2; 
let activeKeystrokes = [];
let operationFrozen = false;

const plus = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => {
    if (a % b === 0) return a / b
    else return (a / b).toFixed(2)   
};
const operate = (a, operator, b) => operator(a,b);
const storeToMemory = (operation) => {
    if (num1 != undefined && num1 != +display.textContent) { //Chaining operations
        result = performCalculation(num1);
        num1 = result; // For new calc after equals pressed
    } else if (num1 === undefined) num1 = +display.textContent; //Very first number
    currentOperation = operation;
    activeKeystrokes = [];
};
const performCalculation = (num1) => {
    num2 = +display.textContent;
    result = operate(num1, currentOperation, num2);
    display.textContent = result;
    operationFrozen = true;
    return result;
};

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (operationFrozen) {
            display.textContent = ""
            operationFrozen = false;
        } else if (+display.textContent === num1 && activeKeystrokes.length === 0) {
            display.textContent = ""
        } else if (display.textContent === "Error") {
            display.textContent = ""
            num1 = undefined;
        }
        display.textContent += button.textContent;
        activeKeystrokes.push(button.textContent);
    })
})
plusButton.addEventListener('click', () => storeToMemory(plus))
subtractButton.addEventListener('click', () => storeToMemory(subtract))
multiplyButton.addEventListener('click', () => storeToMemory(multiply))
divideButton.addEventListener('click', () => storeToMemory(divide))
equalsButton.addEventListener('click', () => {
    if (num1 === undefined) {
        num1 = "Error";
        display.textContent = num1;
    } else if (operationFrozen === false) {
        result = performCalculation(num1);
        num1 = result; // If user performs new operation
    }
    activeKeystrokes = [];
})
clearButton.addEventListener('click', () => {
    display.textContent = "";
    num1 = undefined;
    num2 = undefined;
    currentOperation = undefined;
    activeKeystrokes = [];
    operationFrozen = false;
})
