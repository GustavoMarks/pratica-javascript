// Referências para os elementos buscados no html
let redacaoInput = document.getElementById("index-input");
let countCaract = document.getElementById("caracteres");
let countVogais = document.getElementById("vogais");
let countConsoates = document.getElementById("consoantes");
let countBranco = document.getElementById("branco");
let buscarInput = document.getElementById("buscar");
let buscarBtn = document.getElementById("buscarBtn");
let todosInput = document.getElementById("todos");

// Função para atualizar contadores junto a mudança do input
redacaoInput.oninput = function (ev) {
  countCaract.innerHTML = ev.target.value.length;
  countVogais.innerHTML = totalVogais(ev.target.value.toString());
  countConsoates.innerHTML = totalConsoates(ev.target.value.toString());
  countBranco.innerHTML = totalBranco(ev.target.value.toString())
}

// Função ao clicar no botão "ok" de busca
buscarBtn.addEventListener('click', function () {
  buscaValue = buscarInput.value;
  texto = redacaoInput.value;

  if (!todosInput.checked) {
    encontrar(buscaValue, texto);
  } else {
    encontrarOcorrencias(buscaValue, texto);
  }
})

// Função para contar vocais de uma string
function totalVogais(str) {
  let total = 0;
  [...str].forEach(letra => {
    if (vogais.find(item => item === letra)) total++;
  });
  return total;
}

// Função para contar consoantes de uma string
function totalConsoates(str) {
  let total = 0;
  [...str].forEach(letra => {
    if (consoantes.find(item => item == letra)) total++;
  });
  return total;
}

// Função para contar espaços em branco
function totalBranco(str) {
  let total = 0;
  [...str].forEach(letra => {
    if (letra === " " || letra === "\n") total++;
  });
  return total;
}

// Função para encontrar determinada entrada
function encontrar(item, str) {
  let index = str.indexOf(item);
  if (index === -1) alert("trecho não existe no texto");
  else alert(`Posição: ${index}`);

}

// Função para encontrar todoas as ocorrências de uma entrada
function encontrarOcorrencias(item, str) {
  let apr = 'Encontrado nas posições: ';
  let index = str.indexOf(item);          // Primeira ocorrência
  if (index === -1) return alert("trecho não existe no texto");
  else {
    apr = apr + `${index},`;
    while (index < str.length - 1 && index !== -1) {
      index = str.indexOf(item, index + 1);   // Próxima ocorrência
      if (index !== -1) apr = apr + `${index},`;
    }

    alert(apr);
  }

}

const vogais = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú', 'â', 'ê', 'ô', 'ã', 'õ'];
const consoantes = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n',
  'p', 'q', 'r', 's', 't', 'v', 'x', 'w', 'y', 'z'];