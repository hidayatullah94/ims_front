import React, { useMemo, useState } from "react";
import { useHistoriBarang } from "../../api/masters";
import { Loadings, MonthRange } from "../mayor";
import { Roles, URLimg } from "../../lib";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import moment from "moment";
export const CardDetailBarang = ({ id }) => {
  const [date, setDate] = useState(new Date());
  const [detail, setDetail] = useState(null);

  const { data, isLoading } = useHistoriBarang({
    id,
    tanggal: date,
  });

  if (isLoading) return <Loadings />;
  return (
    <div className="relative text-slate-600 pb-10">
      <div className="bg-white rounded-lg">
        <h2 className="font-bold mb-3 text-center">
          Histori Barang - {data?.barang?.nama}
        </h2>

        <div className="absolute -top-3 right-0 text-xs font-medium">
          <MonthRange selected={date} change={(value) => setDate(value)} />
        </div>

        <table className="w-full text-sm border rounded border-slate-300 shadow">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-2 text-left">Tanggal</th>
              <th className="p-2 text-center">Jenis</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data?.histori?.length > 0 ? (
              data.histori.map((item, index) => (
                <tr
                  key={`${item.tipe}-${index}`}
                  className="border-t even:bg-gray-50 border-slate-300"
                >
                  <td className="p-2">
                    {moment(item.tanggal).format("DD MMM YYYY HH:mm")}
                  </td>

                  <td className="text-center">
                    <span
                      className={`font-bold ${
                        item.tipe === "PEMASUKAN"
                          ? "text-green-600"
                          : item.tipe === "PERMINTAAN"
                            ? "text-cyan-500"
                            : item.tipe === "PENGIRIMAN"
                              ? "text-red-600"
                              : "text-amber-600"
                      }`}
                    >
                      {item.tipe}
                    </span>
                  </td>

                  <td className="text-center font-bold">{item.qty}</td>

                  <td className="text-center">
                    {item.tipe === "PEMAKAIAN" ? (
                      <button
                        className="px-2 py-1 text-xs bg-cyan-200 hover:bg-cyan-500 rounded text-cyan-700 font-medium cursor-pointer"
                        onClick={() => setDetail(item)}
                      >
                        Detail
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-4 text-rose-500 font-semibold"
                >
                  Maf Barang Tidak memiliki histori !
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog
        open={!!detail}
        onClose={() => setDetail(null)}
        className="relative z-50 "
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="space-y-4 rounded-lg bg-white p-6 shadow-lg w-full max-w-xl h-auto max-h-lvh overflow-y-auto">
            <DialogTitle className="font-bold">
              Detail Pemakaian Barang
            </DialogTitle>
            {detail && (
              <div className="space-y-4">
                <div className="flex gap-4 text-sm">
                  <div className="w-40 font-medium ">
                    <p>Tanggal</p>
                    <p>Qty</p>
                    <p>Keterangan</p>
                    <p>Pembuat</p>
                    <p>Bukti Pemakaian</p>
                  </div>
                  <div className=" w-full">
                    <p>
                      : {moment(detail.tanggal).format("DD MMMM YYYY HH:mm")}
                    </p>
                    <p>: {detail.qty}</p>
                    <p className="capitalize">: {detail.keterangan || "-"}</p>
                    <p>: {detail.user && <span>{detail.user.nama}</span>}</p>
                  </div>
                </div>
                {detail.bukti === null ? (
                  <div className="p-4 bg-yellow-100 rounded text-yellow-700 font-medium">
                    Tidak ada bukti pemakaian yang diunggah.
                  </div>
                ) : (
                  <img
                    src={`${URLimg}${detail.bukti}`}
                    alt="Bukti Pemakaian"
                    className="w-full rounded-lg border object-cover shadow-md border-slate-300"
                  />
                )}
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};
