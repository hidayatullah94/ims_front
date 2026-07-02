import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MinusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Requireds } from "../mayor";
import { useKategori } from "../../api/masters";
export const FormBarang = ({
  dsb,
  title,
  close,
  df1,
  df2,
  isUpdate,
  Submit,
  df3,
  df4,
  df5,
  spek,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      nama: df1,
      barcode: df2,
      satuan: df3,
      kategoriID: df4,
      status: df5,
      spesifikasi: spek || [],
    },
  });
  const { data } = useKategori(true);
  const { fields, remove, append } = useFieldArray({
    control,
    name: "spesifikasi",
  });

  return (
    <div>
      {" "}
      <form action="" onSubmit={handleSubmit(Submit)}>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full">
          <div className="relative w-auto my-6 mx-auto max-w-5xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col min-w-xl max-w-5xl bg-white outline-none focus:outline-none overflow-y-scroll max-h-[90vh]">
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
                    Nama Barang
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="cctv dahua"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                    {...register("nama", { required: true })}
                  />
                  {errors.nama && <Requireds />}
                </div>
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                  >
                    Kode/ Barcode
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="1814515644456"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                    {...register("barcode", { required: true })}
                  />
                  {errors.barcode && <Requireds />}
                </div>
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                  >
                    Satuan
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="unit"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                    {...register("satuan", { required: true })}
                  />
                  {errors.satuan && <Requireds />}
                </div>
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                  >
                    Kategori
                  </label>
                  <select
                    id="location"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                    {...register("kategoriID", { required: true })}
                  >
                    <option value={""}>Silahkan Pilih Kategori</option>;
                    {data &&
                      data.map((e) => {
                        return (
                          <option value={e.id} key={e.id}>
                            {e.nama}
                          </option>
                        );
                      })}
                  </select>
                  {errors.kategoriID && <Requireds />}
                </div>

                <div className="relative sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                  >
                    Foto
                  </label>
                  <input
                    id="name"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs  file:text-xs file:text-cyan-700 file:font-bold "
                    {...register("foto")}
                  />
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
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                      {...register("status")}
                    >
                      <option value={true}>Aktif</option>
                      <option value={false}>Tidak</option>
                    </select>
                  </div>
                )}
                <div className="col-span-full">
                  <button
                    type="button"
                    className="rounded bg-slate-600 text-center py-1.5 text-xs font-semibold text-slate-50 shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:bg-slate-100 disabled:border-sky-500 disabled:border w-full cursor-pointer"
                    onClick={() =>
                      append({
                        attribute: "",
                        value: "",
                      })
                    }
                  >
                    Tambah Spesifikasi
                  </button>
                </div>
                <div className="col-span-full grid grid-col-1 sm:grid-cols-2 gap-5 relative ">
                  {fields.map((e, idx) => {
                    return (
                      <div
                        className="col-span-full grid grid-col-1 sm:grid-cols-2 gap-5 relative "
                        key={e.id}
                      >
                        <div className="col-span-1 relative ">
                          <label
                            htmlFor={"key"}
                            className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm  text-gray-700 capitalize"
                          >
                            Nama Spesifikasi
                          </label>
                          <input
                            id="key"
                            type="text"
                            autoComplete={"key"}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                            {...register(`spesifikasi.${idx}.attribute`)}
                          />
                        </div>

                        <div className="col-span-1 relative">
                          <label
                            htmlFor={"value"}
                            className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm  text-gray-700 capitalize"
                          >
                            Nilai Spesifikiasi
                          </label>
                          <input
                            id="value"
                            type="text"
                            autoComplete={"value"}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                            {...register(`spesifikasi.${idx}.value`)}
                          />
                        </div>
                        <div
                          className={
                            "absolute sm:-right-4 -top-5 right-0 flex gap-5 "
                          }
                        >
                          <button
                            onClick={() => remove(idx)}
                            className=" text-rose-500 cursor-pointer"
                            type="button"
                          >
                            <MinusCircleIcon className="w-6" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
