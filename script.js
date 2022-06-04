const inputCoder = document.getElementById('coder-input');
const outputCoder = document.getElementById('coder-output');
const cleanCoder = document.getElementById('btn-clean-coder');

const inputDecoder = document.getElementById('decoder-input');
const outputDecoder = document.getElementById('decoder-output');
const decode = document.getElementById('btn-decode');
const cleanDecoder = document.getElementById('btn-clean-decoder');

let codedMessage = [];
let decodedMessage = [];

inputCoder.addEventListener('keydown', (e) => {
    console.log(e.key.charCodeAt(0));
    let char = e.key.charCodeAt(0);
    if (char === 32) {
        // space character
        codedMessage.push('&nbsp;');
    }
    else if (char === 66) {
        // if backspace remove last character from output message
        codedMessage.pop();
    }
    else if (char === 83 || char === 67 || char === 69 || char === 84){
        // ignore shift, tab, enter, caps
    }
    else if (char > 96 && char < 123) {
        // low characters
        codedMessage.push(char-96);
    }
    else if (char > 64 && char < 91) {
        // capital characters
        codedMessage.push(char-64);
    }
    else {
        codedMessage.push(e.key);
    }
    outputCoder.innerHTML = codedMessage.join(' ');
});

cleanCoder.addEventListener('click', () => {
    // Clean up for a new mesage
    inputCoder.value = '';
    codedMessage = [];
    outputCoder.innerHTML = '';
});

decode.addEventListener('click', () => {
    console.log(inputDecoder.value.split(' '));
    let codedArray = inputDecoder.value.split(' ');
    let countSpaces = 0;
    codedArray.forEach( item => {
        if (item === '') {
            // remove double spacing
            countSpaces ++;
            if (countSpaces === 1) {
                decodedMessage.push(' ');
            } else {
                countSpaces = 0;
            }
        } else if (item >= 1 && item <= 26) {
            decodedMessage.push(String.fromCharCode(parseInt(item) + 96));
        } else if (item < 1 || item > 26) {
            alert("Check your code, something doesn't look right!!");
        }
    })
    outputDecoder.innerHTML = decodedMessage.join('');
    inputDecoder.value = '';
});

cleanDecoder.addEventListener('click', () => {
    inputDecoder.value = '';
    decodedMessage = [];
    outputDecoder.innerHTML = '';
});