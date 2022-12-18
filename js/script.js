let currentValue = 0;
let num = 0;
let oldNum = 0;
let operator = "";
let startFlag = true;
let equation = "";
let lastButton = "";
let operatorInEquation = false;
let displayAnswer = document.querySelector("#display-answer");
let displayEquation = document.querySelector("#display-equation");

let digits = document.querySelectorAll(".digit");
digits.forEach((button) => {
  button.addEventListener("click", () => {
    // Automatically clear values when a new expression is entered.
    if (lastButton === "equals") {
      clearHelper();
      startFlag = true;
      currentValue = 0;
    }
    if (num == 0) {
      // If the first digit is zero, do nothing.
      if (button.id !== "0") {
        num = button.id;
      } else {
        return;
      }
    } else {
      num += button.id;
    }

    if (lastButton === "digit") {
      displayEquation.textContent += `${button.id}`;
    } else {
      displayEquation.textContent += ` ${num}`;
    }
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
    // Show previously calculated value when continuing the calculation.
    if (!displayEquation.textContent && startFlag === false) {
      displayEquation.textContent = currentValue;
    }
    // Reset and save current value of num when an operator is chosen for the first
    // time.
    if (!operator) {
      oldNum = num;
      num = 0;
    }
    let operatorSymbol = button.textContent;
    if (operatorInEquation === true && lastButton !== "operator") {
      return;
    }
    if (lastButton === "digit" || lastButton === "equals") {
      displayEquation.textContent += ` ${operatorSymbol} `;
    } else if (lastButton === "operator") {
      displayEquation.textContent = displayEquation.textContent.slice(0, -2);
      displayEquation.textContent += ` ${operatorSymbol} `;
    }
    operator = button.id;
    lastButton = "operator";
    operatorInEquation = true;
  });
});

let equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
  if (!operator) {
    return;
  }
  if (operator === "divide" && num === 0) {
    currentValue = "Cannot divide by zero";
  } else if (startFlag === true) {
    currentValue = window[operator](+oldNum, +num);
  } else {
    currentValue = window[operator](+currentValue, +num);
  }
  startFlag = false;
  console.log(currentValue);
  displayAnswer.textContent = currentValue;
  lastButton = "equals";
  clearHelper();
});

let clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  clearHelper();
  startFlag = true;
  displayAnswer.textContent = "0";
  currentValue = 0;
  lastButton = "";
});

let sign = document.querySelector("#sign");
sign.addEventListener("click", () => {
  num = num * -1;
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

let del = document.querySelector("#delete");
del.addEventListener("click", () => {
  let x = displayEquation.textContent;
  if (lastButton === "digit") {
    displayEquation.textContent = displayEquation.textContent.slice(0, -1);
    num = +num.toString().slice(0, -1);
    lastButton = getLastButton();
  } else if (lastButton === "operator") {
    lastButton = "digit";
    displayEquation.textContent = displayEquation.textContent.slice(0, -4);
    operator = "";
  }
});

function getLastButton() {
  if (!displayEquation.textContent) {
    return "";
  } else if (displayEquation.textContent.slice(-1) === " ") {
    return "operator";
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

function clearHelper() {
  operator = "";
  num = 0;
  displayEquation.textContent = "";
  operatorInEquation = false;
  oldNum = 0;
}
