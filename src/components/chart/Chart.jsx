import React from 'react'
import "./chart.scss"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Card from '../card/Card';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const Chart = () => {

  const orders = useSelector((state)=> state.order.orderHistory)
  
  const array = []
  orders.map((item)=>{
    const { orderStatus } = item
    return(
      array.push(orderStatus)
    )
  })
  
  const getOrderCount = (arr, value)=>{
    return arr.filter((n)=> n === value).length
  }



  const placed = getOrderCount(array, "Order Placed...")
  const processing = getOrderCount(array, "Processing...")
  const shipped = getOrderCount(array, "Shipped...")
  const delivered = getOrderCount(array, "Delivered")

  const data = {
    labels:["Order Placed", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: 'Order count',
        data: [placed, processing, shipped, delivered],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <div className='charts'>
      <Card className={"card"}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  )
}

export default Chart