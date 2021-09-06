const numberButtons = document.querySelectorAll(".number");
const display = document.querySelector("#display");
const clearButton = document.querySelector("#clear");
let currentValue;

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
})
    
