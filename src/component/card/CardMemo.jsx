import React, { useRef } from "react";
import { URLimg } from "../../lib";
import { useReactToPrint } from "react-to-print";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { Kop, signature } from "../../assets";
const ceklis = [
  { id: 1, nama: "Spesifikasi Barang/Ruang Lingkup Pekerjaan" },
  { id: 2, nama: "Foto Barang/Area Pekerjaan" },
  { id: 3, nama: "Rencana Anggaran Biaya (RAB)" },
  { id: 4, nama: "Dokumen kelengkapan lainnya" },
];
export const CardMemo = ({
  nomor,
  cabang,
  tanggal,
  judul,
  detail,
  pekerjaan,
  ttd,
  nama,
  ruas,
  kontrak,
  tglKontrak,
}) => {
  const detailPengadaan = detail.filter((e) => e.status === true);
  const contentRef = useRef(null);

  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef,
  });

  return (
    <div className="relative pb-10">
      <button
        onClick={reactToPrintFn}
        className="bg-rose-800 text-rose-100 px-5 rounded shadow hover:bg-rose-600 cursor-pointer flex gap-1 py-1"
      >
        <PrinterIcon className="w-5" />
        Print
      </button>
      <div ref={contentRef} className=" px-20">
        <div className="py-8 ">
          <div className=" text-center">
            <img src={Kop} alt="" className="w-72 mx-auto mb-2" />
            <span className="font-bold text-xl pb-1 border-b-2 ">
              MEMORANDUM INTERNAL
            </span>
            <p className="mt-5 ">{nomor}</p>
          </div>
          <div className="flex gap-6 my-5">
            <div className="">
              <p>Kepada Yth</p>
              <p>Dari</p>
              <p>Sifat</p>
              <p>Jenis</p>
              <p>Tanggal</p>
              <p>Prihal</p>
            </div>
            <div className="">
              <p>: Divisi IT Dan Divisi Umum</p>
              <p>: Tim {cabang} </p>
              <p>: (Biasa / Segera)</p>
              <p>: (Barang/Jasa/Barang & Jasa)</p>
              <p>: {tanggal}</p>
              <p>: Permohonan Pengadaan</p>
            </div>
          </div>
          <p>Dengan Hormat</p>
          <p className="mt-4 mb-4">
            Sehubungan dengan kontrak Kerjasama {pekerjaan}. dengan PT Citra
            Persada Infrastruktur, Bersama ini kami mengajukan permohonan
            pengadaan untuk mendukung pelaksanaan pekerjaan di lapangan, dengan
            rincian sebagai berikut :
          </p>
          <div className="flex gap-6 my-5 ms-8">
            <div className="">
              <p>1. Nama Pekerjaan</p>
              <p>2. Nomor Kontrak</p>
              <p>3. Tanggal Kontrak</p>
              <p>4. Pengajuan</p>
              <p>5. Periode Pengadaan</p>
            </div>
            <div className="">
              <p>: {pekerjaan}</p>
              <p>: {kontrak} </p>
              <p>: {tglKontrak}</p>
              <p>: {judul}</p>
              <p>: {tanggal}</p>
            </div>
          </div>
          <p>
            Sebagai kelengkapan administrasi dan bahan pertimbangan, kami
            lampirkan dokumen pendukung :
          </p>
          <table className="relative min-w-full divide-y divide-gray-400 mt-5">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-1.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 border border-gray-400"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-3 py-1.5 text-left text-sm font-semibold text-gray-900 border border-gray-400"
                >
                  Urainan
                </th>
                <th
                  scope="col"
                  className="px-3 py-1.5 text-left text-sm font-semibold text-gray-900 border border-gray-400"
                >
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {ceklis.map((e, idx) => (
                <tr key={e.id}>
                  <td className="py-1.5 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6  border border-gray-400">
                    {idx + 1}
                  </td>
                  <td className="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 border border-gray-400">
                    {e.nama}
                  </td>
                  <td className="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 border border-gray-400 w-40"></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-5">
            Demikian kami sampaikan, atas perhatian dan kerja samanya, kami
            ucapkan terima kasih.
          </p>
        </div>

        <div className="">
          <p>Hormat Kami</p>
          <img
            src={ttd === null ? signature : `${URLimg}${ttd}`}
            alt=""
            className="w-28 h-28 object-cover "
          />
          <span className="font-semibold pb-1 border-b-2 pe-12">{nama}</span>
          <p className="mt-1 font-semibold">Kordinator {cabang}</p>
        </div>

        {detailPengadaan.length ? (
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-10">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-sm  sm:rounded">
                <table className="relative min-w-full divide-y divide-gray-400">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-1.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 border border-gray-400"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-1.5 text-left text-sm font-semibold text-gray-900 border border-gray-400"
                      >
                        Urainan
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-1.5 text-left text-sm font-semibold text-gray-900 border border-gray-400"
                      >
                        Qty
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-1.5 text-left text-sm font-semibold text-gray-900 border border-gray-400"
                      >
                        Satuan
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-1.5 text-left text-sm font-semibold text-gray-900 border border-gray-400"
                      >
                        Dokumentasi / Foto Material
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-1.5 text-left text-sm font-semibold text-gray-900 border border-gray-400"
                      >
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {detailPengadaan.map((e, idx) => (
                      <tr key={e.id}>
                        <td className="py-1.5 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6  border border-gray-400">
                          {idx + 1}
                        </td>
                        <td className="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 border border-gray-400">
                          <p className="text-slate-900 font-semibold">
                            {e.barang["nama"]}
                          </p>
                          <p className=" text-wrap ">
                            {e.barang["spesifikasi"] === null
                              ? "-"
                              : e.barang["spesifikasi"].map((item, index) => (
                                  <p key={index}>
                                    - {item.attribute} : {item.value}
                                    {index !==
                                      e.barang["spesifikasi"].length - 1 &&
                                      ", "}
                                  </p>
                                ))}
                          </p>
                        </td>
                        <td className="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 border border-gray-400">
                          {e.qty}
                        </td>
                        <td className="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 border border-gray-400 capitalize">
                          {e.barang["satuan"]}
                        </td>
                        <td className="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 border border-gray-400 ">
                          <img
                            src={`${URLimg}${e.barang["foto"]}`}
                            alt="Foto Material"
                            className="w-full h-full object-cover max-w-44 max-h-44 mx-auto"
                          />
                        </td>
                        <td className="px-3 py-1.5 text-sm whitespace-nowrap text-gray-700 border border-gray-400"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center font-bold">
            Detail Barang tidak tersedia !!
          </p>
        )}
      </div>
    </div>
  );
};
