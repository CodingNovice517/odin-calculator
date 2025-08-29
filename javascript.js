// Global variables to store user input
let userInput = null;  // The input string to be parsed
let curResult = null;  // To store the result of the latest operation

// Variables mainly used to perform an operation
let userNum1 = null;
let userNum2 = null;
let userOperator = null;

// Basic Calculator Functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return null;
    }
}

// Event handling
function handleClick(event) {
    console.log(`You clicked ${event.target.textContent}`);
}

// Create element connections
const display = document.querySelector('.calculator-display');
const buttons = document.querySelectorAll('.calculator-btn');

// Add event listeners
buttons.forEach((button) => button.addEventListener('click', handleClick));
