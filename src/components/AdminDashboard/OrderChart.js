import React from "react";
import {
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
import "./OrderChart.css";

const data = [
  { date: "03-30", orders: 1, amount: 210 },
  { date: "03-31", orders: 0, amount: 0 },
  { date: "04-01", orders: 0, amount: 0 },
  { date: "04-02", orders: 1, amount: 560 },
  { date: "04-03", orders: 3, amount: 100 },
  { date: "04-04", orders: 0, amount: 0 },
  { date: "04-05", orders: 2, amount: 1200 },
  { date: "04-06", orders: 0, amount: 0 },
  { date: "04-07", orders: 1, amount: 850 },
  { date: "04-08", orders: 2, amount: 960 },
  { date: "04-09", orders: 0, amount: 0 },
  { date: "04-10", orders: 3, amount: 1300 },
  { date: "04-11", orders: 0, amount: 0 },
  { date: "04-12", orders: 2, amount: 1780 },
  { date: "04-13", orders: 1, amount: 400 },
  { date: "04-14", orders: 0, amount: 0 },
  { date: "04-15", orders: 3, amount: 1500 },
  { date: "04-16", orders: 1, amount: 250 },
  { date: "04-17", orders: 1, amount: 0 },
  { date: "04-18", orders: 2, amount: 750 },
  { date: "04-19", orders: 1, amount: 350 },
  { date: "04-20", orders: 0, amount: 0 },
  { date: "04-21", orders: 3, amount: 980 },
  { date: "04-22", orders: 1, amount: 600 },
  { date: "04-23", orders: 0, amount: 0 },
  { date: "04-24", orders: 2, amount: 1400 },
  { date: "04-25", orders: 0, amount: 0 },
  { date: "04-26", orders: 1, amount: 100 },
  { date: "04-27", orders: 0, amount: 0 },
  { date: "04-28", orders: 2, amount: 890 },
];

const OrderChart = () => {
  return (
    <div className="order-chart-container">
  <h2 className="chart-title"> Monthly Sales Overview (30 Days)</h2>
  <div className="chart-scroll-wrapper">
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="4 4" stroke="#ccc" />
        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke="#00A8E8"
          label={{
            value: "Orders",
            angle: -90,
            position: "insideLeft",
            style: { fill: "#444", fontSize: 12 },
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#FF7F50"
          label={{
            value: "Amount (Bit)",
            angle: -90,
            position: "insideRight",
            style: { fill: "#444", fontSize: 12 },
          }}
        />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar
          yAxisId="left"
          dataKey="orders"
          fill="#FFC000"
          radius={[6, 6, 0, 0]}
          barSize={8}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="amount"
          stroke="#FF4500"
          strokeWidth={2}
          dot={{ r: 2 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
</div>

    // <div className="order-chart-container">
    //   <h2 className="chart-title"> Monthly Sales Overview (30 Days)</h2>
    //   <ResponsiveContainer>
    //     <ComposedChart data={data}>
    //       <CartesianGrid strokeDasharray="4 4" stroke="#ccc" />
    //       <XAxis dataKey="date"   tick={{ fontSize: 10,  }} />
    //       <YAxis
    //         yAxisId="left"
    //         orientation="left"
    //         stroke="#00A8E8"
    //         label={{
    //           value: "Orders",
    //           angle: -90,
    //           position: "insideLeft",
    //           style: { fill: "#444", fontSize: 12 },
    //         }}
    //       />
    //       <YAxis
    //         yAxisId="right"
    //         orientation="right"
    //         stroke="#FF7F50"
    //         label={{
    //           value: "Amount (Bit)",
    //           angle: -90,
    //           position: "insideRight",
    //           style: { fill: "#444", fontSize: 12 },
    //         }}
    //       />
    //       <Tooltip />
    //       <Legend verticalAlign="top" height={36} />
    //       <Bar
    //         yAxisId="left"
    //         dataKey="orders"
    //         fill="#FFC000"
    //         radius={[6, 6, 0, 0]}
    //         barSize={8}
    //       />
    //       <Line
    //         yAxisId="right"
    //         type="monotone"
    //         dataKey="amount"
    //         stroke="#FF4500"
    //         strokeWidth={2}
    //         dot={{ r: 2 }}
    //       />
    //     </ComposedChart>
    //   </ResponsiveContainer>
    // </div>
  );
};

export default OrderChart;
