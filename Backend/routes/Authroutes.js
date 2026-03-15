const express = require('express');

const { registerUser,Loginuser,ForgotPassword,ResetPassword,updateBudget,Getme} = require('../controllers/authcontroller');
const protect =require("../middleware/authmiddleware")
const router = express.Router();

router.post('/register',registerUser)
router.post('/login',Loginuser)
router.post('/forgot-password',ForgotPassword)
router.put('/reset-password/:token',ResetPassword)
router.put('/budget',protect,updateBudget)
router.get('/me',protect,Getme)
module.exports = router;