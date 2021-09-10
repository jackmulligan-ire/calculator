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
let equalsFrozen = false;
let decimalFrozen = false;

const plus = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b ;

const calculate = (a, operator, b) => {
    let operationResult = operator(a,b);
    if (operationResult > 99999999999998) operationResult = 99999999999998;
    if (operationResult % 1 != 0) operationResult = operationResult.toFixed(2);
    display.textContent = operationResult;
    equalsFrozen = true;
    return operationResult;
};

const updateMemory = (operation) => {
    if (num1 != undefined && num1 != +display.textContent) { // Chaining operations
        num2 = +display.textContent;
        operationResult = calculate(num1, currentOperation, num2);
        num1 = operationResult; // For next calc, if continuing to chain
    } 
    else if (num1 === undefined) num1 = +display.textContent; // Very first number
    currentOperation = operation;
    activeKeystrokes = [];
    decimalFrozen = false;
};

const addKeystroke = (button) => {
    if (button.getAttribute('id') != "decimal" && display.textContent.length < 14) {
        display.textContent += button.textContent;
        activeKeystrokes.push(button.textContent);
    }
    else if (button.getAttribute('id') === "decimal" && decimalFrozen === false) {
        display.textContent += button.textContent;
        activeKeystrokes.push(button.textContent);
        decimalFrozen = true;
    }
};

plusButton.addEventListener('click', () => updateMemory(plus))
subtractButton.addEventListener('click', () => updateMemory(subtract))
multiplyButton.addEventListener('click', () => updateMemory(multiply))
divideButton.addEventListener('click', () => updateMemory(divide))

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (equalsFrozen) {
            display.textContent = ""
            equalsFrozen = false;
        } 
        else if (+display.textContent === num1 && activeKeystrokes.length === 0) {
            display.textContent = ""
        } 
        else if (display.textContent === "Error") {
            display.textContent = ""
            num1 = undefined;
        }
        addKeystroke(button)
    })
})

equalsButton.addEventListener('click', () => {
    if (num1 === undefined) {
        num1 = "Error";
        display.textContent = num1;
    } 
    else if (equalsFrozen === false) {
        num2 = +display.textContent;
        operationResult = calculate(num1, currentOperation, num2);
        num1 = operationResult; // For next operation after equals pressed
    }
    activeKeystrokes = [];
    decimalFrozen = false;
})

clearButton.addEventListener('click', () => {
    display.textContent = "";
    num1 = undefined;
    num2 = undefined;
    currentOperation = undefined;
    activeKeystrokes = [];
    equalsFrozen = false;
    decimalFrozen = false;
})
