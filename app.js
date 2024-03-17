// Variáveis globais para armazenar informações do jogo
let listaDeNumerosSorteados = [];
let limiteNumerosSorteados = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função para exibir texto em elementos HTML e falar o texto
function exibirTexto(tag, texto) {
    campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

// Função para exibir a mensagem inicial do jogo
function mensagemInicial() {
    exibirTexto('h1', 'Jogo do Número Secreto');
    exibirTexto('p', 'Insira o número secreto');
}

// Chamar a função para exibir a mensagem inicial do jogo
mensagemInicial();

// Função para verificar o chute do jogador
function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(chute);

    let palavraT = tentativas > 1 ? 'tentativas' : 'tentativa'

    if (chute == numeroSecreto) {
        let certoH1 = `Parabéns, você acertou com ${tentativas} ${palavraT}!`;
        let certoP = `O número secreto é ${numeroSecreto}`;

        exibirTexto('h1', certoH1);
        exibirTexto('p', certoP);

        // Ativar o botão de reiniciar
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        let erradoH1 = 'Resposta errada!';
        let erradoP = `O número secreto é ${numeroSecreto > chute ? 'maior' : 'menor'} que ${chute}`;

        exibirTexto('h1', erradoH1);
        exibirTexto('p', erradoP);
        limparCampo();
    } tentativas++;

}

// Função para gerar um número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteNumerosSorteados + 1);
    let quantidadeDeElementosLista = listaDeNumerosSorteados.length;

    // Verificar se a lista de números sorteados atingiu o limite
    if (quantidadeDeElementosLista == listaDeNumerosSorteados) {
        listaDeNumerosSorteados = [];
    }

    // Verificar se o número gerado já foi sorteado anteriormente
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// Função para limpar o campo de entrada
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    console.log('Reiniciando o jogo');
    // Gerar um novo número secreto
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    // Reiniciar o contador de tentativas
    tentativas = 1;
    // Limpar o campo de entrada
    limparCampo();
    // Exibir a mensagem inicial do jogo
    mensagemInicial();
    // Desativar o botão de reiniciar
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
