let digits = document.querySelectorAll(".digit");
digits.forEach((button) => {
  button.addEventListener("click", () => {
    // Automatically clear values when a new expression is entered.
    if (lastButton === "equals") {
      clearHelper();
      startFlag = true;
      currentValue = 0;
    }
    if (button.id !== "0" && lastButton === "decimal") {
      num = num + zeroesAfterDecimal + button.id;
      zeroesAfterDecimal = ""
    } 
    else if (num == 0) {
      // If the first digit is zero, do nothing.
      if (button.id !== "0" && lastButton !== "decimal") {
        num = button.id;
      } else if (button.id === "0" && lastButton === "decimal") {
        
      }
      
      else {
        return;
      }
    } 
    else if (lastButton !== "decimal"){
      num += button.id;
    }

    if (lastButton === "digit" || lastButton === "decimal") {
      displayEquation.textContent += `${button.id}`;
    } else {
      displayEquation.textContent += ` ${num}`;
    }
    if (lastButton === "decimal" && button.id === "0") {
      zeroesAfterDecimal = zeroesAfterDecimal + "0";
      return
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
      num = "0";
    }
    let operatorSymbol = button.textContent;
    if (operatorInEquation === true && lastButton !== "operator") {
      return;
    }
    if (lastButton === "decimal") {
      displayEquation.textContent += `0 ${operatorSymbol} `;
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
    decimalFlag = false;
  });
});

del.addEventListener("click", () => {
  let x = displayEquation.textContent;
  if (lastButton === "digit") {
    displayEquation.textContent = displayEquation.textContent.slice(0, -1);
    if (zeroesAfterDecimal === "") {
      num = num.slice(0, -1);
    }
    lastButton = getLastButton();
  } else if (lastButton === "operator") {
    lastButton = "digit";
    displayEquation.textContent = displayEquation.textContent.slice(0, -4);
    operator = "";
  } else if (lastButton === "decimal") {
    if (displayEquation.textContent.slice(-1) === ".") {
      decimalFlag = false;
    }
    displayEquation.textContent = displayEquation.textContent.slice(0, -1);
    lastButton = getLastButton();
  }
  if (zeroesAfterDecimal !== "") {
    zeroesAfterDecimal = zeroesAfterDecimal.slice(0, -1);
  }
});
