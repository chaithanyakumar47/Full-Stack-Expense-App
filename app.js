const path = require('path');

const userRoutes = require('./routes/user');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const Expense = require('./models/Expense');
var cors = require('cors');
const { connected } = require('process');

const app = express();

app.use(cors());

app.use(bodyParser.json({ extented: false}));

app.post('/expense/add-expense', async(req, res, next) => {
    try {
        
        const item_name = req.body.item_name;
        const description = req.body.description;
        const price = req.body.price;
        const quantity = req.body.quantity;

        const data = await Expense.create( { item_name: item_name, description: description, price: price, quantity: quantity});
        res.status(201).json({newExpenseDetail: data});
    } catch(err) {
        res.status(500).json({
            error: err
        });

    }

});

app.get('/expense/get-expenses', async (req, res, next) => {
    const expenses = await Expense.findAll();
    res.status(200).json({allExpenses: expenses});
});

app.get('/expense/unique/:expenseId', async (req, res, next) => {
  try{
    const ExpenseId = req.params.expenseId;
    const expense = await Expense.findByPk(ExpenseId);
    res.status(200).json({uniqueExpense : expense});
  } catch(err) {
    console.log(err);
  }
})

app.put('/expense/:expenseId', async (req, res, next) => {
  const expenseId = req.params.expenseId;
  const newQuantity = req.body.quantity;
  try {
    const expense = await Expense.findByPk(expenseId);
    expense.quantity = newQuantity;
    await expense.save();

    res.status(200).json({ message: 'Quantity updated'});
  } catch(err) {
    console.log(err);
    res.status(500).send();
  }
})

//app.use('/user',userRoutes);

app.delete('/expense/delete-expense/:expenseId', async (req, res) => {
    try {
      const ExpenseId = req.params.expenseId;
      await Expense.destroy({
        where: {
          id: ExpenseId  
        }
      });
      res.status(200).json({ message: 'Expense deleted'});
    } catch (err) {
      res.status(500).json({error: err});
    }
  });

sequelize
.sync()
.then(result => {
    //console.log(result);
    app.listen(3000);
})
.catch(err => console.log(err));