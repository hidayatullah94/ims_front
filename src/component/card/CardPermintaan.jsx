import React, { useState } from "react";
import { Kop } from "../../assets";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames, romawi } from "../../action";
import { TimeLine } from "../mayor";

import { Roles, URLimg } from "../../lib";
import moment from "moment";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { CardMemo } from "./CardMemo";

export const CardPermintaan = ({ data }) => {
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <div className="relative p-5 border border-slate-300 rounded shadow overflow-hidden">
      <button
        className={
          data.status === "PENDING" || file !== null
            ? "hidden"
            : "absolute right-5 border p-1 shadow rounded border-slate-300 cursor-pointer z-50"
        }
        onClick={() => setShow(!show)}
      >
        {show ? (
          <span className="flex gap-1">
            <EyeIcon className="w-5 text-emerald-600" />
            Memo
          </span>
        ) : (
          <span className="flex gap-1">
            <EyeSlashIcon className="w-5 text-rose-600" />
            Memo
          </span>
        )}
      </button>

      {show ? (
        <>
          <CardMemo
            detail={data.detail}
            cabang={data.cabang["nama"]}
            judul={data.judul}
            kode={data.pekerjaan["kode"]}
            nama={data.user["nama"]}
            nomor={`No : ${data.id}/${data.pekerjaan["nomor"]}/${romawi[moment(data.tanggal).format("M")]}/${moment(data.tanggal).format("Y")}`}
            pekerjaan={data.pekerjaan["keterangan"]}
            ruas={data.cabang["ruas"]}
            tanggal={moment(data.tanggal).format("DD/MM/Y")}
            ttd={data.user["ttd"]}
          />
        </>
      ) : (
        <div className="">
          {file ? (
            <div className="">
              <div className="flex justify-end relative mb-4">
                <button
                  className="text-rose-700 absolute -top-4 -right-4 cursor-pointer"
                  onClick={() => setFile(null)}
                >
                  <XMarkIcon className="w-7" />
                </button>
              </div>
              <iframe src={file} className="w-full h-175 border rounded" />
            </div>
          ) : (
            <div className="">
              <div className="flex justify-center gap-2">
                <img src={Kop} alt="" className="w-72" />
              </div>
              <div className="text-center">
                <span className="pb-1 border-b-2 border-slate-700 capitalize text-center font-semibold text-xl">
                  Permintaan Barang
                </span>
                <p className="text-rose-800 font-semibold text-center mt-2">
                  {data.kode}
                </p>
              </div>
              <TimeLine
                isAdd={data.tanggal !== null}
                addTgl={moment(data.tanggal).format("DD/MM/Y")}
                isCheck={data.tanggalApp !== null}
                checkTgl={
                  data.tanggalApp === null
                    ? null
                    : moment(data.tanggalApp).format("DD/MM/Y")
                }
                purTgl={
                  data.tanggalApp === null
                    ? null
                    : moment(data.tanggalApp).format("DD/MM/Y")
                }
                isSend={data.tanggalSend !== null}
                sendTgl={
                  data.tanggalSend === null
                    ? null
                    : moment(data.tanggalSend).format("DD/MM/Y")
                }
                isDone={data.tanggalDone !== null}
                donTgl={
                  data.tanggalDone === null
                    ? null
                    : moment(data.tanggalDone).format("DD/MM/Y")
                }
                diff={
                  data.tanggalDone === null
                    ? "-"
                    : moment(data.tanggalDone).diff(data.tanggal, "day")
                }
              />
              <div className="flex gap-6 text-sm capitalize">
                <div className="">
                  <p>Judul</p>
                  <p>pembuat</p>
                  <p>cabang</p>
                  <p>Tanggal</p>
                  <p>Projek</p>
                </div>
                <div className="">
                  <p> : {data.judul}</p>
                  <p> : {data.user["nama"]}</p>
                  <p> : {data.cabang["nama"]}</p>
                  <p> : {moment(data.tanggal).format("DD/MM/Y")}</p>
                  <p> : {data.pekerjaan.keterangan}</p>
                </div>
              </div>
              {data.detail.length ? (
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
                              Status permintaan
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-xs font-semibold text-gray-800"
                            >
                              Status barang
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-xs font-semibold text-gray-800"
                            >
                              Status kirim
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-xs font-semibold text-gray-800"
                            >
                              Realisasi
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-xs font-semibold text-gray-800"
                            >
                              Keterangan
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {data.detail.map((e) => (
                            <tr key={e.id}>
                              <td className="py-4 pr-3 pl-4 text-xs font-medium whitespace-nowrap text-gray-700 sm:pl-6">
                                {e.barang["nama"]} / {e.barang["barcode"]}
                              </td>
                              <td className="px-3 py-4 text-xs whitespace-nowrap text-gray-500">
                                {e.qty}
                              </td>

                              <td
                                className={classNames(
                                  e.status
                                    ? "text-emerald-600 font-semibold"
                                    : "text-rose-700 font-semibold",
                                  "px-3 py-4 text-xs whitespace-nowrap ",
                                )}
                              >
                                {data.status === "PENDING"
                                  ? "Diperiksa"
                                  : e.status
                                    ? "Setujui"
                                    : "Tolak"}
                              </td>
                              <td
                                className={classNames(
                                  e.status && e.pengadaan
                                    ? "text-emerald-600 font-semibold"
                                    : "text-slate-700 font-semibold",
                                  "px-3 py-4 text-xs whitespace-nowrap ",
                                )}
                              >
                                {e.status && e.pengadaan ? "Pengadaan" : "--"}
                              </td>
                              <td
                                className={classNames(
                                  e.isSend
                                    ? "text-emerald-600 font-semibold"
                                    : "text-orange-400 font-semibold",
                                  "px-3 py-4 text-xs whitespace-nowrap ",
                                )}
                              >
                                {e.isSend ? "Sudah Kirim" : "Belum kirim"}
                              </td>
                              <td className="px-3 py-4 text-xs whitespace-nowrap text-cyan-600 font-bold ">
                                {e.realisasi}
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
                  Maaf tidak ada barang yang diminta !!
                </p>
              )}
              <div className="flex justify-start mt-3">
                <div className="flex   gap-5">
                  <button
                    className="flex gap-2 cursor-pointer  text-cyan-700 font-semibold bg-cyan-100 text-xs py-1 px-3 rounded disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                    onClick={() => setFile(`${URLimg}${data.lk}`)}
                    disabled={data.lk === null}
                  >
                    {" "}
                    <PaperClipIcon className="w-5 " /> LK
                  </button>
                  <button
                    className="flex gap-2 cursor-pointer  text-cyan-700 font-semibold bg-cyan-100 text-xs py-1 px-3 rounded disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                    onClick={() => setFile(`${URLimg}${data.wo}`)}
                    disabled={data.wo === null}
                  >
                    {" "}
                    <PaperClipIcon className="w-5 " /> WO
                  </button>
                  <button
                    className="flex gap-2 cursor-pointer  text-rose-700 font-semibold bg-rose-100 text-xs py-1 px-3 rounded disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                    onClick={() => setFile(`${URLimg}${data.memo}`)}
                    disabled={data.memo === null}
                  >
                    <PaperClipIcon className="w-5 " /> Dokumen Lainnya
                  </button>
                </div>
              </div>
              <p
                className={classNames(
                  data.status === "PENDING"
                    ? "text-orange-500"
                    : data.status === "APPROVED"
                      ? "text-emerald-500"
                      : "text-rose-700",
                  "absolute top-20 right-10 z-10 bg-white rotate-45 font-bold  border-dashed border-4 w-36 text-center h-8",
                )}
              >
                {data.status}
              </p>
              <div className="my-7 flex justify-around  text-sm ">
                <div className={data.status === "PENDING" ? "hidden" : ""}>
                  <p>Disetujui</p>
                  <img
                    src={
                      data.appID === null
                        ? null
                        : `${URLimg}${data.approve.ttd}`
                    }
                    alt=""
                    className=" w-28 h-24 object-center"
                  />
                  <p>{data.appID === null ? null : data.approve.nama}</p>
                </div>

                <div className="">
                  <p>Dibuat</p>
                  <img
                    src={
                      data.user.ttd === null
                        ? null
                        : `${URLimg}${data.user.ttd}`
                    }
                    alt=""
                    className=" w-28 h-24 object-center"
                  />
                  <p>{data.user.nama}</p>
                </div>
              </div>
              <p
                className={
                  data.status === "PENDING"
                    ? "hidden"
                    : "text-rose-700 text-xs capitalize"
                }
              >
                Catatan : {data.keterangan}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
