let currentValue = 0;
let num = 0;
let oldNum = 0;
let operator = ""
let startFlag = true;
let equation = ""

let digits = document.querySelectorAll(".digit");
digits.forEach(button => {
    button.addEventListener("click", () => {
        oldNum = num;
        num = +button.id;
        console.log(num);
    })
})

let operators = document.querySelectorAll(".operator");
operators.forEach(button => {
    button.addEventListener("click", () => {
        operator = button.id
    })
})

let displayAnswer = document.querySelector("#display-answer");
let displayEquation = document.querySelector("#display-equation");

let equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
    if (!operator) {
        return;
    }
    if (operator === "divide" && num === 0) {
        currentValue = "Cannot divide by zero"
    }
    else if (startFlag === true) {
        currentValue = window[operator](oldNum, num);
    }
    else {
        currentValue = window[operator](currentValue, num);        
    }
    startFlag = false;
    console.log(currentValue);
    displayAnswer.textContent = currentValue;
    operator = ""
})

let clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    operator = "";
    currentValue = 0;
    num = 0;
    displayEquation.textContent = "";
    displayAnswer.textContent = 0;
    startFlag = true;
})

let sign = document.quesrySelector("#sign");
sign.addEventListener("click", () => {
    num = num * -1;
})

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, y, operator) {
    return operator(x, y);
}