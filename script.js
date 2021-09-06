const numberButtons = document.querySelectorAll(".number");
const display = document.querySelector("#display");
const clearButton = document.querySelector("#clear");
// Get the plus button and store it in a const, plusButton
const plusButton = document.querySelector("#plus");
// Store the equals sign in a const, equalsButton
const equalsButton = document.querySelector("#equals");
// Define a var called num1, currentOperation, num2
let currentValue, num1, currentOperation, num2;

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;
const operate = (a, operator, b) => operator(a,b);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.textContent += button.textContent;
        currentValue = display.textContent;
    })
})

clearButton.addEventListener('click', () => {
    display.textContent = "";
    currentValue = display.textContent;
    num1 = undefined;
    num2 = undefined;
    currentOperation = undefined;
})

// Add an event listener to plusButton. When clicked:
plusButton.addEventListener('click', () => {
    // Num1 will be equal to the text of the display, converted to a number via +:
    num1 = +display.textContent;
    // The display gets cleared
    display.textContent = "";
    // (The fn plus is somehow stored)
    currentOperation = add;
})

// Add an event listener to equalsButton. When the user clicks
equalsButton.addEventListener('click', () => {
    // Whatever is in the display is stored as num2
    num2 = +display.textContent
    // The operate fn is called, with num1, currentOperation and num2
    // this is stored in result
    let result = operate(num1, currentOperation, num2);
    // The text content of the display is updated to be result  
    display.textContent = result.toString();
})
