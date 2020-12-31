// Referências de elementos do html
let btnAnimar = document.getElementById("animar");
let btnParar = document.getElementById("parar");
let userInput = document.getElementById("index-input");

let opcoes = document.getElementById("opcoes");
let semEfeitoBtn = document.getElementById("semEfeitos");
let setMaiusculoBtn = document.getElementById("maiusculoBtn");
let setMinusculoBtn = document.getElementById("minusculoBtn");

let maisRapido = document.getElementById("maisRapido");
let maisDevagar = document.getElementById("maisDevagar");

let velocidade = 1000; // Configura a velocidade da animação (inicialmente 1s)
let animado = false    // Indica se animação está sendo executada

let intervalThread;    // Guarda o id criado no setInterval

const originalInput = userInput.value; // Input sem efeito;

// Adicionando método de click dos botões de parar e animar
btnAnimar.addEventListener('click', function(){
  btnAnimar.style = "margin-top: 10px; display: none";
  btnParar.style = "margin-top: 10px;"
  opcoes.style = "display: block;"

  intervalThread = setInterval(function(){
    let inputValue = userInput.value;
    userInput.value = stringInvert(inputValue);
  }, velocidade);

});

btnParar.addEventListener('click', function(){
  btnParar.style = "margin-top: 10px; display: none";
  btnAnimar.style = "margin-top: 10px;"
  opcoes.style = "display: none;"

  clearInterval(intervalThread);
});


// Funções dos botões das opções
semEfeitoBtn.addEventListener('change', function() {
  userInput.value = originalInput;
  userInput.onchange = null;

});

setMaiusculoBtn.addEventListener('change', function() {
  userInput.value = userInput.value.toUpperCase();
  userInput.onchange = (e) => e.target.value = e.target.value.toUpperCase();

});

setMinusculoBtn.addEventListener('change', function() {
  userInput.value = userInput.value.toLowerCase();
  userInput.onchange = (e) => e.target.value = e.target.value.toLowerCase();

});

// Funções dos botões mais devagar e mais rápido
maisRapido.addEventListener('click', function() {
  clearInterval(intervalThread);
  velocidade = velocidade/2;

  intervalThread = setInterval(function(){
    let inputValue = userInput.value;
    userInput.value = stringInvert(inputValue);
  }, velocidade);
});

maisDevagar.addEventListener('click', function() {
  clearInterval(intervalThread);
  velocidade = velocidade*2;

  intervalThread = setInterval(function(){
    let inputValue = userInput.value;
    userInput.value = stringInvert(inputValue);
  }, velocidade); 
});

// Função para deslocar primeiro caractere de uma string
function stringInvert(value){
  return value.slice(-1 * (value.length - 1)) + value[0];
}