let listaDeNumerosSorteados = [];
let limiteNumerosSorteados = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


console.log(numeroSecreto);

function exibirTexto(tag, texto) {
    campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate : 1.2});
}

function mensagemInicial() {
    exibirTexto('h1', 'Jogo do Número Secreto');
    exibirTexto('p', 'Insira o número secreto');
}

mensagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(chute);

    let palavraT = tentativas > 1 ? 'tentativas' : 'tentativa'

    if (chute == numeroSecreto) {
        let certoH1 = `Parabéns, você acertou com ${tentativas} ${palavraT}!`;
        let certoP = `O número secreto é ${numeroSecreto}`;

        exibirTexto('h1', certoH1);
        exibirTexto('p', certoP);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        let erradoH1 = 'Resposta errada!';
        let erradoP = `O número secreto é ${numeroSecreto > chute ? 'maior' : 'menor'} que ${chute}`;

        exibirTexto('h1', erradoH1);
        exibirTexto('p', erradoP);
        limparCampo();
    } tentativas++;

}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteNumerosSorteados + 1);
    let quantidadeDeElementosLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosLista == listaDeNumerosSorteados) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    console.log('Reiniciando o jogo');
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    tentativas = 1;
    limparCampo();
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}


