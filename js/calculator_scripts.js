
function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x / y;
}

function processNumber(numId){
    if (parseInt(displayNum) === 0){
        displayNum = '';
    }
    if (operatorPressed){
        displayNum = '';
        operatorPressed = false;
        clearDisplay();
    }
    if (numId === 'zero-btn'){
        displayNum += 0;
    }
    else if (numId === 'one-btn'){
        displayNum += 1;
    }
    else if (numId === 'two-btn'){
        displayNum += 2;
    }
    else if (numId === 'three-btn'){
        displayNum += 3;
    }
    else if (numId === 'four-btn'){
        displayNum += 4;
    }
    else if (numId === 'five-btn'){
        displayNum += 5;
    }
    else if (numId === 'six-btn'){
        displayNum += 6;
    }
    else if (numId === 'seven-btn'){
        displayNum += 7;
    }
    else if (numId === 'eight-btn'){
        displayNum += 8;
    }
    else if (numId === 'nine-btn'){
        displayNum += 9;
    }
    else if (numId === 'period-btn'){
        if (!displayNum.includes('.')){
            displayNum += '.';
        }
    }
    updateDisplay();
}

function processOperator(operatorId){
    // console.log(firstNum, secondNum, chosenOperator);
    if (firstNum || firstNum === 0){

        const secondNum = parseFloat(displayNum);

        if (chosenOperator === 'divide-btn'){
            displayNum = divide(firstNum, secondNum).toString();
        }
        else if (chosenOperator === 'multiply-btn'){
            displayNum = multiply(firstNum, secondNum).toString();
        }
        else if (chosenOperator === 'subtract-btn'){
            displayNum = subtract(firstNum, secondNum).toString();
        }
        else if (chosenOperator === 'add-btn'){
            displayNum = add(firstNum, secondNum).toString();
        }
        chosenOperator = operatorId;
        firstNum = parseFloat(displayNum);
        updateDisplay();
    

    } else{
        firstNum = parseFloat(displayNum);
        chosenOperator = operatorId;
    }
    operatorPressed = true;

}

function processSpecial(specialId){
    if (specialId === 'clear-btn'){
        displayNum = '0';
        firstNum = null;
        chosenOperator = null;
        operatorPressed = false;
        updateDisplay();
    } else if (specialId === 'plus-minus-btn'){
        displayNum = (-parseFloat(displayNum)).toString();
        updateDisplay();
    } else if (specialId === 'percent-btn'){
        displayNum = (parseFloat(displayNum)/10).toString();
        updateDisplay();
    }
}


function clearDisplay(){
    displayNum = '';
    updateDisplay();
}


function updateDisplay(){
    displayNum = displayNum.substring(0,14);
    display.textContent = displayNum;
}

function processClick(e) {

    if (this.classList.contains('number')){
        processNumber(this.id);
    }
    if (this.classList.contains('special')){
        processSpecial(this.id);
    }
    else if (this.classList.contains('operator')){
        processOperator(this.id);
    }
    this.classList.add('pressed');
}

function processKeydowns(e) {
    keyArray = [
        {
            code: 0,
            id: 'zero-btn'
        },
        {
            code: 1,
            id: 'one-btn'
        },
        {
            code: 2,
            id: 'two-btn'
        },
        {
            code: 3,
            id: 'three-btn'
        },
        {
            code: 4,
            id: 'four-btn'
        },
        {
            code: 5,
            id: 'five-btn'
        },
        {
            code: 6,
            id: 'six-btn'
        },
        {
            code: 7,
            id: 'seven-btn'
        },
        {
            code: 8,
            id: 'eight-btn'
        },
        {
            code: 9,
            id: 'nine-btn'
        },
    ]
    let keyId = '';
    if (e.keyCode === 8){
        if (operatorPressed === false){
            displayNum = displayNum.substring(0, displayNum.length-1);
            updateDisplay();
        }
    } else if (e.keyCode >= 48 && e.keyCode <= 57 && !e.shiftKey) {
        keyId = keyArray.find(key => key.code == e.key).id;
        processNumber(keyId);
    } else if (e.key === '-'){
        keyId = 'subtract-btn';
        processOperator(keyId);
    } else if (e.key === '+'){
        keyId = 'add-btn';
        processOperator(keyId);
    } else if (e.key === '/'){
        keyId = 'divide-btn';
        processOperator(keyId);
    } else if (e.key === '*'){
        keyId = 'multiply-btn';
        processOperator(keyId);
    } else if (e.key === '=' || e.key === "Enter"){
        keyId = 'equal-btn';
        processOperator(keyId);
    } else if (e.key === 'Escape'){
        keyId = 'clear-btn';
        processSpecial(keyId);
    }
    
    if (keyId){
        const keyPressed = document.querySelector(`#${keyId}`);
        keyPressed.classList.add('pressed');
    }
    
}

function removeTransition(e){
    if (e.propertyName !== 'filter') return; //skip it if it's not a filter
    this.classList.remove('pressed');
}



let displayNum = '';
let operatorPressed = false;
let firstNum;
let chosenOperator;

const display = document.querySelector('#num-display');
const button = document.querySelectorAll('.button');
button.forEach(btn => btn.addEventListener('click', processClick));
button.forEach(btn => btn.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', processKeydowns);
