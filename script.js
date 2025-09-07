// Seleciona os elementos do Formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount");
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//capitura o evento de input para formatar o valor
amount.oninput = () => {
  //Obtém o valor atual do input e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g, "");

  // Transformar o valor em centavos (ex: 150/100 = 1.5 que é equivalente R$ 1,50)
  value = Number(value) / 100

    //Atualiza o valor do input
    amount.value = formatCurrencyBBL(value);
};

function formatCurrencyBBL(value) {
  //Formata o valor no padrão BRL (Real Brasileiro)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return value;
}

form.onsubmit = (event) => {
event.preventDefault()

}