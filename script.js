// Seleciona os elementos do Formulário
const amount = document.getElementById("amount");

amount.oninput = () => {
  let value =amount.value.replace(/\D/g,"")//todos os caracteres que não são números são substituidos por nada.

  amount.value = value //atribui o valor para a propriedade value do imput
  
  
  
};
