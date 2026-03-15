const express = require("express");

const {Createexpense,getExpenses,deleteExpense,updateExpense,getExpenseSummary,getMonthlyExpense} = require("../controllers/expensecontroller")


const protect = require("../middleware/authmiddleware")
const router = express.Router();


router.post('/',protect,Createexpense);
router.get('/',protect,getExpenses)
router.get('/summary',protect,getExpenseSummary)
router.get('/monthly',protect,getMonthlyExpense)
router.put('/:id',protect,updateExpense)
router.delete('/:id',protect,deleteExpense);

module.exports = router;        