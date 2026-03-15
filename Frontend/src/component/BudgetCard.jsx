import {useState,useEffect} from 'react';
import Api from '../api/axios'
const BudgetCard =({expenses})=>{
    const [budget,Setbudget] = useState(0);
     const totalspent = expenses.reduce((acc,exp)=>acc+exp.amount,0);
    const remaining = budget>0? budget -totalspent:0;

    useEffect(()=>{
        const fetchBudget = async()=>{
        
             try{
                 const {data} = await Api.get('/auth/me');
                 Setbudget(data.monthlyBudget)
             }
             catch(error){
                console.log(error)
             }
        }
        fetchBudget();
    },[])

    const saveBudget = async()=>{
      try{
         await Api.put('/auth/budget',{
            monthlyBudget:budget
         })
      }
      catch(error)
      {
        console.log(error)
      }
    }
    if (!budget) {
  return (
    <div className="budget-empty">
      <h3>No monthly budget set</h3>
      <p>Set a budget to track your spending.</p>
<div className="top">
      <input
        type="number"
        placeholder="Enter monthly budget"
        value={budget}
        onChange={(e) => Setbudget(e.target.value)}
      />

      <button onClick={saveBudget}>Save Budget</button>
      </div>
    </div>
  );
}
    return (
        <div className="top">
        <h3>Monthy Budget Summary</h3>
        <p>Budget : ₹{budget}</p>
        <p>Spent : ₹{totalspent}</p>
        <p style={{color:remaining<0?"red":"green"}}>Remaining:{budget? `₹${remaining}`:"Set A Budget First"}</p>
        <div >
            <input placeholder ="Monthly Budget" type="number"  value={budget} onChange = {(e)=>Setbudget(e.target.value)}
            />
            <button onClick={saveBudget}>Save Budget</button>
        </div>
        </div>
    )
    
}
export default BudgetCard;