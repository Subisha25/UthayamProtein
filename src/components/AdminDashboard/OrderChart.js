import React from "react";
import {
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";
import "./OrderChart.css"; // Import CSS file

const data = [
  { date: "03-30", orders: 1, amount: 210 },
  { date: "03-31", orders: 0, amount: 0 },
  { date: "04-01", orders: 0, amount: 0 },
  { date: "04-02", orders: 1, amount: 560 },
  { date: "04-03", orders: 3, amount: 0 },
  { date: "04-04", orders: 0, amount: 0 },
  { date: "04-12", orders: 2, amount: 1780 },
  { date: "04-16", orders: 1, amount: 250 },
  { date: "04-17", orders: 1, amount: 0 },
];

const OrderChart = () => {
  return (
    <div className="order-chart-container">
      <h2 className="chart-title">📈 Statistics for 30 Days</h2>
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#8884d8"
            label={{
              value: "Total Orders",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#555", fontSize: 12 },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#ff7300"
            label={{
              value: "Total Amount (Bit)",
              angle: -90,
              position: "insideRight",
              style: { fill: "#555", fontSize: 12 },
            }}
          />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar yAxisId="left" dataKey="orders" fill="#6A5ACD" radius={[4, 4, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="amount" stroke="#FF4500" strokeWidth={2} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderChart;
