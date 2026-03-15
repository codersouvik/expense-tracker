const  Expense = require("../models/Expense");
const User = require("../models/User")
exports.Createexpense = async (req,res)=>{
    try{
        const {title,amount,category,date,notes} = req.body;
        
        const expense = await Expense.create({
            user:req.user._id,
            title,
            amount,
            category,
            date,
            notes
            
        })
       res.status(201).json({message:"Expense Created Succesfully",expense})
    }
    catch(error)
    {
        
        res.status(500).json({message:"Server Error"});
    }
}

exports.getExpenses = async (req, res) => {
    
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

  const filter = { user: req.user._id };
  
    if(req.query.category)
    {
        filter.category = req.query.category
    }
    if(req.query.search)
    {
        filter.title ={
            $regex:req.query.search,
            $options: "i"
        }
    }

    if(req.query.startDate && req.query.endDate)
    {
        filter.date = {
            $gte:new Date(req.query.startDate),
            $lte: new Date(req.query.endDate)
        }
    }

    const total = await Expense.countDocuments(filter);

    const expenses = await Expense.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
  expenses,
  totalPages: Math.ceil(total / limit),
  currentPage: page
});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async(req,res)=>{
    try{
         const expense = await Expense.findById(req.params.id);

         if(!expense){
            
            return res.status(404).json({message:"Expense not found"});
         }
         if(expense.user.toString() !== req.user._id.toString()){
            return res.status(401).json({message:"Not Authorized"})
         }

         await expense.deleteOne();

         res.json({message :"Expense Deleted"})
    }
    catch(error)
    { 
          console.log(error)
        res.status(500).json({message:"Server Error"})
    }
}


exports.updateExpense = async(req,res)=>{
    try{
       const expense = await Expense.findById(req.params.id);
       if(!expense){
        return res.status(404).json({message:"Expense not found"})
       }
       if(expense.user.toString() !== req.user._id.toString())
       {
        return res.status(401).json({message:"Not Authorized"})
       }

       const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
       )
       res.json(updatedExpense)
    }
    catch(error)
    { 
        
        res.status(500).json({message:"Server Error"})
    }
}

exports.getExpenseSummary = async(req,res)=>{
    try{
       const summary = await Expense.aggregate([
        {
               $match:{user:req.user._id}
        },
        {
              $group:{
                _id:"$category",
                totalAmount:{$sum:"$amount"}
              }
        }
       ])

       const total = await Expense.aggregate([
         {
            $match:{user:req.user._id}
         },
         { 
                $group:{
                _id:null,
                totalExpense:{$sum:"$amount"}
              }
         }
       ]);

       res.json({total:total[0]?.totalExpense || 0, categoryBreakdown: summary})
    }
    catch(error)
    { 
         console.log(error)
        res.status(500).json({message:"Server Error"})
    }
}

exports.getMonthlyExpense = async (req, res) => {
  try {

    const monthly = await Expense.aggregate([
      {
        $match: { user: req.user._id }
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    res.json(monthly);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};