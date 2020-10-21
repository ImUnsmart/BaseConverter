/**
 * Name: basesWMath.js
 * Author: Devin Arena
 * Purpose: Converts between bases 2-10 and 16 using a custom written math method.
 *          This unfortunately does not work well for super large numbers, but was mainly written for fun.
 * Date:    10/20/2020
 */

const bases = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 16 ]; // Used to determine which field uses which base
const hexDecimal = { // Helper to determine what characters are what digit in hex
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15
}

const decimalHex = { // Used to determine what characters are what digit in hex
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F'
}

let inputs;
let hexField;
let targetNumber = BigInt(0);

/**
 * When the window loads, the input fields of the baseForm should be grabbed
 * and a function for the oninput event will determine when they are modified.
 * The function will convert the number to base 10 as a target number and then
 * will update every field, converting the target number into the specified base. 
 */
window.onload = function() {
    inputs = document.forms["baseForm"].getElementsByTagName("input");
    for(let i = 0; i < inputs.length - 1; i++) {
        inputs[i].oninput = function() {
            if(inputs[i].value < 1)
                return;
            targetNumber = convertToBase(BigInt(inputs[i].value), bases[i], BigInt(10));
            updateAll();
        }
    }
    hexField = inputs[inputs.length - 1];
    hexField.oninput = function() {
        hexToDecimal();
        updateAll();
    }
}

/**
 * Converts a number from one base to another (in the range of 2-10)
 * 
 * @param {BigInt} number the number to convert
 * @param {Integer} base the current base
 * @param {Integer} target the base to convert to
 */
function convertToBase(number, base, target) {
    let result = BigInt(0);
    let count = 0;
    while(number > 0) {
        let digit = number % target;
        if (digit > base - 1)
            return 0;
        result += digit * BigInt(Math.pow(base, count));
        count++;
        number = number / target;
    }
    return result;
}

/**
 * Converts a base-16 number to a base-10 number.
 */
function hexToDecimal() {
    targetNumber = BigInt(0);
    for(let i = 0; i < hexField.value.length; i++) {
        let digit = hexField.value.toUpperCase().charAt(i);
        if(isNaN(digit)) {
            if(digit in hexDecimal) {
                digit = hexDecimal[digit];
            } else {
                return;
            }
        }
        targetNumber += BigInt(digit) * BigInt(Math.pow(16, hexField.value.length - i - 1));
    }
}

/**
 * Converts a base-10 number to a base-16 number.
 */
function decimalToHex() {
    let result = "";
    let number = targetNumber;
    while(number > 0) {
        let digit = number % BigInt(16);
        if(digit > 9)
            digit = decimalHex[digit];
        result = digit + result;
        number = number / BigInt(16);
    }
    return result;
}

/**
 * Updates each field after one is changed.
 */
function updateAll() {
    for(let i = 0; i < inputs.length - 1; i++) {
        if(inputs[i] !== document.activeElement)
            inputs[i].value = convertToBase(targetNumber, 10, BigInt(bases[i]));
    }
    if(hexField !== document.activeElement) {
        hexField.value = decimalToHex();
    }
}