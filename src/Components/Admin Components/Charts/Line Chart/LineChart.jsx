import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement ,
  Title,Tooltip,Legend,Filler
 } from 'chart.js';
import './lineChart.css';

// Register the required chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,

);

const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.4,  // Adds a slight curve to the lines
        fill : true
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,  // Hide vertical grid lines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [10, 5],// Dashed grid lines
        },
      },
    },
  };

  return (
    <div className="line-chart-container shadow">
      <Line data={data} options={options} className='w-100' />
    </div>
  );
};

export default LineChart;
