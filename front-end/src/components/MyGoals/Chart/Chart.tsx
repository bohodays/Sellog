import { useEffect, useState } from "react";
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
import { apiGetChartList } from "@/api/record";

ChartJS.defaults.backgroundColor = "#fafdff";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Chart = () => {
  const [chartList, setChartList] = useState(null);
  const [chartLabel, setChartLabel] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any>([]);

  const maxValue = Number(Math.max(...chartData) + 4);

  const data = {
    labels: chartLabel,
    datasets: [
      {
        label: "TOTAL 기록 횟수",
        data: chartData,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options: any = {
    // maintainAspectRatio: true,
    // responsive: true,

    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 12,
            family: "GmarketSansMedium",
          },
          // TOTAL 기록 횟수 라벨 색깔
          // color: "black",
        },
      },
      tooltip: {
        padding: 8, // 패딩 크기
        // titleFont: { size: 12, weight: "500" },
        // bodyFont: { size: 13 },
        bodyFont: {
          size: 13,
          family: "GmarketSansMedium", // Add your font here to change the font of your tooltip body
        },
        titleFont: {
          size: 12,
          weight: "500",
          family: "GmarketSansMedium", // Add your font here to change the font of your tooltip title
        },
      },
    },

    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: maxValue,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          display: false,
        },
        pointLabels: {
          font: {
            size: 15,
            weight: "500",
            family: "GmarketSansMedium",
          },
          color: "black",
        },
        angleLines: { lineWidth: 1, color: "lightgrey" },
        grid: {
          color: "lightgrey", // 눈금 색상 변경
          lineWidth: 1, // 눈금 두께 변경
        },
      },
    },
  };

  useEffect(() => {
    apiGetChartList()
      .then((r) => {
        setChartList(r?.data.response);
        const labels = Object.keys(r?.data.response);
        const datas = Object.values(r?.data.response);
        setChartLabel(labels);
        setChartData(datas);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <SSection>{chartList && <Radar data={data} options={options} />}</SSection>
  );
};

export default Chart;
