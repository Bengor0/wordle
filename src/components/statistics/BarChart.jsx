import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./BarChart.css";

const BarChartContext = createContext({
  data: [10, 2, 5, 13, 5],
  categories: [],
});

function BarChart({ children, data, categories }) {
  return (
    <BarChartContext value={{ data, categories }}>
      <div className="bar-chart flex-center">
        <div className="chart">{children}</div>
      </div>
    </BarChartContext>
  );
}

function BarChartGraph({ axis = "show", layout = "horizontal" }) {
  const { data, categories } = useContext(BarChartContext);

  return (
    <div className="graph">
      {data.map((value, i) => (
        <div
          className={`bar b-${i + 1}`}
          key={i}
          style={{
            width: `${value !== 0 ? (value / Math.max(...data)) * 100 : 2}%`,
            height: "100%",
          }}
        >
          <span className={`category`}>
            {categories.length === data.length
              ? categories[i]
              : `category ${i + 1}`}
          </span>
          <span className={`value v-${i + 1}`}>{value ? value : ""}</span>
        </div>
      ))}
    </div>
  );
}

function BarChartHeader({ children }) {
  return (
    <div className="header">
      <h2>{children}</h2>
    </div>
  );
}

BarChart.Header = BarChartHeader;
BarChart.Graph = BarChartGraph;

export default BarChart;
