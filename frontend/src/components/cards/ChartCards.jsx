import React from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
};

const ChartCard = ({ title, data, type }) => {
  const ChartComponent = type === 'bar' ? Bar : type === 'line' ? Line : Doughnut;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/2 lg:w-1/4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="mb-4">
        <ChartComponent data={data} options={chartOptions} />
      </div>
    </div>
  );
};

export default ChartCard;
