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
import "./YearlyOrderChart.css";

// Custom 3D Bar Shape
const Custom3DBar = (props) => {
  const { x, y, width, height, fill } = props;

  const sideColor = "#FFC000"; // Right shade
  const topColor = "#f2c231";  // Top highlight

  return (
    <g>
      {/* Front face */}
      <rect x={x} y={y} width={width} height={height} fill={fill} />

      {/* Top face */}
      <polygon
        points={`${x},${y} ${x + 10},${y - 10} ${x + width + 10},${y - 10} ${x + width},${y}`}
        fill={topColor}
      />

      {/* Side face */}
      <polygon
        points={`${x + width},${y} ${x + width + 10},${y - 10} ${x + width + 10},${y + height - 10} ${x + width},${y + height}`}
        fill={sideColor}
      />
    </g>
  );
};

const data = [
  { month: "2024-04", amount: 200 },
  { month: "2024-05", amount: 0 },
  { month: "2024-06", amount: 0 },
  { month: "2024-07", amount: 0 },
  { month: "2024-08", amount: 0 },
  { month: "2024-09", amount: 0 },
  { month: "2024-10", amount: 0 },
  { month: "2024-11", amount: 0 },
  { month: "2024-12", amount: 0 },
  { month: "2025-01", amount: 0 },
  { month: "2025-02", amount: 210 },
  { month: "2025-03", amount: 3260 },
];

const YearlyOrderChart = () => {
  return (
    <div className="yearly-chart-container">
      <h2 className="chart-heading">Order in Year</h2>
      <h3 className="chart-subheading">Statistics for 12 Months</h3>
      <p className="chart-description">
        This chart compares total order amount across months, in Bit units.
      </p>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{
              value: "Total amount (Bit)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "#555", fontSize: 12 },
            }}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="amount"
            barSize={40}
            fill="#f2cc5a"
            radius={[0, 0, 0, 0]}
            shape={<Custom3DBar />}
            label={{ fill: "#000", fontSize: 10, position: "top" }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#D9534F"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearlyOrderChart;
