import React from "react";
import { useLinePermintaan } from "../../api/permintaan";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
export const LineRequest = () => {
  const { data } = useLinePermintaan();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Permintaan Barang dan Jasa Tahun ${new Date().getFullYear()}`,
      },
    },
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const dataLine = {
    labels: labels,
    datasets: [
      {
        label: "Permintaan Barang",
        data: data && data.barang,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Permintaan Jasa",
        data: data && data.jasa,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="bg-white p-5 rounded shadow">
      <Line data={dataLine} options={options} />
    </div>
  );
};
