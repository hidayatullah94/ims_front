import React from "react";
import { useForm } from "react-hook-form";
import { Requireds } from "../mayor";
import { useCabang } from "../../api/masters";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const FormPekerjaan = ({
  Submit,
  dsb,
  df1,
  df2,
  df3,
  df4,
  df5,
  isUpdate,
  title,
  close,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data } = useCabang();

  return (
    <div>
      {" "}
      <form action="" onSubmit={handleSubmit(Submit)}>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full">
          <div className="relative w-auto my-6 mx-auto max-w-5xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col min-w-xl max-w-5xl bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-300 rounded-t">
                <h3 className="text-1xl font-semibold text-center capitalize">
                  {title}
                </h3>
                <button onClick={close}>
                  <XMarkIcon className="w-6 text-rose-600 cursor-pointer" />
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 grid grid-cols-1 sm:grid-cols-2  max-w-5xl  gap-6">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                  >
                    Kode
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="XYZ/VWS"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                    {...register("kode", { required: true })}
                    defaultValue={df1}
                  />
                  {errors.kode && <Requireds />}
                </div>
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                  >
                    Nomor
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="XYZ/VWS"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                    {...register("nomor", { required: true })}
                    defaultValue={df2}
                  />
                  {errors.nomor && <Requireds />}
                </div>
                <div className="relative sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                  >
                    Cabang
                  </label>
                  <select
                    id="divisiID"
                    defaultValue={df3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                    {...register("cabangID", { required: true })}
                  >
                    {data &&
                      data.map((e) => {
                        return <option value={e.id}>{e.nama}</option>;
                      })}
                  </select>
                  {errors.cabangID && <Requireds />}
                </div>
                <div className="relative sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                  >
                    Pekerjaan
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="pemeliharaan cctv"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                    {...register("keterangan", { required: true })}
                    defaultValue={df4}
                  />
                  {errors.keterangan && <Requireds />}
                </div>

                {isUpdate && (
                  <div className="relative sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                    >
                      Status
                    </label>
                    <select
                      id="location"
                      defaultValue={df5}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                      {...register("status")}
                    >
                      <option value={true}>Aktif</option>
                      <option value={false}>Tidak</option>
                    </select>
                  </div>
                )}
              </div>
              {/*footer*/}

              <div className="w-full px-6 mt-2 border-t py-4 border-slate-300">
                <button
                  type="submit"
                  className=" rounded bg-cyan-600 text-center py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-cyan-600  disabled:bg-cyan-100 disabled:border-sky-500 disabled:border w-full"
                  disabled={dsb}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </form>
    </div>
  );
};
