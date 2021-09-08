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
const calculate = (a, operator, b) => {
    let operationResult = operator(a,b);
    display.textContent = operationResult;
    operationFrozen = true;
    return operationResult;
}
const updateMemory = (operation) => {
    if (num1 != undefined && num1 != +display.textContent) { //Chaining operations
        num2 = +display.textContent;
        operationResult = calculate(num1, currentOperation, num2);
        num1 = operationResult; // For next calc if continuing to chain
    } else if (num1 === undefined) num1 = +display.textContent; //Very first number
    currentOperation = operation;
    activeKeystrokes = [];
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
plusButton.addEventListener('click', () => updateMemory(plus))
subtractButton.addEventListener('click', () => updateMemory(subtract))
multiplyButton.addEventListener('click', () => updateMemory(multiply))
divideButton.addEventListener('click', () => updateMemory(divide))
equalsButton.addEventListener('click', () => {
    if (num1 === undefined) {
        num1 = "Error";
        display.textContent = num1;
    } else if (operationFrozen === false) {
        num2 = +display.textContent;
        operationResult = calculate(num1, currentOperation, num2);
        num1 = operationResult; // For next operation after equals pressed
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
