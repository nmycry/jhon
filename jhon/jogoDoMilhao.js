const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const perguntas = [
  "Qual é a capital do Brasil?",
  "Quanto é 5 x 6?",
  "Quem escreveu 'Dom Casmurro'?",
  "Qual o elemento químico representado por H?",
  "Em que continente fica o Egito?",
  "Qual linguagem roda no navegador?",
  "Qual planeta é conhecido como planeta vermelho?",
  "Quantos segundos tem 1 minuto?",
  "Quem descobriu o Brasil?",
  "Qual a capital da França?",
  "Quantos dias tem um ano comum?",
  "Qual animal é conhecido como o rei da selva?",
  "O que significa 'HTML'?",
  "Qual a cor resultante da mistura azul + amarelo?",
  "Quantos lados tem um hexágono?"
];

const opcoes = [
  ["A) São Paulo", "B) Brasília", "C) Rio de Janeiro"],
  ["A) 11", "B) 25", "C) 30"],
  ["A) Machado de Assis", "B) José de Alencar", "C) Jorge Amado"],
  ["A) Hélio", "B) Hidrogênio", "C) Hálio"],
  ["A) Ásia", "B) América", "C) África"],
  ["A) Python", "B) JavaScript", "C) C++"],
  ["A) Terra", "B) Marte", "C) Vênus"],
  ["A) 60", "B) 100", "C) 120"],
  ["A) Pedro Álvares Cabral", "B) Cristóvão Colombo", "C) Vasco da Gama"],
  ["A) Paris", "B) Londres", "C) Roma"],
  ["A) 365", "B) 366", "C) 360"],
  ["A) Leão", "B) Tigre", "C) Elefante"],
  ["A) Linguagem de marcação", "B) Linguagem de programação", "C) Protocolo de rede"],
  ["A) Verde", "B) Laranja", "C) Roxo"],
  ["A) 5", "B) 6", "C) 8"]
];

const respostas = ["B", "C", "A", "B", "C", "B", "B", "A", "A", "A", "A", "A", "A", "A", "B"];
const premios = [
  1000, 5000, 10000, 20000, 30000,
  40000, 50000, 60000, 70000, 80000,
  100000, 150000, 300000, 500000, 1000000
];

let nomeJogador = "";
let perguntaAtual = 0;
let premioAtual = 0;

function iniciar() {
  rl.question("Digite seu nome para começar o Show do Milhão: ", function(nome) {
    nomeJogador = nome.trim();  
    console.log(`\nBem-vindo, ${nomeJogador}! Vamos começar o jogo!\n`);
    fazerPergunta();
  });
}

function fazerPergunta() {
  console.log(`\n${nomeJogador}, esta é a pergunta ${perguntaAtual + 1} de ${perguntas.length}`);
  console.log(`Se acertar: R$${premios[perguntaAtual]}`);
  console.log(`Se errar: R$${premioAtual}`);
  console.log(`Se parar agora: R$${premioAtual}`);
  console.log(`\n${perguntas[0]}`);

  for (let i = 0; i < opcoes[perguntaAtual].length; i++) {
    console.log(opcoes[perguntaAtual][i]);
  }

  rl.question("\nDigite A, B, C ou P (para parar): ", function(resposta) {
    tratarResposta(resposta.toUpperCase());
  });
}

function tratarResposta(resposta) {
  if (resposta === "P") {
    encerrarJogo("parou");
  } else if (resposta === respostas[perguntaAtual]) {
    premioAtual = premios[perguntaAtual];
    perguntaAtual++;

    if (perguntaAtual >= perguntas.length) {
      encerrarJogo("venceu");
    } else {
      console.log("Resposta correta!");
      fazerPergunta();
    }
  } else {
    encerrarJogo("errou");
  }
}

function encerrarJogo(estado) {
  console.log("\nFim de jogo");
  console.log(`Jogador: ${nomeJogador}`);
  console.log(`Rodada: ${perguntaAtual + 1}`);
  console.log(`Faltavam: ${perguntas.length - (perguntaAtual + 1)} perguntas`);

  if (estado === "errou") {
    console.log(`Você errou. A resposta correta era: ${respostas[perguntaAtual]}`);
    console.log(`Premiação final: R$${premioAtual}`);
  } else if (estado === "parou") {
    console.log(`Você decidiu parar. A resposta correta seria: ${respostas[perguntaAtual]}`);
    console.log(`Premiação final: R$${premioAtual}`);
  } else if (estado === "venceu") {
    console.log("Você respondeu todas as perguntas corretamente!");
    console.log(`Premiação final: R$${premioAtual}`);
  }

  rl.question("\nDeseja jogar novamente? (S/N): ", function(resposta) {
    if (resposta.toUpperCase() === "S") {
      perguntaAtual = 0;
      premioAtual = 0;
      iniciar();
    } else {
      console.log("\nObrigado por jogar! Até a próxima!");
      rl.close();
    }
  });
}

iniciar();
