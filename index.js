// Style toggle
const style1 = document.getElementById("checkbox1");
const style2 = document.getElementById("checkbox2");
const style3 = document.getElementById("checkbox3");
const calcWrapper = document.getElementById("calculator-wrapper");

style1.addEventListener("click", () => {
    if(style1.checked = true) {
        calcWrapper.classList.remove("style2", "style3");
        document.body.style.backgroundColor = "hsl(222, 26%, 31%)";
        calcWrapper.classList.add("style1");
    } else {
        calcWrapper.classList.remove("style1");
    }
});


style2.addEventListener("click", () => {
    if(style2.checked = true) {
        calcWrapper.classList.remove("style1", "style3");
        document.body.style.backgroundColor = "hsl(0, 0%, 90%)";
        calcWrapper.classList.add("style2");
    } else {
        calcWrapper.classList.remove("style2");
    }
});

style3.addEventListener("click", () => {
    if(style3.checked = true) {
        calcWrapper.classList.remove("style1", "style2");
    
        document.body.style.backgroundColor = "hsl(268, 75%, 9%)";
        calcWrapper.classList.add("style3");
    } else {
        calcWrapper.classList.remove("style3");
    }
});











//Calculator
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
      this.currentOperand = "";
      this.previousOperand = "";
      this.operation = "undefined";
    }

    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
      if(number === "." && this.currentOperand.includes(".")) return
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === "") return
        if(this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = " ";
    }

    compute() {
      let computation 
      const prev = Number(this.previousOperand)
      const current = Number(this.currentOperand)
      if(isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case "+": 
          computation = prev + current
          break
        case "-": 
          computation = prev - current
          break
        case "x": 
          computation = prev * current
          break
        case "/": 
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ""
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandTextElement.innerText = ''
        }
      }
}

const number = document.querySelectorAll("[data-number]");
const operantionButton = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const resetButton = document.querySelector("[data-allClear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector("[data-previousOperand]");
const currentOperandTextElement = document.querySelector("[data-currentOperand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

number.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operantionButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

equalButton.addEventListener("click", button  => {
    calculator.compute();
    calculator.updateDisplay();
})

resetButton.addEventListener("click", button  => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", button  => {
    calculator.delete();
    calculator.updateDisplay();
})