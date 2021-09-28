const body = document.querySelector("body");
const display = document.querySelector("#display");
const shell = document.querySelector("#shell");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector("#clear");
const plusButton = document.querySelector("#plus");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");
const equalsButton = document.querySelector("#equals")
// Get the delete button, store in const deleteButton
const deleteButton = document.querySelector("#delete");
const starsAbove = document.querySelector("#stars-above");
const starsBelow = document.querySelector("#stars-below");
const starsLeft = document.querySelector("#stars-left");
const starsRight = document.querySelector('#stars-right');

let num1, currentOperation, num2; 
let activeKeystrokes = [];
let equalsFrozen = false;
let decimalFrozen = false;
// Define a boolean variable deleteFrozen, set initial value to false
let deleteFrozen = false;

const plus = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => {
    if (b === 0) destroySpace()
    else return a / b
};

const calculate = (a, operator, b) => {
    let operationResult = operator(a,b);
    if (operationResult > 99999999999998) operationResult = 99999999999998;
    if (operationResult % 1 != 0) operationResult = operationResult.toFixed(2);
    display.textContent = operationResult;
    equalsFrozen = true;
    // Set the deleteFrozen variable to be true
    deleteFrozen = true;
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

const destroySpace = () => {
    body.style.backgroundColor = "white"
    display.textContent = "DESTROYED"
}

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
        else if (display.textContent === "DESTROYED") {
            display.textContent = ""
            num1 = undefined;
        }
        button.classList.add("pressed");
        addKeystroke(button)
    })
    button.addEventListener('transitionend', (e) => {
        if (e.propertyName != "box-shadow") return
        e.target.classList.remove("pressed");
    });
})

equalsButton.addEventListener('click', () => {
    if (num1 === undefined) {
        num1 = "ERROR";
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
    // Adding deleteFrozen to things that get deleted
    deleteFrozen = false;
})

// Event listener for delete button
// Click event is registered on the DEL button 
deleteButton.addEventListener('click', () => {
    // NEW: If statement that tests whether deleteFrozen is deactivated
    if (deleteFrozen === false) {
        // Call slice on the text content of the display
        // from index 0 to the length of the string – 1, store in a variable editedNumber
        let editedNumber = display.textContent.slice(0, display.textContent.length - 1);
        // Put this editedNumber into the textContent of the display.
        display.textContent = editedNumber;
    }
})

const fillStars = (numOfStars, starsDiv) => {
    let star, ranValue;
    for (i=0; i < numOfStars; i++) {
        star = document.createElement('div')
        star.classList.add('stars')
        ranValue = Math.floor(Math.random()*100)
        star.style.marginLeft = `${ranValue}%`
        if (i % 7 === 0) star.classList.add('pulse') 
        if (i % 10 === 0) star.classList.add('twinkle')
        starsDiv.appendChild(star)
    }
}

fillStars(50, starsAbove)
fillStars(100, starsBelow)
fillStars(250, starsLeft)
fillStars(250, starsRight)