let display = document.querySelector(".display");
let buttons = document.querySelectorAll("button");
let currentInput = "";
let previousInput = "";
let operator = "";
function handleInput(value) {
    if (value === "AC") {
        currentInput = "";
        previousInput = "";
        operator = "";
        display.value = "";
        return;
    }
    if (value === "C") {
        currentInput = "";
        display.value = "";
        return;
    }
    if (value === "X") {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
        return;
    }
    if (value === "+" || value === "-" || value === "*" || value === "/" || value === "%") {
        if (currentInput === "") return;
        previousInput = currentInput;
        operator = value;
        currentInput = "";
        return;
    }
    if (value === "=") {
        if (previousInput === "" || currentInput === "" || operator === "") {
            return;
        }
        let result;
        if (operator === "+") {
            result = Number(previousInput) + Number(currentInput);
        }
        if (operator === "-") {
            result = Number(previousInput) - Number(currentInput);
        }
        if (operator === "*") {
            result = Number(previousInput) * Number(currentInput);
        }
        if (operator === "/") {
            result = Number(previousInput) / Number(currentInput);
        }
        if (operator === "%") {
            result = Number(previousInput) % Number(currentInput);
        }
        display.value = result;
        currentInput = result.toString();
        previousInput = "";
        operator = "";
        return;
    }
    if (value === "." && currentInput.includes(".")) {
        return;
    }
    currentInput += value;
    display.value = currentInput;
}
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let value = btn.textContent.trim();
        handleInput(value);
    });
});

document.addEventListener("keydown", (e) => {
    let key = e.key;
    if (!isNaN(key) || key === "." || key === "+" || key === "-" || key === "*" || key === "%" || key === "/") {
        handleInput(key);
    }
    if (key === "Enter") {
        handleInput("=");
    }
    if (key === "Backspace") {
        handleInput("C");
    }
    if (key === "Escape") {
        handleInput("AC");
    }
});