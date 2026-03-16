import API from "../api/axios";

const ExpenseList = ({ expenses, refreshExpenses,refreshMonthly ,setSelectedExpense}) => {

   console.log("Expenses:", expenses);
  const handleEdit = (expense) => {
  setSelectedExpense(expense);
};
  const handleDelete = async (id) => {
    try {
      await API.delete(`/expense/${id}`);
      refreshExpenses();
      refreshMonthly();
    } catch (error) {
      alert("Delete failed");
    }
  };
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <h3>No expenses yet</h3>
        <p>Add your first expense to start tracking your spending.</p>
      </div>
    );
  }


  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => (
          <tr key={exp._id}>
            <td>{exp.title}</td>
            <td>₹ {exp.amount}</td>
            <td>{exp.category}</td>
            <td>{new Date(exp.date).toLocaleDateString()}</td>
            <td>
              <button onClick={() => handleEdit(exp)}>Edit</button>
              <button onClick={() => handleDelete(exp._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;