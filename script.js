const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector("#clear");
const plusButton = document.querySelector("#plus");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");
const equalsButton = document.querySelector("#equals")

let num1, currentOperation, num2; 
//Define an array called activeKeystrokes.
let activeKeystrokes = [];

const plus = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => (a / b).toFixed(2);
const operate = (a, operator, b) => operator(a,b);
const storeToMemory = (operation) => {
    // Set condition to be defined and not equal to whatever is in the display
    if (num1 != undefined && num1 != +display.textContent) {
        // Store num2 from the display
        num2 = +display.textContent;
        // Call operate with num1, currentOperation, num2, store in result
        result = operate(num1, currentOperation, num2);
        // Take result of the operation and store it in num 1
        num1 = result;
        // Update display to be num1
        display.textContent = num1;
    }
    // if num 1 IS undefined store num1 from the display
    else if (num1 === undefined) {
        num1 = +display.textContent;
    }
    currentOperation = operation;
    // Wipe activeKeystrokes
    activeKeystrokes = [];
};

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // If the content of the display is the same as num1
        // Update if block so that activeKeystrokes has to be emptied
        if (+display.textContent === num1 && activeKeystrokes.length === 0) {
            display.textContent = ""
        }
        display.textContent += button.textContent;
        // Entry added to the activeKeystrokes array
        activeKeystrokes.push(button.textContent);
    })
})
plusButton.addEventListener('click', () => storeToMemory(plus))
subtractButton.addEventListener('click', () => storeToMemory(subtract))
multiplyButton.addEventListener('click', () => storeToMemory(multiply))
divideButton.addEventListener('click', () => storeToMemory(divide))
equalsButton.addEventListener('click', () => {
    num2 = +display.textContent
    // Store result of operation in result
    result = operate(num1, currentOperation, num2);
    // Let num1 = result
    // Let the display show the result
    display.textContent = result;
    num1 = result; // Storing if user performing new operation with result
    // Wipe activeKeystrokes
    activeKeystrokes = [];

})
clearButton.addEventListener('click', () => {
    display.textContent = "";
    num1 = undefined;
    num2 = undefined;
    currentOperation = undefined;
})
