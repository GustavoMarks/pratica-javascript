// Referências para elementos do html
let nomeInput = document.getElementById("nome");
let sobrenomeInput = document.getElementById("sobrenome");
let incluirBtn = document.getElementById("incluir");
let tabela = document.getElementById("tabela");
let corpoTabela = document.getElementById("corpoTabela");
let linhaPreecher = document.getElementById("preencher");
let cabecalhoTabela = document.getElementById("cabecalhoTabela");
let contagem = document.getElementById("contagemPessoas");
let excluirBtn = document.getElementById("excluirBtn");

let pessoas = []; // Vetor com lista de pessoas inseridas ({id, nome, sobrenome})
let selecionados = []; // Guarda lista de itens selecionados na tabela

// Função de incluir na tabela
incluirBtn.addEventListener('click', function () {
  if (!nomeInput.value || !sobrenomeInput.value) {
    return alert("Não é possível inclur pessoas com dados não fornecidos!");
  }

  pessoas.push({
    id: pessoas.length,
    nome: nomeInput.value,
    sobrenome: sobrenomeInput.value
  });

  let selectAllInput = document.getElementById("all-select-input");
  if (selectAllInput) selectAllInput.checked = false
  render();

});


// Função para carregar na tela valores do array
function render() {

  if (pessoas.length === 0) {
    linhaPreecher.style = "display: auto;"
    contagem.style = "display: none";
    excluirBtn.style = "display: none";

    let allSelector = document.getElementById("colunaSelector");
    if (allSelector) allSelector.remove();

  } else {
    contagem.style = "display: auto";
    contagem.innerHTML = `${pessoas.length} pessoa(s) cadastrada(s)`
    excluirBtn.style = "display: auto";

    linhaPreecher.style = "display: none;"
    if (cabecalhoTabela.firstChild.id !== "colunaSelector") {
      let novaColuna = document.createElement("td");
      novaColuna.id = "colunaSelector";
      let selectAllColum = document.createElement("span");
      let selectInput = document.createElement("input");
      selectInput.type = "checkbox";
      selectInput.id = "all-select-input"

      selectAllColum.onclick = function () {
        if (document.getElementById("all-select-input").checked) {
          return selecionarTodos();
        } else {
          return removerTodosSelectionados()
        }
      }

      selectAllColum.appendChild(selectInput);
      novaColuna.appendChild(selectAllColum);
      cabecalhoTabela.insertBefore(novaColuna, cabecalhoTabela.firstChild);
    }
  }

  corpoTabela.textContent = '';

  pessoas.map((item, index) => {
    let novaLinha = document.createElement("tr");
    let cl1 = document.createElement("td");
    let cl2 = document.createElement("td");
    let cl3 = document.createElement("td");
    let clicable = document.createElement("span");
    let selectInput = document.createElement("input");

    cl2.innerHTML = item.nome;
    cl3.innerHTML = item.sobrenome;

    selectInput.type = "checkbox";
    selectInput.id = `checkbox-input-${index}`;

    clicable.onclick = function () {
      const input = document.getElementById(`checkbox-input-${index}`);
      if (input) {
        if (!input.checked) {
          return removerItem(item.id);
        }
        return adcionarUmItem(item.id);
      }
    }

    clicable.appendChild(selectInput);
    cl1.appendChild(clicable)

    novaLinha.appendChild(cl1);
    novaLinha.appendChild(cl2);
    novaLinha.appendChild(cl3);

    return corpoTabela.appendChild(novaLinha);
  })

}

// Método para excluir pessoas selecionadas
excluirBtn.addEventListener("click", function () {
  document.getElementById("all-select-input").checked = false;
  selecionados.map(item => {
    const index = pessoas.findIndex(pessoa => pessoa.id === item)
    pessoas.splice(index, 1);
  });

  selecionados = [];

  render();
});

// Acrescentar item selecionado para remoção
function adcionarUmItem(id) {
  selecionados.push(id);
  excluirBtn.disabled = false;
}

// Remover um item da lista de selecionados
function removerItem(index) {
  const finded = selecionados.indexOf(index);
  if (finded !== -1) {
    selecionados.splice(finded, 1)
  }
  if (selecionados.length === 0) excluirBtn.disabled = true
}

// Selecionar todos
function selecionarTodos() {
  // Inserindo todos os índices no array
  selecionados = []
  pessoas.map((item, index) => {
    document.getElementById(`checkbox-input-${index}`).checked = true;
    return selecionados.push(item.id);
  });

  excluirBtn.disabled = false


}

// Remover marcação de seleção de todos os items
function removerTodosSelectionados() {
  selecionados = [];
  pessoas.map((item, index) => {
    return document.getElementById(`checkbox-input-${index}`).checked = false;
  });

  excluirBtn.disabled = true;
}