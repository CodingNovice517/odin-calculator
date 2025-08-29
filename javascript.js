// Global variables to store user input
let userInput = null;  // The input string to be parsed
let curResult = null;  // To store the result of the latest operation

// Variables mainly used to perform an operation
let userNum1 = null;
let userNum2 = null;
let userOperator = null;

let curDisplayValue = "0";

// Button ids
const BUTTON_OBJ = {
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
    "btn-decimal": "."
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

// Create element connections
const display = document.querySelector('.calculator-display');
const buttons = document.querySelectorAll('.calculator-btn');

// Add event listeners
buttons.forEach((button) => button.addEventListener('click', handleClick));


// Event handling
function mapUserInput(userInput) {
    return BUTTON_OBJ[userInput];
}

function getOperatorSymbol(operatorLabel) {
    return OPERATORS[operatorLabel];
}

function handleClick(event) {
    const mappedInput = mapUserInput(event.target.id);
    console.log(`You clicked ${mappedInput}`);

    if (mappedInput === "clear") {
        resetDisplay();
    }

    if (typeof mappedInput === "number") {
        if (userNum1 === null) {
            userNum1 = mappedInput;
        }
        else if (userNum1 && !userOperator) {
            userNum1 = parseInt(String(userNum1) + String(mappedInput));
        }
        else if (userNum1 && !userNum2) {
            userNum2 = mappedInput;
        }
        else if (userNum2) {
            userNum2 = parseInt(String(userNum2) + String(mappedInput));
        }
    }

    if (Object.keys(OPERATORS).includes(mappedInput)) {
        if ((userNum1 && !userOperator) || (!userNum2 && userOperator)) {
            userOperator = mappedInput;
        }
    }

    if (mappedInput === "equals") {
        console.log(`num 1 ${userNum1}; type: ${typeof userNum1}`);
        console.log(`num 2 ${userNum2}; type: ${typeof userNum2}`);
        curResult = operate(userNum1, userNum2, userOperator);
    }

    if (curResult) {
        let tempResult = curResult;
        updateDisplay(curResult);
        resetState();
        userNum1 = parseInt(tempResult);
    }
    else {
        const curResult = [userNum1, getOperatorSymbol(userOperator), userNum2]
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
    userNum2 = null;
    userOperator = null;
}

function resetDisplay() {
    resetState();
    curDisplayValue = "0";
    updateDisplay(curDisplayValue);
    console.log(`Cur display value: ${curDisplayValue}`);
}


