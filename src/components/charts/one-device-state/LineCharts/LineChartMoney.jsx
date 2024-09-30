// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartMoney = ({chartColor,chartLabel}) => {
  // Define data for the line chart
  const data = {
    labels: ['20.09', '21.09', '22.09', '23.09', '24.09', '25.09','20.09', '21.09', '22.09', '23.09', '24.09', '25.09'],
    datasets: [
      {
        label: chartLabel,
        data: [15, 25, 25, 25, 25, 40,15, 25, 25, 25, 25, 47],
        fill: false,
        borderColor: chartColor,
        tension: 0.8,
      },
    ],
  };

  // Define options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Дохідність за місяць',

      },
    },
  };

  return <Line  width={1400} height={'200px'}  data={data} options={options} />;
};

export default LineChartMoney;
