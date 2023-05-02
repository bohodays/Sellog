import React from "react";
import { SSection } from "./styles";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.defaults.backgroundColor = "#fafdff";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const data = {
  labels: ["github", "blog", "algorithm", "feed", "csquiz"],
  datasets: [
    {
      label: "목표 달성 정도",
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 13,
        },
      },
    },
  },
  scales: {
    r: {
      // 단계별 숫자 표시 빼기
      ticks: {
        display: false,
      },
      // 데이터 포인트 라벨 폰트 사이즈
      pointLabels: { font: { size: 15 } },
    },
  },
};
const Chart = () => {
  return (
    <SSection>
      <Radar data={data} options={options} />
    </SSection>
  );
};

export default Chart;
