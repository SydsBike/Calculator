const allClearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const equalsBtn = document.getElementById("equals");
const numberBtns = document.getElementsByClassName("number");
const operatorBtns = document.getElementsByClassName("operator");
const displayOut = document.getElementById("output");
const displayIn = document.getElementById("input");

class Calculator {
  constructor(input, output) {
    this.inputTextDisplay = input;
    this.outputTextDisplay = output;
    this.allClear();
  }
  allClear() {
    this.in = "";
    this.out = "";
    this.operand = "";
    this.updateDisplay();
  }
  delete() {
    this.in = this.in.slice(0, -1);
    this.updateDisplay();
  }
  appendNumber(number) {
    if (number === "." && this.in.includes(".")) return;
    this.in = this.in.toString() + number.toString();
    this.updateDisplay();
  }
  chooseOperation(operand) {
    if (!this.operand) {
      this.operand = operand;
      this.out = this.in ? this.in : this.out;
      this.in = "";
    } else {
      this.compute();
    }
    this.operand = operand;
  }
  compute() {
    if (!this.out || !this.in) return;
    let calculation;
    let input = parseFloat(this.in);
    let output = parseFloat(this.out);
    switch (this.operand) {
      case "÷":
        calculation = output / input;
        break;
      case "*":
        calculation = output * input;
        break;
      case "+":
        calculation = output + input;
        break;
      case "-":
        calculation = output - input;
        break;
    }
    this.out = calculation;
    this.operand = "";
    this.in = "";
  }

  getDisplayNumber(number) {
    let string = number.toString();
    if (string.includes(".")) {
      let integers = string.split(".")[0];
      let decimals = string.split(".")[1];
      let float = parseFloat(integers);
      if (isNaN(float)) {
        return "";
      } else {
        integers = float.toLocaleString("en");
        return `${integers}.${decimals}`;
      }
    } else {
      string = parseFloat(string);
      if (isNaN(string)) {
        return "";
      } else {
        return string.toLocaleString("en");
      }
    }
  }

  updateDisplay() {
    this.inputTextDisplay.innerText = this.getDisplayNumber(this.in);
    if (this.operand) {
      this.outputTextDisplay.innerText = `${this.getDisplayNumber(this.out)} ${
        this.operand
      }`;
    } else {
      this.outputTextDisplay.innerText = this.getDisplayNumber(this.out);
    }
  }
}

const calculator = new Calculator(displayIn, displayOut);

allClearBtn.addEventListener("click", () => {
  calculator.allClear();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
});

for (btn of numberBtns) {
  btn.addEventListener("click", (e) =>
    calculator.appendNumber(e.target.innerText)
  );
}

for (btn of operatorBtns) {
  btn.addEventListener("click", (e) => {
    calculator.chooseOperation(e.target.innerText);
    calculator.updateDisplay();
  });
}

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
