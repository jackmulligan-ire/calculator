const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector("#clear");
const plusButton = document.querySelector("#plus");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");
const equalsButton = document.querySelector("#equals")

let num1, currentOperation, num2;

const plus = (a,b) => (a + b).toString();
const subtract = (a,b) => a - b.toString();
const multiply = (a,b) => a * b.toString();
const divide = (a,b) => (a / b).toFixed(2);
const operate = (a, operator, b) => operator(a,b);
const storeToMemory = (operation) => {
    num1 = +display.textContent;
    display.textContent = "";
    currentOperation = operation;
};

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.textContent += button.textContent;
    })
})
plusButton.addEventListener('click', () => storeToMemory(plus))
subtractButton.addEventListener('click', () => storeToMemory(subtract))
multiplyButton.addEventListener('click', () => storeToMemory(multiply))
divideButton.addEventListener('click', () => storeToMemory(divide))
equalsButton.addEventListener('click', () => {
    num2 = +display.textContent
    display.textContent = operate(num1, currentOperation, num2);
})
clearButton.addEventListener('click', () => {
    display.textContent = "";
    num1 = undefined;
    num2 = undefined;
    currentOperation = undefined;
})
