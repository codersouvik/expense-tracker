import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

// REGISTER CHART COMPONENTS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyChart = ({ data }) => {

  const chartData = {
    labels: data.map(item => `Month ${item._id}`),
    datasets: [
      {
        label: "Monthly Spending",
        data: data.map(item => item.total),
        backgroundColor: "#3b82f6"
      }
    ]
  };

  return <Bar data={chartData} />;
};

export default MonthlyChart;