//store variables for all HTML elements
let numbers = document.getElementsByClassName("number");
let clear = document.querySelector(".clear");
let equal = document.querySelector(".equal");
let decimal = document.querySelector(".decimal");
let operators = document.querySelectorAll(".operator");
let zero = document.getElementById("zero")

/* let previousScreen = document.querySelector(".previous"); */
let currentScreen = document.querySelector(".current");

//empty object where the operands, operator and product will be stored
let object = {};

//adding event listenre to number buttons to execute addNumber() function
for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', (e) => {
                addNumber(e.target.textContent);
        })
}

//Same for all operators
for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', (e) => {
                addOperator(e.target.textContent);
        })
}

//zero is a bit different as it does not allow repetition by itself, unless it's behind a decimal.
zero.addEventListener('click', addZero);

//if there is 0 don't add 0 / if there is another number add 0
function addZero() {
        if(('product' in object) && !('operator' in object)) {
                return false
        } else if (!('operator' in object) && !('numOne' in object)) {
                object["numOne"] = [0];
                currentScreen.textContent = object.numOne;
        } else if (!('operator' in object)) {
                if (!(object.numOne[0] == 0) && (object.numOne.length < 10)) {
                        object["numOne"] += [0];
                        currentScreen.textContent = object.numOne;
                } else if ((object.numOne[0] == 0) && object.numOne.includes(".")) {
                        object["numOne"] += [0];
                        currentScreen.textContent = object.numOne;
                }
        }
        if (('operator' in object) && !('numTwo' in object)) {
                object["numTwo"] = [0];
                currentScreen.textContent = object.numTwo;
        } else if (('operator' in object)) {
                if (!(object.numTwo[0] == 0) && (object.numTwo.length < 10)) {
                        object["numTwo"] += [0];
                        currentScreen.textContent = object.numTwo;
                } else if ((object.numTwo[0] == 0) && object.numTwo.includes(".")) {
                        object["numTwo"] += [0];
                        currentScreen.textContent = object.numTwo;
                }
        }
}

//add number as long as length is less than 10
function addNumber(e) {
        if(('product' in object) && !('operator' in object)) {
                delete object.product;
                object["numOne"] = [e];
                currentScreen.textContent = object.numOne;
        } else if (!('operator' in object) && !('numOne' in object)) {
                object["numOne"] = [e];
                currentScreen.textContent = object.numOne;
        } else if (!('operator' in object) && (object.numOne.length < 10)) {
                object["numOne"] += [e];
                currentScreen.textContent = object.numOne;
        } 
        if (('operator' in object) && !('numTwo' in object)) {
                object["numTwo"] = [e];
                currentScreen.textContent = object.numTwo;
        } else if (('numTwo' in object) && (object.numTwo.length < 10)) {
                object["numTwo"] += [e];
                currentScreen.textContent = object.numTwo;
        }

}

function addOperator(e) {
        if(('product' in object) && ('operator' in object) && ('numTwo' in object)) {
                operate(object.product, object.operator, object.numTwo);
                currentScreen.textContent = object.product + e;
                object["operator"] = e;
        } else if (('numOne' in object) && ('operator' in object) && ('numTwo' in object)) {
                operate(object.numOne, object.operator, object.numTwo);
                currentScreen.textContent = object.product + e;
                object["operator"] = e;
        }
        if (!('product' in object) && !('numOne' in object)) {
                return false
        } else {
                if('numOne' in object) {
                        object["operator"] = e;
                        currentScreen.textContent = object.numOne + e;
                } else if ('product' in object) {
                        object["operator"] = e;
                        currentScreen.textContent = object.product + e;
                }
        }
}

decimal.addEventListener("click", addDecimal)

function addDecimal() {
        if (!('numOne' in object) && !('product' in object)) {
                object["numOne"] = "0.";
                currentScreen.textContent = object.numOne;
        } else if (('numOne' in object) && (!('operator' in object))) {
                if (!(object.numOne.includes('.'))) {
                        object["numOne"] += ["."];
                        currentScreen.textContent = object.numOne;
                }
        } else if (('numOne' in object) && ('operator' in object) && !('numTwo' in object)) {
                object["numTwo"] = "0.";
                currentScreen.textContent = object.numTwo;
        } else if (('numTwo' in object)) {
                if (!(object.numTwo.includes('.'))) {
                        object["numTwo"] += ["."];
                        currentScreen.textContent = object.numTwo;
                }
        } else if (('product' in object) && ('operator' in object) && !('numTwo' in object)) {
                object["numTwo"] = "0.";
                currentScreen.textContent = object.numTwo;
        }
}

clear.addEventListener("click", clearAll);

function clearAll() {
        delete object.numOne;
        delete object.operator;
        delete object.numTwo;
        delete object.product;
        currentScreen.textContent = "";
}

equal.addEventListener("click", equals);

function equals() {
        if (!('numTwo' in object)) {
                return false
        } else if (!('product' in object)) {
                operate(object.numOne, object.operator, object.numTwo)
        } else {
                operate(object.product, object.operator, object.numTwo)
        }
}

function operate(a, operator, b) {
        if (operator == "+") {
                addition(a, b);
            } else if (operator == "-") {
                subtraction(a, b);
            } else if (operator == "*") {
                multiplication(a, b);
            } else if (operator == "/") {
                if (a == 0 || b == 0) {
                        currentScreen.textContent = "No thanks";
                        delete object.numOne;
                        delete object.numTwo;
                        delete object.operator;
                } else {
                        division(a, b);
                }
            }
}

function addition(a, b){
        let result = Number(a) + Number(b);
        currentScreen.textContent = result.toFixed(2).replace(/\.?0+$/, "");
        object['product'] = result.toFixed(2).replace(/\.?0+$/, "");
        delete object.numOne;
        delete object.numTwo;
        delete object.operator;
}

function subtraction(a, b){
        let result = Number(a) - Number(b);
        currentScreen.textContent = result.toFixed(2).replace(/\.?0+$/, "");
        object['product'] = result.toFixed(2).replace(/\.?0+$/, "");
        delete object.numOne;
        delete object.numTwo;
        delete object.operator;
}

function multiplication(a, b){
        let result = Number(a) * Number(b);
        currentScreen.textContent = result.toFixed(2).replace(/\.?0+$/, "");
        object['product'] = result.toFixed(2).replace(/\.?0+$/, "");
        delete object.numOne;
        delete object.numTwo;
        delete object.operator;
}

function division(a, b){
        let result = Number(a) / Number(b);
        currentScreen.textContent = result.toFixed(2).replace(/\.?0+$/, "");
        object['product'] = result.toFixed(2).replace(/\.?0+$/, "");
        delete object.numOne;
        delete object.numTwo;
        delete object.operator;
}
