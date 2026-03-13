import React from "react";
import { usePolarMonth } from "../../api/permintaan";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { Roles } from "../../lib";
import moment from "moment/moment";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
export const PolarMonth = () => {
  const { data } = usePolarMonth();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Laporan Transaksi Bulan ${moment(new Date()).format("MM - Y")}`,
      },
    },
  };
  const dataPolar = {
    labels: ["Barang", "Jasa", "Masuk", "Kirim"],
    datasets: [
      {
        label: "Total data",
        data: [
          data && data.barang,
          data && data.jasa,
          data && data.pemasukan,
          data && data.pengiriman,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 99, 132, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataPolarUsr = {
    labels: ["Barang", "Jasa", "Kirim"],
    datasets: [
      {
        label: "Total data",
        data: [data && data.barang, data && data.jasa, data && data.pengiriman],
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(255, 99, 132, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="max-w-md  bg-white p-3 rounded shadow w-full border border-slate-200 ">
      <PolarArea
        data={Roles === "ADMIN" ? dataPolar : dataPolarUsr}
        options={options}
      />
    </div>
  );
};
