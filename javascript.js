// Global variables to store user input
let userInput = null;  // The input string to be parsed
let curResult = null;  // To store the result of the latest operation

// Variables mainly used to perform an operation
let userNum1 = null;
let userNum1Dec = false;  // bool
let userNum1DecPlaces = null;
let userNum2 = null;
let userNum2Dec = false;  // bool
let userNum2DecPlaces = null;
let userOperator = null;

let curDisplayValue = "0";

// Create element connections
const display = document.querySelector('.calculator-display');
const buttons = document.querySelectorAll('.calculator-btn');

// Add event listeners
buttons.forEach((button) => button.addEventListener('click', handleClick));

// Button ids
const INPUT_MAP = {
    "btn-0": 0,
    "btn-1": 1,
    "btn-2": 2,
    "btn-3": 3,
    "btn-4": 4,
    "btn-5": 5,
    "btn-6": 6,
    "btn-7": 7,
    "btn-8": 8,
    "btn-9": 9,
    "btn-clear": "clear",
    "btn-back": "back",
    "btn-divide": "divide",
    "btn-multiply": "multiply",
    "btn-add": "add",
    "btn-subtract": "subtract",
    "btn-equals": "equals",
    "btn-decimal": "decimal"
}

const OPERATORS = {
    "divide": "÷",
    "multiply": "×",
    "add": "+",
    "subtract": "–"};

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
    if (num1 === null || num2 === null || operator === null) {
        return null;
    }
    switch (operator) {
        case "add":
            return add(num1, num2);
        case "subtract":
            return subtract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1, num2);
        default:
            return null;
    }
}


// Event handling
function mapUserInput(userInput) {
    return INPUT_MAP[userInput];
}

function getOperatorSymbol(operatorLabel) {
    return OPERATORS[operatorLabel];
}

function handleClick(event) {
    
    const mappedInput = mapUserInput(event.target.id);
    console.log(`You clicked ${mappedInput}`);

    if (mappedInput === "clear") {
        resetDisplay();
        curResult = null;
        userNum1 = null;
    }

    if (typeof mappedInput === "number") {
        if (userNum1 === null) {
            userNum1 = mappedInput;
        }
        else if (userNum1 && !userOperator) {
            if (userNum1Dec) {
                if (userNum1DecPlaces) {
                    userNum1DecPlaces = parseFloat(String(userNum1DecPlaces) + String(mappedInput));
                }
                else {
                    userNum1DecPlaces = mappedInput;
                }
            }
            else {
                userNum1 = parseFloat(String(userNum1) + String(mappedInput));
            }

        }
        else if (userNum1 && !userNum2) {
            userNum2 = mappedInput;
        }
        else if (userNum2) {
            if (userNum2Dec) {
                if (userNum2DecPlaces) {
                    userNum12DecPlaces = parseFloat(String(userNum2DecPlaces) + String(mappedInput));
                }
                else {
                    userNum2DecPlaces = mappedInput;
                }
            }
            else {
                userNum2 = parseFloat(String(userNum2) + String(mappedInput));
            }
            
        }
    }

    if (mappedInput === "decimal") {
        if (userNum2 && !userNum2Dec) {
            userNum2Dec = true;
        }
        else if (userNum1 && !userNum1Dec && !userOperator) {
            userNum1Dec = true;
        }
    }

    if (Object.keys(OPERATORS).includes(mappedInput)) {
        if ((userNum1 && !userOperator) || (!userNum2 && userOperator)) {
            userOperator = mappedInput;
        }
    }

    if (mappedInput === "equals") {
        let num1 = parseFloat(String(userNum1 ? userNum1 : "") + (userNum1Dec ? "." : "") + String(userNum1DecPlaces ? userNum1DecPlaces : ""));
        let num2 = parseFloat(String(userNum2 ? userNum2 : "") + (userNum2Dec ? "." : "") + String(userNum2DecPlaces ? userNum2DecPlaces : ""));
        curResult = operate(num1, num2, userOperator);
    }

    if (curResult) {
        let tempResult = curResult;
        updateDisplay(curResult);
        resetState();
        userNum1 = parseFloat(tempResult);
    }
    else {
        const curResult = [
            userNum1 === null ? 0 : userNum1,
            userNum1Dec && (!userOperator || userNum1DecPlaces) ? "." : "",
            userNum1DecPlaces ? userNum1DecPlaces : "",
            getOperatorSymbol(userOperator),
            userNum2,
            userNum2Dec && (!userOperator || userNum2DecPlaces)  ? "." : "",
            userNum2DecPlaces ? userNum2DecPlaces : ""
        ]
            .filter(item => item != null)
            .join(" ");
        updateDisplay(curResult);
    }
}

function updateDisplay(newValue) {
    display.textContent = newValue;
}

function resetState() {
    curResult = null;
    userInput = null;
    userNum1 = null;
    userNum1Dec = null;
    userNum1DecPlaces = null;
    userNum2 = null;
    userNum2Dec = null;
    userNum2DecPlaces = null;
    userOperator = null;
}

function resetDisplay() {
    resetState();
    curDisplayValue = "0";
    updateDisplay(curDisplayValue);
}


