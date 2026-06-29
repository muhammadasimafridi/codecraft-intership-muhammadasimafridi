const itemInput = document.querySelector("#item");
const priceInput = document.querySelector("#price");
const incBtn = document.querySelector(".inc-btn");
const expBtn = document.querySelector(".exp-btn");
const incomeList = document.querySelector(".income");
const expenseList = document.querySelector(".expenses");
const incomeTotalEl = document.querySelector("#income-total");
const expenseTotalEl = document.querySelector("#expense-total");
const balanceEl = document.querySelector("#balance");
const warning = document.querySelector("#warning");
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
function addTransaction(type) {
  const item = itemInput.value.trim();
  const price = Number(priceInput.value);
  if (item === "" || price <= 0) {
    warning.textContent = "Please enter a valid description and amount.";
    return;
  }
  warning.textContent = "";
  const transaction = {
    id: Date.now(),
    item: item,
    price: price,
    type: type
  };
  transactions.push(transaction);
  saveToLocalStorage();
  displayTransactions();
  updateTotals();
  itemInput.value = "";
  priceInput.value = "";
}
function displayTransactions() {
  incomeList.innerHTML = "";
  expenseList.innerHTML = "";
  transactions.forEach((transaction) => {
    const li = document.createElement("li");
    li.className = "list-items";
    li.innerHTML = `
      <p>${transaction.item}</p>
      <span>Rs. ${transaction.price}</span>
      <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
    `;
    if (transaction.type === "income") {
      incomeList.appendChild(li);
    } else {
      expenseList.appendChild(li);
    }
  });
}
function updateTotals() {
  const incomeTotal = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.price, 0);
  const expenseTotal = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.price, 0);
  const balance = incomeTotal - expenseTotal;
  incomeTotalEl.textContent = `Rs. ${incomeTotal}`;
  expenseTotalEl.textContent = `Rs. ${expenseTotal}`;
  balanceEl.textContent = `Rs. ${balance}`;
}
function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  saveToLocalStorage();
  displayTransactions();
  updateTotals();
}
incBtn.addEventListener("click", () => {
  addTransaction("income");
});
expBtn.addEventListener("click", () => {
  addTransaction("expense");
});
displayTransactions();
updateTotals();