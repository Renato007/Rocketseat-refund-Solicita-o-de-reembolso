// Seleciona os elementos do Formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span")

//capitura o evento de input para formatar o valor
amount.oninput = () => {
  //Obtém o valor atual do input e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g, "");

  // Transformar o valor em centavos (ex: 150/100 = 1.5 que é equivalente R$ 1,50)
  value = Number(value) / 100;

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

//Capitura o evento submit do formulário para obter os valores
form.onsubmit = (event) => {
  //Previne o comportamento padrão de recarregar a página.
  event.preventDefault();

  //cria um objeto com os detalhes da despesa.
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };
  //Chama a função que adiciona o item na lista
  expenseAdd(newExpense);
};

// Adicionar um novo item na lista.
function expenseAdd(newExpense) {
  try {
    //Cria o elemento para adiconar o item(li) na lista (ul).
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    //Cria o ícone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    //Cria a info da despesa.
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    //Criar o nome da despensa.
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    //Cria a categoria da despesa.
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    //Adiciona name e categoria na div das informações da despesa.
    expenseInfo.append(expenseName, expenseCategory);

    //Criar o valor da despensa.
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    //Criar o ícone de remover
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    //Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    //Adicona o item na lista
    expenseList.append(expenseItem);

    //Atualiza os totais
    updateTotaLs();

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  }
}

// Atualiza os totais.
function updateTotaLs() {
  try {
    //Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children;
    
    //Atualizar a quantidade de intens da lista.
    expenseQuantity.textContent =`${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
  } catch (error) {
    console.log(error);
    alert("Não foi possivel atualizar os totais.");
  }
}
