/**
 * Name: basesWMath.js
 * Author: Devin Arena
 * Purpose: Converts between bases 2-10 and 16 using the JavaScript API.
 * Date:    10/20/2020
 */

const bases = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 16 ]; // Used to determine which field uses which base

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
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].oninput = function() {
            targetNumber = parseInt(BigInt(inputs[i].value).toString(10), bases[i]);
            updateAll();
        }
    }
}

/**
 * Updates each field after one is changed.
 */
function updateAll() {
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i] !== document.activeElement)
            inputs[i].value = targetNumber.toString(bases[i]);
    }
}