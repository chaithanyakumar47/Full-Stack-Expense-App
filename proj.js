function saveLocal(event){
    event.preventDefault();
    const amount = event.target.expense.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const expenseDetails = {
        amount,
        description,
        category
    };
    localStorage.setItem(expenseDetails.category,JSON.stringify(expenseDetails));
    showUser(expenseDetails);
}
function showUser(expenseDetails){
    const parent = document.getElementById('users');
    const child = document.createElement('li');
    child.textContent = expenseDetails.amount + ' - ' + expenseDetails.description + ' - ' + expenseDetails.category;
    const deleteBtn = document.createElement('input');
    const editBtn = document.createElement('input');

    editBtn.type = 'button';
    editBtn.value = 'Edit Expense';
    editBtn.setAttribute('class','btn btn-outline-primary');
    editBtn.onclick = () => {
        const expense = document.getElementById('expense');
        const description = document.getElementById('description');
        const category = document.getElementById('category');
        
        expense.value = expenseDetails.amount;
        description.value = expenseDetails.description;
        category.value = expenseDetails.category;
        localStorage.removeItem(expenseDetails.category);
        parent.removeChild(child);
        
    }
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete Expense';
    deleteBtn.setAttribute('class','btn btn-outline-danger');
    deleteBtn.onclick = () => {
        localStorage.removeItem(expenseDetails.category);
        parent.removeChild(child);
    }
    child.appendChild(editBtn);
    child.appendChild(deleteBtn);
    parent.appendChild(child);
}