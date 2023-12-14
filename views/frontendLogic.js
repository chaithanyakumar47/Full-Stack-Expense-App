async function save(event){
    event.preventDefault();
    const item_name = event.target.item_name.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const quantity = event.target.quantity.value;
    
    const inventoryData = {
        item_name,
        description,
        price,
        quantity
    };
    try {
        const res = await axios.post('http://localhost:3000/expense/add-expense', inventoryData);
        //console.log(res);
        showUser(res.data.newExpenseDetail);
        console.log(res.data.newExpenseDetail)
    } catch (err) {
        console.error(err);
    }
}

function showUser(expense){
    const parent = document.getElementById('users');
    const child = `<li id = ${expense.id}> ${expense.item_name} - ${expense.description} - ${expense.price} - <span id='dynamic-${expense.id}'> ${expense.quantity}</span> 
        <button onclick=deleteUser('${expense.id}')>Delete</button>
        <button onclick=editUser('${expense.id}','${expense.item_name}','${expense.description}','${expense.price}','${expense.quantity}')>Edit</button>
        <button onclick=buyOneItem('${expense.id}')>Buy 1</button>
        <button onclick=buyTwoItem('${expense.id}')>Buy 2</button>
        <button onclick=buyThreeItem('${expense.id}')>Buy 3</button>
        </li>`
    parent.innerHTML = parent.innerHTML + child;
}

function editUser(expenseId, item_name, description, price, quantity) {
    document.getElementById('item_name').value = item_name;
    document.getElementById('description').value = description;
    document.getElementById('price').value = price;
    document.getElementById('quantity').value = quantity;
    deleteUser(expenseId);

}

async function deleteUser(expenseId) {
  try{
    await axios.delete(`http://localhost:3000/expense/delete-expense/${expenseId}`)
    const parent = document.getElementById('users');
    const child = document.getElementById(expenseId);
    parent.removeChild(child);
  } catch (err) {
    console.log(err);
  }

    
}

async function buyOneItem(expenseId) {
  try {
    const res= await axios.get(`http://localhost:3000/expense/unique/${expenseId}`);
    const currentQuantity = res.data.uniqueExpense.quantity;
    const updatedQuantity = currentQuantity - 1;
    if (updatedQuantity < 5) {
      alert("Quantity is running low!");
      return
    }
    await axios.put(`http://localhost:3000/expense/${expenseId}`,{
      quantity: updatedQuantity
    });
    const id = `dynamic-${expenseId}`
    var quantityElement = document.getElementById(id);
    var current = parseInt(quantityElement.innerText);
    var newQuantity = current - 1;
    quantityElement.innerText = newQuantity;
    
  } catch(err) {
    console.log(err);
  }
}

async function buyTwoItem(expenseId) {
  try {
    const res= await axios.get(`http://localhost:3000/expense/unique/${expenseId}`);
    const currentQuantity = res.data.uniqueExpense.quantity;
    const updatedQuantity = currentQuantity - 2;
    if (updatedQuantity < 5) {
      alert("Quantity is running low!");
      return
    }
    await axios.put(`http://localhost:3000/expense/${expenseId}`,{
      quantity: updatedQuantity
    });
    const id = `dynamic-${expenseId}`
    var quantityElement = document.getElementById(id);
    var current = parseInt(quantityElement.innerText);
    var newQuantity = current - 2;
    quantityElement.innerText = newQuantity;
    
  } catch(err) {
    console.log(err);
  }
}

async function buyThreeItem(expenseId) {
  try {
    const res= await axios.get(`http://localhost:3000/expense/unique/${expenseId}`);
    const currentQuantity = res.data.uniqueExpense.quantity;
    const updatedQuantity = currentQuantity - 3;
    if (updatedQuantity < 5) {
      alert("Quantity is running low!");
      return
    }
    await axios.put(`http://localhost:3000/expense/${expenseId}`,{
      quantity: updatedQuantity
    });
    const id = `dynamic-${expenseId}`
    var quantityElement = document.getElementById(id);
    var current = parseInt(quantityElement.innerText);
    var newQuantity = current - 3;
    quantityElement.innerText = newQuantity;
    
  } catch(err) {
    console.log(err);
  }
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/expense/get-expenses')
    .then(res => {
      // console.log(res.data.allExpenses[0])
        for(var i=0; i<res.data.allExpenses.length; i++){
            showUser(res.data.allExpenses[i])
            }
        // console.log(res.data.allUsers)
    }).catch(err => console.log(err));
})