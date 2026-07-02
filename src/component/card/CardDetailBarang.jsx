import React, { useMemo, useState } from "react";
import { useHistoriBarang } from "../../api/masters";
import { Loadings, MonthRange } from "../mayor";
import { Roles, URLimg } from "../../lib";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import moment from "moment";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export const CardDetailBarang = ({ id, spesifikasi }) => {
  const [date, setDate] = useState(new Date());
  const [detail, setDetail] = useState(null);

  const { data, isLoading } = useHistoriBarang({
    id,
    tanggal: date,
  });

  if (isLoading) return <Loadings />;
  return (
    <div className="relative text-slate-600 pb-10">
      <TabGroup>
        <TabList className={" flex font-semibold mb-5 justify-center gap-10"}>
          <Tab
            className={
              "cursor-pointer px-5 border-b border-slate-300  data-hover:border-b-2 data-hover:border-cyan-600 data-selected:border-cyan-600 data-selected:border-b-2 data-selected:text-cyan-600"
            }
          >
            Detail Barang
          </Tab>
          <Tab
            className={
              "cursor-pointer px-5 border-b border-slate-300  data-hover:border-b-2 data-hover:border-cyan-600 data-selected:border-cyan-600 data-selected:border-b-2 data-selected:text-cyan-600"
            }
          >
            Histori Barang
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="bg-white">
              <div aria-hidden="true" className="relative">
                <img
                  alt=""
                  src={`${URLimg}${spesifikasi.foto}`}
                  className="h-96 w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white " />
              </div>

              <div className="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
                <div className="mx-auto max-w-2xl  lg:max-w-4xl ">
                  <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl text-center">
                    {spesifikasi.nama}
                  </h2>
                  <div
                    className="flex justify-evenly flex-wrap
                  mt-3 text-sm"
                  >
                    <div className="flex gap-5 justify-start ">
                      <div className="text-slate-800 ">
                        <p>Kode</p>
                        <p>Kategori</p>
                        <p>Satuan</p>
                      </div>
                      <div className="">
                        <p>: {spesifikasi.barcode}</p>
                        <p>: {spesifikasi.kategori["nama"]}</p>
                        <p>: {spesifikasi.satuan}</p>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="">
                        <p>Stok</p>

                        <p>Status</p>
                      </div>
                      <div className="">
                        <p>
                          :{" "}
                          {spesifikasi.stok.length
                            ? spesifikasi.stok[0].qty
                            : 0}
                        </p>

                        <p>
                          :{" "}
                          {spesifikasi.status ? (
                            <span className="text-xs bg-cyan-100 px-3 rounded text-cyan-700">
                              Aktif
                            </span>
                          ) : (
                            <span className="text-xs bg-rose-100 px-3 rounded text-rose-700">
                              Tidak Aktif
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="font-semibold text-slate-800 lg:text-xl">
                  Spesifikasi
                </p>
                <dl className="mx-auto  mt-3 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-y-8 lg:max-w-none lg:grid-cols-3 text-sm">
                  {spesifikasi.spesifikasi.length ? (
                    spesifikasi.spesifikasi.map((item) => (
                      <div
                        key={item.id}
                        className="border-t border-gray-200 pt-2"
                      >
                        <dt className="font-medium text-gray-700 capitalize">
                          {item.attribute}
                        </dt>
                        <dd className="mt-2 text-sm text-gray-500">
                          {item.value}
                        </dd>
                      </div>
                    ))
                  ) : (
                    <p className="text-rose-500 font-semibold text-sm">
                      Tidak ada spesifikasi untuk barang ini!
                    </p>
                  )}
                </dl>
              </div>
            </div>
          </TabPanel>
          <TabPanel className={"relative"}>
            <div className="bg-white rounded-lg">
              <h2 className=" mb-3 text-center">
                Histori Barang - {data?.barang?.nama}
              </h2>

              <div className="absolute -top-3 right-0 text-xs font-medium">
                <MonthRange
                  selected={date}
                  change={(value) => setDate(value)}
                />
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
                            :{" "}
                            {moment(detail.tanggal).format(
                              "DD MMMM YYYY HH:mm",
                            )}
                          </p>
                          <p>: {detail.qty}</p>
                          <p className="capitalize">
                            : {detail.keterangan || "-"}
                          </p>
                          <p>
                            : {detail.user && <span>{detail.user.nama}</span>}
                          </p>
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
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};
