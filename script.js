const balanceEl = document.querySelector("#balance");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const transactionList = document.querySelector("#transaction-list");
const form = document.querySelector("#transaction-form");
const textInput = document.querySelector("#text");
const amountInput = document.querySelector("#amount");

let transactions = [];

// Add a new transaction
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = textInput.value.trim();
  const amount = +amountInput.value.trim();

  if (text === "" || amount === 0) {
    alert("Please enter valid data.");
    return;
  }

  const transaction = {
    id: Date.now(),
    text,
    amount,
  };

  transactions.push(transaction);
  updateUI();
  textInput.value = "";
  amountInput.value = "";
});

// Update the UI
function updateUI() {
  transactionList.innerHTML = "";

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const balance = income - expense;

  balanceEl.textContent = balance.toFixed(2);
  incomeEl.textContent = income.toFixed(2);
  expenseEl.textContent = expense.toFixed(2);

  transactions.forEach((t) => {
    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "income" : "expense");
    li.innerHTML = `
      ${t.text} <span>${t.amount > 0 ? "+" : "-"}$${Math.abs(
      t.amount
    )}</span>
      <button class="delete" onclick="deleteTransaction(${t.id})">x</button>
    `;
    transactionList.appendChild(li);
  });
}

// Delete a transaction
function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  updateUI();
}

// Initialize UI
updateUI();
