let numAccumulator = [];
let digitAccumulator = [];
let operatorAccumulator = [];
let sum;
let previousNumberDisplay = '';

//numbers
let nums = document.querySelectorAll('.num');
nums.forEach(x => x.addEventListener('click', numDisplayer));

//+ - * / % functions
let operators = document.querySelectorAll('.operator');
operators.forEach(x => x.addEventListener('click', operatorFunction));

//ce button
document.getElementById('AC').addEventListener('click', acButton);

//c button
document.getElementById('C').addEventListener('click', cButton);

//= button
document.getElementById('=').addEventListener('click', equalsFunction);


let calculator = {
    '+': function (num1, num2) {
        return num1 + num2;
    },
    '-': function (num1, num2) {
        return num1 - num2;
    },
    'x': function (num1, num2) {
        return num1 * num2;
    },
    '/': function (num1, num2) {
        return num1 / num2;
    },
    '%': function (num1, num2) {
        return num1 * num2 / 100;
    }
}

function operatorFunction(e) {
    if (digitAccumulator.length !== 0) {

        let currentNum = Number(digitAccumulator.join(''));
        numAccumulator.push(currentNum);
        operatorAccumulator.push(e.target.id);
        previousNumberDisplay += currentNum;
        digitAccumulator = [];

        doCalculation(currentNum);
        displayPrevious(e);
    }else if(sum !== undefined){
        operatorAccumulator[operatorAccumulator.length-1] = e.target.id;
        previousNumberDisplay = `${sum} ${e.target.id} `;
        document.querySelector('.previous').textContent = `${previousNumberDisplay}`;
    }
}

function doCalculation(currentNum) {
    if (sum === undefined) {
        sum = currentNum
    } else {
        let calculate = calculator[operatorAccumulator[operatorAccumulator.length - 2]]
        sum = calculate(sum, currentNum)
        document.querySelector('.current').textContent = `${sum}`;
    }
}

function numDisplayer(e) {
    if(e.target.id =='.'){
        if(!digitAccumulator.includes('.')){
            digitAccumulator.push(e.target.id)
            document.querySelector('.current').textContent = `${digitAccumulator.join('')}`;
        }
    }else{
        digitAccumulator.push(e.target.id)
        document.querySelector('.current').textContent = `${digitAccumulator.join('')}`;
    }

}

function displayPrevious(e) {
    previousNumberDisplay = `${sum} ${e.target.id} `;
    document.querySelector('.previous').textContent = `${previousNumberDisplay}`;
    document.querySelector('.current').textContent = `${sum}`;
}

function acButton() {
    numAccumulator = [];
    digitAccumulator = [];
    operatorAccumulator = [];
    sum = undefined;
    previousNumberDisplay = '';
    document.querySelector('.current').textContent = '';
    document.querySelector('.previous').textContent = ``;
}

function cButton() {
    if (digitAccumulator.length !== 0) {
        digitAccumulator.pop();
        document.querySelector('.current').textContent = `${digitAccumulator.join('')}`;
    }
}

function equalsFunction() {
    if (digitAccumulator.length !== 0) {
        let currentNum = parseInt(digitAccumulator.join(''));

        let calculate = calculator[operatorAccumulator[operatorAccumulator.length - 1]];
        sum = calculate(sum, currentNum);
        document.querySelector('.current').textContent = `${sum}`;
        digitAccumulator = [];
        sum = undefined;
        numAccumulator = [];
        operatorAccumulator = [];
        previousNumberDisplay = '';
        document.querySelector('.previous').textContent = ``;
    }
}
