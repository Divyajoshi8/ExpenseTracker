// Get form and expense list
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

// Initialize expenses array
let expenses = [];

// Handle form submit
expenseForm.addEventListener('submit', (event) => {
	// Prevent default form submission
	event.preventDefault();

	// Get form values
	const amountInput = document.getElementById('amount');
	const descriptionInput = document.getElementById('description');
	const categoryInput = document.getElementById('category');

	const amount = parseFloat(amountInput.value);
	const description = descriptionInput.value;
	const category = categoryInput.value;

	// Validate form values
	if (isNaN(amount) || description === '' || category === '') {
		alert('Please fill in all fields with valid values.');
		return;
	}

	// Add expense to expenses array
	const expense = { amount, description, category };
	expenses.push(expense);

	// Clear form inputs
	amountInput.value = '';
	descriptionInput.value = '';
	categoryInput.value = '';

	// Update expense list
	updateExpenseList();
});

// Handle expense list item delete button click
expenseList.addEventListener('click', (event) => {
	if (event.target.classList.contains('delete')) {
		// Find expense index
		const index = parseInt(event.target.closest('li').dataset.index);

		// Remove expense from expenses array
		expenses.splice(index, 1);

		// Update expense list
		updateExpenseList();
	}
});

// Handle expense list item edit button click
expenseList.addEventListener('click', (event) => {
	if (event.target.classList.contains('edit')) {
		// Find expense index
		const index = parseInt(event.target.closest('li').dataset.index);

		// Get expense element and value
		const expenseElement = event.target.closest('li');
		const expenseValue = expenseElement.querySelector('span').textContent;

		// Create edit form element
		const editForm = document.createElement('form');
		editForm.classList.add('edit-form');

		// Create edit form input and button elements
		const editInput = document.createElement('input');
		editInput.type = 'text';
		editInput.value = expenseValue;
		editInput.classList.add('edit-input');

		const editButton = document.createElement('button');
		editButton.type = 'submit';
		editButton.textContent = 'Save';
		editButton.classList.add('edit-button');

		// Add edit form input and button to edit form
		editForm.appendChild(editInput);
		editForm.appendChild(editButton);

		// Replace expense element with edit form
		expenseElement.classList.add('editing');
		expenseElement.insertBefore(editForm, expenseElement.firstChild);
		expenseElement.querySelector('span').style.display = 'none';

		// Set focus on edit form input
		editInput.focus();

		// Handle edit form submit
		editForm.addEventListener('submit', (event) => {
			event.preventDefault();

			// Get new expense value
			const newExpenseValue = editInput.value.trim();

			// Validate new expense value
			if (newExpenseValue === '') {
				alert('Please enter a valid expense value.');
				return;
			}

			// Update expenses array and expense list
			expenses[index].description = newExpenseValue;
			updateExpenseList();
		});
	}
});
// Update expense list
function updateExpenseList() {
    // Clear expense list
    expenseList.innerHTML = '';
  
    // Add expenses to expense list
    expenses.forEach((expense, index) => {
      const li = document.createElement('li');
      li.dataset.index = index;
  
      const amountSpan = document.createElement('span');
      amountSpan.classList.add('amount');
      amountSpan.textContent = expense.amount.toFixed(2);
  
      const descriptionSpan = document.createElement('span');
      descriptionSpan.classList.add('description');
      descriptionSpan.textContent = expense.description;
  
      const categorySpan = document.createElement('span');
      categorySpan.classList.add('category');
      categorySpan.textContent = expense.category;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete');
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit');
  
      li.appendChild(amountSpan);
      li.appendChild(descriptionSpan);
      li.appendChild(categorySpan);
      li.appendChild(deleteButton);
      li.appendChild(editButton);
  
      expenseList.appendChild(li);
    });
  }
  