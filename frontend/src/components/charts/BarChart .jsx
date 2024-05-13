import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  return (
    <Bar
      data={{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Rainy Days',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      }}
      options={{
        plugins: {
          legend: {
            display: false // Hide legend
          }
        },
        scales: {
          x: {
            grid: {
              display: false // Hide x-axis grid lines
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)' // Customize y-axis grid color
            }
          }
        },
        responsive: true, // Make chart responsive
        maintainAspectRatio: false // Allow chart to resize freely
      }}
    />
  );
};

export default BarChart;
