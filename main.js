// Generating random letter/number functions
// CharCode values - https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/02572bcf-76c4-420a-90ac-65a0c8c71eae/iso-8859-5-php-orange.png

// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomfunc = {
    lower: getLower,
    upper: getUpper,
    number: getNumber,
    symbol: getSymbol, 
};

generateEl.addEventListener('click', () => {
    const length =+ lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasLower, 
        hasUpper, 
        hasNumber, 
        hasSymbol, 
        length);
});

clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
    
    if(!password) { return; }
    
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});

function generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length){
    let generatePassword = '';
    const typesCount = lower + upper + number + symbol;

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
        item => Object.values(item)[0]);

        // Doesn't have a selected type
    if(typesCount === 0) {
        return '';
    }
    
    // create a loop
    for(let i=0; i<length; i+=typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}


function getLower(){
    // Random letter from the alphabet 1-26 
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getUpper(){
    // Random letter from the alphabet 1-26 
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getSymbol(){
     const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}