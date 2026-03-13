import React from "react";
import { Kop, logo } from "../../assets";
import { useForm } from "react-hook-form";
import { Requireds } from "../mayor";
import { Roles } from "../../lib";
export const CardPengiriman = ({
  order,
  judul,
  detail,
  SaveApp,
  status,
  tglApp,
  tglsend,
  cabang,
  diff,
  kode,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <div>
      {" "}
      <div className="relative p-5 border border-slate-300 rounded shadow overflow-hidden">
        <div className="flex justify-center gap-2">
          <img src={Kop} alt="" className="w-72" />
        </div>
        <div className="text-center">
          <span className="pb-1 border-b-2 border-slate-700 capitalize text-center font-semibold text-xl">
            Pengiriman Barang
          </span>
          <p className="text-rose-800 font-semibold text-center mt-1">
            {order}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-6 text-sm capitalize">
            <div className="">
              <p>Judul</p>
              <p>Cabang</p>
              <p>Status</p>
              <p>Kode Permintaan</p>
            </div>
            <div className="">
              <p> : {judul}</p>
              <p> : {cabang}</p>
              <p>
                {" "}
                :{" "}
                {status ? (
                  <span className="bg-emerald-100 text-emerald-600 px-3 rounded">
                    Diterima
                  </span>
                ) : (
                  <span className="bg-orange-100  text-orange-600 px-3 rounded">
                    Pending
                  </span>
                )}
              </p>
              <p className="font-semibold"> : {kode}</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm capitalize">
            <div className="">
              <p>Tanggal dikirim</p>
              <p>Tanggal diterima</p>
              <p>Selesai dalam</p>
            </div>
            <div className="">
              <p> : {tglsend}</p>
              <p> : {tglApp}</p>
              <p className="font-semibold"> : {diff} Hari</p>
            </div>
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
                        Keterangan
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

                        <td className="px-3 py-4 text-xs whitespace-nowrap text-gray-500 capitalize">
                          {e.keterangan}
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
        {status === false && Roles === "USER" && (
          <form
            action=""
            className="border p-5 border-slate-300 rounded mt-10"
            onSubmit={handleSubmit(SaveApp)}
          >
            <div className="relative">
              <label
                htmlFor="name"
                className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
              >
                Keterangan
              </label>
              <input
                id="name"
                type="text"
                placeholder="permintaan disetujui"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                {...register("keterangan", { required: true })}
              />
              {errors.keterangan && <Requireds />}
            </div>

            <div className="flex justify-around mt-6 text-sm gap-12">
              <button className="bg-cyan-200 w-full text-cyan-700 py-1 rounded font-semibold cursor-pointer">
                Diterima
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
