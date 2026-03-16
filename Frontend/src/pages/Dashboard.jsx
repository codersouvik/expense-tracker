import Navbar from '../component/Navbar'
import { useState, useEffect } from 'react';
import ExpenseForm from '../component/Expenseform';
import ExpenseList from '../component/ExpenseList';
import ExpenseSummary from "../component/ExpenseSummary";
import Api from '../api/axios'
import BudgetCard from '../component/BudgetCard'
import MonthlyChart from '../component/MonthlyChart'
const Dashboard = () => {
  const [darkmode, Setdarkmode] = useState(false)
  const [expenses, Setexpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    categoryBreakdown: []
  });
  const [filters, Setfilters] = useState({
    category: "",
    search: "",
    startDate: "",
    endDate: ""
  })



  const fetchExpenses = async (page = 1) => {
    try {
      const { data } = await Api.get(
        `/expense?page=${page}&search=${filters.search}&category=${filters.category}&startDate=${filters.startDate}&endDate=${filters.endDate}`
      );

      Setexpenses(data.expenses);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);

      const summaryRes = await Api.get("/expense/summary");
      setSummary(summaryRes.data);

    } catch (error) {
      console.log("Error fetching data");
    }
  };

  const fetchMonthlyData = async () => {
  try {
    const { data } = await Api.get("/expense/monthly");
    setMonthlyData(data);
  } catch (error) {
    console.log("Error fetching monthly data");
  }
};

  useEffect(() => {

    fetchMonthlyData();    
    fetchExpenses(currentPage);
  }, [currentPage, filters]);

  return (
    <>
      <div className={darkmode ? "dark" : "light"}>
        <Navbar darkmode={darkmode} Setdarkmode={Setdarkmode} />
        <div className="dashboard">
          <h2>Your Expenses</h2>
          <BudgetCard expenses={expenses} />
          
          <ExpenseSummary summary={summary} />
          <MonthlyChart data={monthlyData} />
          
          <ExpenseForm refreshExpenses={fetchExpenses} refreshMonthly={fetchMonthlyData} selectedExpense={selectedExpense}
            setSelectedExpense={setSelectedExpense} />
          <div className="filter">
            <div className="auth-card1">
              <input placeholder="Category" value={filters.category} onChange={(e) => Setfilters({ ...filters, category: e.target.value })} />
              <input placeholder="Search Title" value={filters.search} onChange={(e) => Setfilters({ ...filters, search: e.target.value })} />
              <input type="date" placeholder="Start Date" value={filters.startDate} onChange={(e) => Setfilters({ ...filters, startDate: e.target.value })} />
              <input type="date" placeholder="endDate" value={filters.endDate} onChange={(e) => Setfilters({ ...filters, endDate: e.target.value })} />
            </div>
          </div>
          <ExpenseList expenses={expenses} refreshExpenses={fetchExpenses} refreshMonthly={fetchMonthlyData} setSelectedExpense={setSelectedExpense} />
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Prev
            </button>

            <span>Page {currentPage} of {totalPages}</span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Dashboard;