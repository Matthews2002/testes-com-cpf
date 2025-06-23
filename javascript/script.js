const formOptions = document.querySelector('#options');
const modalsDefault = document.querySelectorAll('.modal-default')

const timer = (time, fn) => new Promise(resolve => setTimeout(() => resolve(fn()), time));

formOptions.addEventListener('submit', async e => {
    e.preventDefault();
    const dialogSelected = e.submitter.value;
    const dialog = document.querySelector(dialogSelected);
    if (!dialog.classList.contains('active')) {
        await timer(300, () => console.log('ATIVADO'))
        dialog.classList.add('active');
    } 
});

modalsDefault.forEach(modalContainer => {
    modalContainer.addEventListener('click', async e => {
        const dialog = e.target;
        if (dialog.classList.contains('active')) {
            await timer(300, () => console.log('DESATIVADO'))
            dialog.classList.remove('active');
        } 
    });
});

const gerarCpf = document.querySelector('#gerar-cpf');

function cpfMask(cpfNumber) {
    if (typeof cpfNumber !== 'string') throw new Error('Aceito apenas string.');
    cpfNumber = cpfNumber.replace(/\D/g, '');
    if (cpfNumber.length !== 11) throw new Error('CPF Invalido!');
    const regex = /(\d{3})(\d{3})(\d{3})(\d{2})/;    
    return cpfNumber.replace(regex, '$1.$2.$3-$4');
}

gerarCpf.addEventListener('submit', e => {
    e.preventDefault();
    const resultSpan = e.target.closest('div').querySelector('span.result');
    const cpf = generatorCPF();
    resultSpan.innerText = cpfMask(cpf);
});

const spanGen = gerarCpf.closest('div').querySelector('span.result')
spanGen.addEventListener('click', async e => {
    try {
        await navigator.clipboard.writeText(e.target.innerText)
        e.target.classList.add('show-copy');
        await timer(1000, () => 0)
        e.target.classList.remove('show-copy');
    } catch(e) {
        alert('Erro:', e.message);
    }
});

const validarCpfForm = document.querySelector('#validar-cpf');

validarCpfForm.addEventListener('submit', e => {
    e.preventDefault();
    const cpf = e.target.querySelector('#cpf');
    const result = e.target.querySelector('.result');
    const validate = validateCPF(cpf.value) ? 'Verdadeiro': 'Falso';
    result.innerText = `CPF: ${cpfMask(cpf.value)} é ${validate}`;
});

const inputValue = document.querySelector('#cpf');
inputValue.addEventListener('input', e => {
    const result = window.document.querySelector('#validar-cpf .result');
    if (e.target.value.match(/\D/g)) {
        e.target.value = e.target.value.replace(/\D/g, '')
    }
    result.innerText = `CPF: ${e.target.value}`;

    e.target.value = cpfMask(e.target.value)
    if (e.target.value.length === 14) {
        const validate = validateCPF(e.target.value) ? 'Verdadeiro': 'Falso';
        result.innerText = `CPF: ${cpfMask(e.target.value)} é ${validate}`;
    }
})
