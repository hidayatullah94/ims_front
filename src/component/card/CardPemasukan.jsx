import React from "react";
import { Kop } from "../../assets";
import { format } from "../../action";

export const CardPemasukan = ({
  order,
  judul,
  no_inv,
  no_permintaan,
  detail,
  tanggal,
}) => {
  return (
    <div>
      {" "}
      <div className="relative p-5 border border-slate-300 rounded shadow overflow-hidden">
        <div className="flex justify-center gap-2">
          <img src={Kop} alt="" className="w-72" />
        </div>
        <div className="text-center">
          <span className="pb-2 border-b-2 border-slate-700 capitalize text-center font-semibold text-xl px-5">
            Barang Masuk
          </span>
          <p className="text-rose-800 font-semibold text-center mt-2">
            {order}
          </p>
        </div>

        <div className="flex gap-6 text-sm capitalize">
          <div className="">
            <p>Judul</p>
            <p>No Tanda Terima</p>
            <p>Kode Permintaan</p>
            <p>Tanggal</p>
          </div>
          <div className="">
            <p> : {judul}</p>
            <p> : {no_inv}</p>
            <p> : {no_permintaan}</p>
            <p> : {tanggal}</p>
          </div>
        </div>
        {detail && detail.length ? (
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-3">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-md">
                <table className="relative min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pr-3 pl-4 text-left text-xs font-semibold text-gray-800 sm:pl-6"
                      >
                        Barang
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-xs font-semibold text-gray-800"
                      >
                        Qty
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-xs font-semibold text-gray-800"
                      >
                        Harga
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-xs font-semibold text-gray-800"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {detail.map((e) => (
                      <tr key={e.id}>
                        <td className="py-4 pr-3 pl-4 text-xs font-medium whitespace-nowrap text-gray-700 sm:pl-6">
                          {e.barang["nama"]} / {e.barang["barcode"]}
                        </td>
                        <td className="px-3 py-4 text-xs whitespace-nowrap text-gray-500">
                          {e.qty}
                        </td>

                        <td className="px-3 py-4 text-xs whitespace-nowrap text-gray-500">
                          {format(e.harga)}
                        </td>
                        <td className="px-3 py-4 text-xs whitespace-nowrap text-rose-700 font-semibold">
                          {format(Number(e.harga * e.qty))}
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
            Maaf tidak ada barang yang diminta !!
          </p>
        )}
      </div>
    </div>
  );
};
