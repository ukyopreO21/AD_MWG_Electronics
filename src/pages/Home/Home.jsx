import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useOrders } from "../../hooks/useOrders";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function RevenueChart() {
  const { orders, getOrdersByQuery } = useOrders();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    getOrdersByQuery("Đã thanh toán", 1); 
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      buildChartData();
    }
  }, [orders]);

 const buildChartData = () => {
  const revenueByMonth = Array(12).fill(0); // 12 tháng, mặc định 0

  const currentYear = new Date().getFullYear();

  orders.forEach(order => {
    const date = new Date(order.createdAt);
    console.log("order.createdAt", order.createdAt);
    const orderYear = date.getFullYear();
    const orderMonth = date.getMonth(); // 0 = Jan, 11 = Dec

    if (orderYear === currentYear) {
      revenueByMonth[orderMonth] += order.total_price;
    }
  });

  const labels = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
    'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
    'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  setChartData({
    labels,
    datasets: [
      {
        label: `Doanh thu năm ${currentYear}`,
        data: revenueByMonth,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderRadius: 4,
      },
    ],
  });
};


  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>Thống kê doanh thu hàng tháng</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: 'top' },
            tooltip: { callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.raw.toLocaleString('vi-VN')} VND`
            }}
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: value => value.toLocaleString('vi-VN') + '₫'
              }
            }
          }
        }}
      />
    </div>
  );
}
