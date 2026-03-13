import React from "react";
import { Kop } from "../../assets";
import { classNames, format } from "../../action";
import { Theads } from "../tabel";

export const CardJasa = ({
  judul,
  cabang,
  status,
  detail,
  keterangan,
  kode,
  tanggal,
}) => {
  return (
    <div>
      <div className="relative p-5 border border-slate-300 rounded shadow overflow-hidden">
        <p
          className={classNames(
            status === "PENDING"
              ? "text-orange-500"
              : status === "APPROVED"
                ? "text-emerald-500"
                : "text-rose-700",
            "absolute top-14 right-0 z-10 bg-white rotate-45 font-bold  border-dashed border-4 w-36 text-center h-8",
          )}
        >
          {status}
        </p>
        <div className="">
          <div className="flex justify-center gap-2">
            <img src={Kop} alt="" className="w-72" />
          </div>
          <div className="mx-auto text-center mt-2">
            <span className="pb-2 border-b-2 border-slate-700 capitalize text-center font-semibold text-xl">
              Permintaan Jasa
            </span>
            <p className="text-rose-800 font-semibold text-center mt-2">
              {kode}
            </p>
          </div>

          <div className="flex gap-6 text-sm capitalize mt-5">
            <div className="">
              <p>Prihal</p>
              <p>Cabang</p>
              <p>Tanggal</p>
              <p>Keterangan</p>
            </div>
            <div className="">
              <p> : {judul}</p>
              <p> : {cabang}</p>
              <p> : {tanggal}</p>
              <p> : {keterangan === null ? "--" : keterangan}</p>
            </div>
          </div>
          {detail && detail.length ? (
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-3">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-md">
                  <table className="relative min-w-full divide-y divide-gray-300">
                    <Theads
                      th1={"No"}
                      th2={"Jasa"}
                      th3={"Qty"}
                      th4={"Satuan"}
                      th5={"Harga"}
                      th6={"Total"}
                      th7={"status"}
                      th8={"keterangan"}
                      size="md"
                    />

                    <tbody className="divide-y divide-gray-200 bg-white">
                      {detail.map((e, idx) => (
                        <tr key={e.id}>
                          <td className="py-4 pr-3 pl-4 text-xs font-medium whitespace-nowrap text-gray-700 sm:pl-6 ">
                            {idx + 1}
                          </td>
                          <td className="px-3 py-4 text-xs whitespace-nowrap text-gray-500 capitalize">
                            {e.pekerjaan}
                          </td>
                          <td className="px-3 py-4 text-xs whitespace-nowrap text-gray-500">
                            {e.qty}
                          </td>
                          <td className="px-3 py-4 text-xs whitespace-nowrap text-gray-500">
                            {e.satuan}
                          </td>

                          <td className="px-3 py-4 text-xs whitespace-nowrap text-gray-500">
                            {format(e.harga)}
                          </td>
                          <td className="px-3 py-4 text-xs whitespace-nowrap text-rose-700 font-semibold">
                            {format(Number(e.harga * e.qty))}
                          </td>
                          <td
                            className={classNames(
                              e.status
                                ? "text-emerald-600 font-semibold"
                                : "text-rose-700 font-semibold",
                              "px-3 py-4 text-xs whitespace-nowrap text-gray-500",
                            )}
                          >
                            {status === "PENDING"
                              ? "Diperiksa"
                              : e.status
                                ? "Disetujui"
                                : "Ditolak"}
                          </td>
                          <td className="px-3 py-4 text-xs whitespace-nowrap text-gray-500">
                            {e.keterangan === null ? "--" : e.keterangan}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xl text-center animate-pulse text-rose-800">
              Maaf tidak ada jasa yang diminta !!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
