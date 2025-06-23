const config = {
    amountRandomNumber: 9,
    initialValue: 1,
    endValue: 9
}

// Functions 
function randomNumber(initial, end) {
    if (end <= initial) throw new Error('Valor minimo maior que o valor maximo!')
    const min = Math.ceil(initial);
    const max = Math.floor(end);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillArrayWithRandomNumber(quant, initial, end) {
    const arr = [];
    for (let c = 0; c <= (quant - 1); c++ ) {
        arr.push(randomNumber(initial, end))
    }
    return arr;
}

function verificationDigit(array) {
    if (!Array.isArray(array) && typeof array !== 'string') throw new Error('Parâmetro aceito: Array e String');
    if (typeof array === 'string') array = array.replace(/\D/g, '').split('').map(Number);
    if (array.length < 9 || array.length > 11) throw new Error('CPF menor que 9');

    const arr = array.slice().reverse();

    const result = arr.reduce((acc, value, index) => {
        acc += value * (index + 2);
        return acc;
    }, 0)
    const digit = (result % 11) <= 1 ? 0 : 11 - (result % 11);
    array.push(digit);

    if (array.length !== 11) {
        return verificationDigit(array);
    }
    const cpfString = array.map(String).join('');
    if (validateCPFNumbersEqual(cpfString)) return false;
    return cpfString;
}

function validateCPFNumbersEqual(cpf) {
    if (typeof cpf !== 'string') throw new Error('String Only');
    cpf = cpf.replace(/\D/g, '')
    if (cpf.length !== 11) throw new Error('CPF deve ser igual a 11');
    return new Set(cpf).size === 1;
}

function generatorCPF() {
    const cpf = fillArrayWithRandomNumber(config.amountRandomNumber, config.initialValue, config.endValue);
    const fullCPF = verificationDigit(cpf);
    return validateCPFNumbersEqual(fullCPF) ? generatorCPF() : fullCPF;
}

function validateCPF(CPF) {
    if(!Array.isArray(CPF) && typeof CPF !== 'string') throw new Error('Parâmetros aceitos: Array e str');
    if (typeof CPF === 'string') CPF = CPF.replace(/\D/g, '').split('').map(Number);
    if (CPF.length !== 11) throw new Error('Formato invalido, aguardo 11 numeros.');
    const cpfString = CPF.join('');
    const cpfArr = CPF.slice(0, 9);

    return verificationDigit(cpfArr) === cpfString;
}
