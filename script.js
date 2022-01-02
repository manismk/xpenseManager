let balanceLabel = document.getElementById("balance");
let incomeLabel = document.getElementById("income");
let expenseLabel = document.getElementById("expense");
let choice = document.getElementById("choice");
let formContainer = document.querySelector(".form-container");

let description = document.getElementById("description");
let amount = document.getElementById("value");
let transactionForm = document.getElementById("transaction-form");
let transactionContainer = document.querySelector(".tran-cont");

let transactions = [];
let income = 0,
  expense = 0,
  balance = 0;

choice.addEventListener("change", () => {
  formContainer.classList.toggle(`expenseb`);
  formContainer.classList.toggle(`incomeb`);
});

class Transact {
  constructor(type, description, amount) {
    this.id = Date.now();
    this.type = type;
    this.description = description;
    this.amount = amount;
  }
}
transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let tr = new Transact(choice.value, description.value, amount.value);
  transactions.push(tr);
  renderTransaction(tr);
  updateAmount(choice.value, Number(amount.value));
  storeTransactions();

  description.value = amount.value = "";
  description.focus();
});

function renderTransaction(trans) {
  const html = `<div id='${trans.id}' class="list ${trans.type}c">
    <p class="desc">${trans.description}</p>
    <p class="liamount">${trans.amount}</p>
    <button onclick='deleteThis(event)'>
      <i class="fas fa-times"></i>
    </button>
  </div>`;
  transactionContainer.insertAdjacentHTML("afterbegin", html);
}

function updateAmount(type, amount) {
  if (type === "income") {
    income = income + amount;
    balance = balance + amount;
  }
  if (type === "expense") {
    expense = expense + amount;
    balance = balance - amount;
  }

  balanceLabel.innerText = balance;
  incomeLabel.innerText = income;
  expenseLabel.innerText = expense;
}
function deleteAmount(type, amount) {
  if (type === "income") {
    income = income - amount;
    balance = balance - amount;
  }
  if (type === "expense") {
    expense = expense - amount;
    balance = balance + amount;
  }

  balanceLabel.innerText = balance;
  incomeLabel.innerText = income;
  expenseLabel.innerText = expense;
}

function deleteThis(e) {
  let targetEl;
  if (e.target.parentNode.classList.contains("list"))
    targetEl = e.target.parentNode;
  if (e.target.parentNode.parentNode.classList.contains("list"))
    targetEl = e.target.parentNode.parentNode;

  let targetId = targetEl.id;
  let targetTrans = transactions.find((et) => et.id == targetId);
  deleteAmount(targetTrans.type, Number(targetTrans.amount));
  //console.log(targetTrans);

  transactions = transactions.filter((et) => et.id != targetId);

  //console.log(targetEl.id);
  transactionContainer.removeChild(targetEl);
  storeTransactions();
}

function storeTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function getTransactions() {
  const data = JSON.parse(localStorage.getItem("transactions"));
  if (!data) return;
  //console.log(data);

  transactions = data;

  data.map((trans) => {
    renderTransaction(trans);
    updateAmount(trans.type, Number(trans.amount));
  });
}

getTransactions();
