let currentValue = 0;
let num = 0;
let oldNum = 0;
let operator = ""
let startFlag = true;

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

let display = document.querySelector("#display");
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
        startFlag = false;
    }
    else {
        currentValue = window[operator](currentValue, num);        
    }
    console.log(currentValue);
    display.textContent = currentValue;
    operator = ""
})

let clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    operator = "";
    currentValue = 0;
    num = 0;
    display.textContent = 0;
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