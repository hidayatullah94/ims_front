import React, { useRef } from "react";
import { URLimg } from "../../lib";
import { useReactToPrint } from "react-to-print";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { Kop, signature } from "../../assets";
import { format } from "../../action";
export const CardMemoJasa = ({
  nomor,
  cabang,
  tanggal,
  judul,
  detail,
  pekerjaan,
  ttd,
  nama,
  kode,
  ruas,
}) => {
  const detailPengadaan = detail.filter((e) => e.status === true);
  const contentRef = useRef(null);

  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef,
  });
  return (
    <div className="relative ">
      <button
        onClick={reactToPrintFn}
        className="bg-rose-800 text-rose-100 px-5 rounded shadow hover:bg-rose-600 cursor-pointer flex gap-1 py-1"
      >
        <PrinterIcon className="w-5" />
        Print
      </button>
      <div ref={contentRef} className=" px-20">
        <div className="py-10 ">
          <div className=" text-center">
            <img src={Kop} alt="" className="w-72 mx-auto mb-2" />
            <span className="font-bold text-xl pb-1 border-b-2 ">
              MEMORANDUM INTERNAL
            </span>
            <p className="mt-8 ">{nomor}</p>
          </div>
          <div className="flex gap-6 my-8">
            <div className="">
              <p>Kepada Yth</p>
              <p>Dari</p>
              <p>Tanggal</p>
              <p>Prihal</p>
            </div>
            <div className="">
              <p>: Divisi IT</p>
              <p>: {cabang}</p>
              <p>: {tanggal}</p>
              <p>: {judul}</p>
            </div>
          </div>
          <p>Dengan Hormat</p>
          <p className="mt-5 mb-4">
            Sehubungan dengan adanya pekerjaan {pekerjaan} dengan nomor
            <span className="ms-1">{kode}</span> Pada Ruas Tol {ruas} Tahun{" "}
            {new Date().getFullYear()}, maka bersama ini kami sampaikan
            permohonan {judul} guna mendukung penyelesaian pekerjaan tersebut,
            adapun rinciannya sebagai berikut ;
          </p>
          {detailPengadaan.length ? (
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm  sm:rounded">
                  <table className="relative min-w-full divide-y divide-gray-400">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 border border-gray-400"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 border border-gray-400"
                        >
                          Pekerjaan
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 border border-gray-400"
                        >
                          Qty
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 border border-gray-400"
                        >
                          Satuan
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 border border-gray-400"
                        >
                          Harga / Satuan
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 border border-gray-400"
                        >
                          Total Harga
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {detailPengadaan.map((e, idx) => (
                        <tr key={e.id}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6  border border-gray-400">
                            {idx + 1}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-700 border border-gray-400">
                            {e.pekerjaan}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-700 border border-gray-400">
                            {e.qty}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-700 border border-gray-400">
                            {e.satuan}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-700 border border-gray-400">
                            {format(e.harga)}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-700 border border-gray-400">
                            {format(e.harga * e.qty)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center font-bold">
              Detail Pekerjaan tidak tersedia !!
            </p>
          )}
          <p className="mt-5">
            Demikian kami sampaikan, atas perhatian dan kerja samanya, kami
            ucapkan terima kasih.
          </p>
        </div>

        <div className="my-5">
          <p>Hormat Kami</p>
          <img
            src={ttd === null ? signature : `${URLimg}${ttd}`}
            alt=""
            className="w-28 h-28 object-cover "
          />
          <span className="font-semibold pb-1 border-b-2 pe-12">{nama}</span>
          <p className="mt-1 font-semibold">Kordinator {cabang}</p>
        </div>
      </div>
    </div>
  );
};
