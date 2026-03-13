import React, { useMemo } from "react";
import { useHistoriBarang } from "../../api/masters";
import { Loadings } from "../mayor";
import { Roles } from "../../lib";

export const CardDetailBarang = ({ id }) => {
  const { data, isLoading } = useHistoriBarang({
    id: id,
    tanggal: new Date("2026-03-12"),
  });

  const history = useMemo(() => {
    if (!data) return [];

    const map = {};

    const pushData = (items = [], type) => {
      items.forEach((item) => {
        const date = new Date(item.createdAt).getDate();

        if (!map[date]) {
          map[date] = {
            tanggal: date,
            pemasukan: 0,
            pengiriman: 0,
            permintaan: 0,
          };
        }

        map[date][type] += item.qty;
      });
    };

    pushData(data.pemasukan || [], "pemasukan");
    pushData(data.pengiriman || [], "pengiriman");
    pushData(data.permintaan || [], "permintaan");

    // ambil total hari dalam bulan
    const today = new Date();
    const totalDays = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    ).getDate();

    // generate tanggal 1 - akhir bulan
    const result = [];

    for (let i = 1; i <= totalDays; i++) {
      result.push({
        tanggal: i,
        pemasukan: map[i]?.pemasukan || 0,
        pengiriman: map[i]?.pengiriman || 0,
        permintaan: map[i]?.permintaan || 0,
      });
    }

    return result;
  }, [data]);

  if (isLoading) return <Loadings />;
  return (
    <div className="relative text-slate-600 pb-10">
      <div className="bg-white rounded-lg ">
        <h2 className="font-bold mb-3 text-center ">
          Histori Barang - {data?.nama}
        </h2>

        <table className="w-full text-sm border rounded border-slate-300 shadow ">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-2 text-left">Tanggal</th>
              {Roles === "ADMIN" && (
                <th className="p-2 text-center">Pemasukan</th>
              )}
              <th className="p-2 text-center">Pengiriman</th>
              <th className="p-2 text-center">Permintaan</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr
                key={item.tanggal}
                className="border-t even:bg-gray-50 border-slate-300 "
              >
                <td className="p-2 font-medium">{item.tanggal}</td>
                {Roles === "ADMIN" && (
                  <td className="text-center text-green-600 font-bold ">
                    {item.pemasukan || "-"}
                  </td>
                )}

                <td className="text-center text-red-600 font-bold">
                  {item.pengiriman || "-"}
                </td>

                <td className="text-center text-cyan-500 font-bold">
                  {item.permintaan || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
