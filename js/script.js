// Answer that gets displayed
let currentValue = 0;
// The latest number entered.
let num = "";
// The previous number entered.
let oldNum = "";
let operator = "";
let startFlag = true;
let equation = "";
let lastButton = "";
let operatorInEquation = false;
let decimalFlag = false;

let displayAnswer = document.querySelector("#display-answer");
let displayEquation = document.querySelector("#display-equation");

let digits = document.querySelectorAll(".digit");
digits.forEach((button) => {
  button.addEventListener("click", () => {
    // Automatically clear values when a new expression is started.
    if (lastButton === "equals") {
      fullClear();
    }
    // If the first digit is zero, do nothing.
    if (button.id === "0" && num === "") {
      return;
    }
    num += button.id;
    displayEquation.textContent += button.id;
    lastButton = "digit";
  });
});

let operators = document.querySelectorAll(".operator");
operators.forEach((button) => {
  button.addEventListener("click", () => {
    // Do nothing if no values have been entered.
    if (!displayEquation.textContent && startFlag === true) {
      return;
    }
    // Prevent adding a second operator.
    if (operatorInEquation === true && lastButton !== "operator") {
      return;
    }
    // Show previously calculated value when continuing the calculation.
    if (!displayEquation.textContent && startFlag === false) {
      displayEquation.textContent = currentValue;
    }
    // Reset and save current value of num when an operator is chosen for the first time.
    if (!operatorInEquation) {
      oldNum = num;
      num = "";
    }

    let operatorSymbol = button.textContent;
    // Add trailing zero to decimal.
    if (lastButton === "decimal") {
      displayEquation.textContent += `0 ${operatorSymbol} `;
    } else if (lastButton === "digit" || lastButton === "equals") {
      displayEquation.textContent += ` ${operatorSymbol} `;
    }
    // Replace last entered operator.
    else if (lastButton === "operator") {
      displayEquation.textContent = displayEquation.textContent.slice(0, -2);
      displayEquation.textContent += ` ${operatorSymbol} `;
    }
    operator = button.id;
    operatorInEquation = true;
    lastButton = "operator";
    decimalFlag = false;
  });
});

let equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
  if (!operatorInEquation) {
    return;
  }
  if (operator === "divide" && num === "0") {
    currentValue = "Cannot divide by zero";
  }
  // Check if equation is a continuation of a previously calculated value.
  // Calculate value to display.
  else if (startFlag === true) {
    currentValue = window[operator](+oldNum, +num);
  } else {
    currentValue = window[operator](+currentValue, +num);
  }
  startFlag = false;
  displayAnswer.textContent = currentValue;
  lastButton = "equals";
  partialClear();
});

let clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  fullClear();
  displayAnswer.textContent = "0";
  lastButton = "";
});

let sign = document.querySelector("#sign");
sign.addEventListener("click", () => {
  num = (+num * -1).toString();

  let splitEquation = displayEquation.textContent.split(" ");
  let lastValue = +splitEquation.pop();
  if (lastValue == 0) {
    if (currentValue == 0) {
      return;
    } else {
      currentValue *= -1;
      displayAnswer.textContent = currentValue;
      return;
    }
  }
  lastValue = lastValue * -1;
  splitEquation.push(lastValue);
  displayEquation.textContent = splitEquation.join(" ");
});

let decimal = document.querySelector("#decimal");
decimal.addEventListener("click", () => {
  if (lastButton === "equals") {
    fullClear();
  }
  // Do not allow multiple decimals.
  else if (decimalFlag === true) {
    return;
  }
  displayEquation.textContent += ".";
  num += ".";
  decimalFlag = true;
  lastButton = "decimal";
});

let del = document.querySelector("#delete");
del.addEventListener("click", () => {
  if (lastButton === "digit") {
    displayEquation.textContent = displayEquation.textContent.slice(0, -1);
    num = num.slice(0, -1);
    lastButton = getLastButton();
  } else if (lastButton === "operator") {
    displayEquation.textContent = displayEquation.textContent.slice(0, -4);
    operator = "";
    lastButton = getLastButton();    
  } else if (lastButton === "decimal") {
    displayEquation.textContent = displayEquation.textContent.slice(0, -1);
    num = num.slice(0, -1);
    decimalFlag = false;
    lastButton = getLastButton();
  }
});

function getLastButton() {
  if (!displayEquation.textContent) {
    return "";
  } else if (displayEquation.textContent.slice(-1) === " ") {
    return "operator";
  } else if (displayEquation.textContent.slice(-1) === ".") {
    return "decimal";
  } else {
    return "digit";
  }
}

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

function partialClear() {
  operator = "";
  num = "";
  displayEquation.textContent = "";
  operatorInEquation = false;
  oldNum = "";
  decimalFlag = false;
}

function fullClear() {
  operator = "";
  num = "";
  displayEquation.textContent = "";
  operatorInEquation = false;
  oldNum = "";
  decimalFlag = false;
  startFlag = true;
  currentValue = 0;
}
