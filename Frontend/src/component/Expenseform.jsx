import { useState,useEffect } from "react";
import API from "../api/axios";

const ExpenseForm = ({ refreshExpenses, selectedExpense, setSelectedExpense }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
  if (selectedExpense) {
    setForm({
      title: selectedExpense.title,
      amount: selectedExpense.amount,
      category: selectedExpense.category,
      date: selectedExpense.date.split("T")[0],
      notes: selectedExpense.notes || ""
    });
  }
}, [selectedExpense]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (selectedExpense) {
      await API.put(`/expense/${selectedExpense._id}`, form);
      setSelectedExpense(null);
    } else {
      await API.post("/expense", form);
    }

    setForm({
      title: "",
      amount: "",
      category: "",
      date: "",
      notes: ""
    });

    refreshExpenses();
  } catch (error) {
    alert("Error saving expense");
  }
};

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="auth-card1">
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
       <button type="submit">
  {selectedExpense ? "Update Expense" : "Add Expense"}
</button>
</div>
    </form>
  );
};

export default ExpenseForm;