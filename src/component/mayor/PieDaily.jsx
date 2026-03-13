import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { usePieDay } from "../../api/permintaan";
import { Roles } from "../../lib";
import moment from "moment";

ChartJS.register(ArcElement, Tooltip, Legend);
export const PieDaily = () => {
  const { data } = usePieDay();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Laporan Transaksi Harian ${moment(new Date()).format("ll")}`,
      },
    },
  };

  const dataPie = {
    labels: ["Barang", "Jasa", "Kirim", "Masuk"],
    datasets: [
      {
        label: "Total Data",
        data: [
          data && data.barang,
          data && data.jasa,
          data && data.pengiriman,
          data && data.pemasukan,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataPieUsr = {
    labels: ["Barang", "Jasa", "Kirim"],
    datasets: [
      {
        label: "Total Data",
        data: [
          data && data.barang,
          data && data.jasa,
          data && data.pengiriman,
          data && data.pemasukan,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataList =
    (data && data.barang) ||
    (data && data.jasa) ||
    (data && data.pengiriman) ||
    (data && data.pemasukan);

  return (
    <div className="max-w-md  bg-white p-3 rounded shadow w-full border border-slate-200 ">
      {dataList === 0 ? (
        <p className="font-semibold text-rose-700 text-center leading-80 animate-pulse text-lg">
          Maaf belum ada data transaksi yang masuk !
        </p>
      ) : (
        <Pie
          data={Roles === "ADMIN" ? dataPie : dataPieUsr}
          options={options}
        />
      )}
    </div>
  );
};
