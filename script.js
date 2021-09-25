// Get body and store in variable body
const body = document.querySelector("body");
const display = document.querySelector("#display");
// Get shell and store in variable shell
const shell = document.querySelector("#shell");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector("#clear");
const plusButton = document.querySelector("#plus");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");
const equalsButton = document.querySelector("#equals")
// Getting starsBelow as a div
const starsAbove = document.querySelector("#stars-above");
const starsBelow = document.querySelector("#stars-below");
const starsLeft = document.querySelector("#stars-left");
const starsRight = document.querySelector('#stars-right');

let num1, currentOperation, num2; 
let activeKeystrokes = [];
let equalsFrozen = false;
let decimalFrozen = false;

const plus = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => {
    // If user dividing by 0, destroy space
    if (b === 0) destroySpace()
    else return a / b
};

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

// Destroy space fn
const destroySpace = () => {
    // Change color of shell to be red
    // shell.style.backgroundColor = "#660000"
    // Set bg-color of body to white
    body.style.backgroundColor = "white"
    // Set text content of the display to "DESTORY!"
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
        // Adding in case of evil mode
        else if (display.textContent === "DESTROYED" || display.textContent === "EVIL MODE") {
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
})

// Write a fn fillBottom w/ param numOfStars, starsDiv
const fillStars = (numOfStars, starsDiv) => {
    // Declare var star, ranValue
    let star, ranValue;
    // Loop, with initial = 0, loops as long as i < numOfStars, i++
    for (i=0; i < numOfStars; i++) {
        // Assign star the creation of a div
        star = document.createElement('div')
        // Add the class stars to star
        star.classList.add('stars')
        // Generate a ranValue, round this to nearest whole number.
        ranValue = Math.floor(Math.random()*100)
        // Set declaration for margin-left of star to be ranValue
        star.style.marginLeft = `${ranValue}%`
        // If i is divisible 7, also add class pulse
        if (i % 7 === 0) star.classList.add('pulse') 
        // If I is divisible by 10, also add twinkle
        if (i % 10 === 0) star.classList.add('twinkle')
        // Append star to the container
        starsDiv.appendChild(star)
    }
}

// Call fillBottom w 10 as arg
fillStars(50, starsAbove)
fillStars(100, starsBelow)
fillStars(250, starsLeft)
fillStars(250, starsRight)