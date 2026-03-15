import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed"];

const ExpenseSummary = ({ summary }) => {
  return (
    <div className="summary-container">
      <div className="total-card">
        <h3>Total Expenses</h3>
        <h2>₹ {summary.total}</h2>
      </div>

      <div className="chart-card">
        <h3>Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={summary.categoryBreakdown}
              dataKey="totalAmount"
              nameKey="_id"
              outerRadius={100}
              label
              isAnimationActive={true}
              animationDuration={500}
            >
              {summary.categoryBreakdown.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseSummary;