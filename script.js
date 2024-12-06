document.addEventListener("DOMContentLoaded", loadExpenses); // Load expenses when the page is loaded

// Event listener for adding expense
document.getElementById("expense-form").addEventListener("submit", function (e) {
  e.preventDefault();
  
  // Get the input values
  const expenseName = document.getElementById("expense-name").value;
  const expenseAmount = document.getElementById("expense-amount").value;
  const expenseDate = document.getElementById("expense-date").value; // Get the date from the calendar

  if (expenseName && expenseAmount && expenseDate) {
    // Create expense object
    const expense = {
      name: expenseName,
      amount: expenseAmount,
      date: expenseDate,
    };

    // Get existing expenses from localStorage or initialize empty array if none exist
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Add new expense to the array
    expenses.push(expense);

    // Save updated expenses to localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Clear the form
    document.getElementById("expense-form").reset();

    // Reload the expense summary
    loadExpenses();
  }
});

// Function to load expenses from localStorage and display them
function loadExpenses() {
  const expenseList = document.getElementById("expense-list");
  expenseList.innerHTML = ""; // Clear the table before adding new data

  // Get expenses from localStorage
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Check if there are any expenses to display
  if (expenses.length > 0) {
    expenses.forEach(function (expense) {
      const row = document.createElement("tr");

      // Create cells for expense name, amount, and date
      const nameCell = document.createElement("td");
      nameCell.textContent = expense.name;

      const amountCell = document.createElement("td");
      amountCell.textContent = "₹ " + expense.amount;

      const dateCell = document.createElement("td");
      dateCell.textContent = expense.date;

      // Append the cells to the row
      row.appendChild(nameCell);
      row.appendChild(amountCell);
      row.appendChild(dateCell);

      // Append the row to the table
      expenseList.appendChild(row);
    });
  }
}

// Event listener for clearing the summary
document.getElementById("clear-summary").addEventListener("click", function () {
  // Clear expenses from localStorage
  localStorage.removeItem("expenses");

  // Reload the expense summary
  loadExpenses();
});
