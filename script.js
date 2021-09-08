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

const plus = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => (a / b).toFixed(2);
const operate = (a, operator, b) => operator(a,b);
const storeToMemory = (operation) => {
    if (num1 != undefined && num1 != +display.textContent) { //Chaining operations
        num2 = +display.textContent;
        result = operate(num1, currentOperation, num2);
        num1 = result; // For new calc after equals pressed
        display.textContent = num1;
    }
    else if (num1 === undefined) num1 = +display.textContent; //Very first number
    currentOperation = operation;
    activeKeystrokes = [];
};

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Wiping for new number
        if (+display.textContent === num1 && activeKeystrokes.length === 0) {
            display.textContent = ""
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
    num2 = +display.textContent
    result = operate(num1, currentOperation, num2);
    display.textContent = result;
    num1 = result; // For new calc after equals pressed
    activeKeystrokes = [];

})
clearButton.addEventListener('click', () => {
    display.textContent = "";
    num1 = undefined;
    num2 = undefined;
    currentOperation = undefined;
})
