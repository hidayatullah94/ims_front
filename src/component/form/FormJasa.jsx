import React from "react";
import { usePekerjaan } from "../../api/masters";
import { Loadings, Requireds } from "../mayor";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Cleave from "cleave.js/react";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

export const FormJasa = ({ Submit, dsb, isApp, df1, df2, detail }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      detail: detail
        ? detail.map((i) => {
            return {
              pekerjaan: i.pekerjaan,
              qty: Number(i.qty),
              harga: Number(i.harga),
              status: i.status,
              keterangan: i.keterangan,
              satuan: i.satuan,
            };
          })
        : [],
    },
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "detail",
  });

  const { data: KERJAAN, isLoading } = usePekerjaan({
    cabang: "All",
    status: true,
  });
  if (isLoading) return <Loadings />;

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(Submit)}>
        <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full border p-7 border-slate-300 rounded-md">
          <div className="relative col-span-full">
            <label
              htmlFor="name"
              className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
            >
              Prihal
            </label>
            <input
              id="name"
              type="text"
              placeholder="permintaan jasa"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
              {...register("judul", { required: true })}
              readOnly={isApp}
              defaultValue={df1}
            />
            {errors.judul && <Requireds />}
          </div>
          <div className={isApp ? "col-span-full" : "relative sm:col-span-3"}>
            <label
              htmlFor="name"
              className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
            >
              Pekerjaan
            </label>
            <select
              id="location"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
              {...register("pekerjaanID", { required: true })}
              value={isApp ? df2 : null}
            >
              <option value={""}>Silahkan Pilih Pekerjaan</option>;
              {KERJAAN &&
                KERJAAN.map((e) => {
                  return (
                    <option value={e.id}>
                      {e.kode} / {e.keterangan}
                    </option>
                  );
                })}
            </select>
            {errors.pekerjaanID && <Requireds />}
          </div>
          {!isApp && (
            <div className="relative sm:col-span-3">
              <label
                htmlFor="name"
                className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
              >
                Dokumen Pendukung
              </label>
              <input
                id="name"
                type="file"
                accept=".pdf"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs  file:text-xs file:text-cyan-700 file:font-bold "
                {...register("dokumen")}
              />
            </div>
          )}

          <div className="col-span-full flex flex-col gap-5">
            <button
              className={
                isApp
                  ? "hidden"
                  : "bg-emerald-100 text-emerald-700 text-sm py-1 rounded cursor-pointer shadow mb-5"
              }
              type="button"
              onClick={() =>
                append({
                  pekerjaan: "",
                  qty: "",
                  harga: 0,
                  satuan: "",
                })
              }
            >
              Tambah Jasa
            </button>
            {fields.map((e, idx) => {
              return (
                <div
                  className="col-span-full grid grid-col-1 sm:grid-cols-6 gap-5 relative "
                  key={e.id}
                >
                  <div
                    className={isApp ? " relative " : " relative sm:col-span-2"}
                  >
                    <label
                      htmlFor={"pekerjaan"}
                      className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm  text-gray-700 capitalize"
                    >
                      Pekerjaan
                    </label>
                    <input
                      id="pekerjaan"
                      type="text"
                      autoComplete={"pekerjaan"}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                      {...register(`detail.${idx}.pekerjaan`, {
                        required: true,
                      })}
                      readOnly={isApp}
                    />
                    {errors.detail?.[idx]?.pekerjaan && <Requireds />}
                  </div>
                  <div className={isApp ? " relative " : " relative "}>
                    <label
                      htmlFor={"qty"}
                      className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm  text-gray-700 capitalize"
                    >
                      QTY
                    </label>
                    <input
                      id="qty"
                      type="number"
                      autoComplete={"qty"}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                      {...register(`detail.${idx}.qty`, {
                        required: true,
                        valueAsNumber: true,
                      })}
                      readOnly={isApp}
                    />
                    {errors.detail?.[idx]?.qty && <Requireds />}
                  </div>
                  <div
                    className={isApp ? " relative " : " relative sm:col-span-2"}
                  >
                    <label
                      htmlFor={"satuan"}
                      className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm  text-gray-700 capitalize"
                    >
                      Satuan
                    </label>
                    <input
                      id="satuan"
                      type="text"
                      autoComplete={"satuan"}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                      {...register(`detail.${idx}.satuan`, {
                        required: true,
                      })}
                      readOnly={isApp}
                    />
                    {errors.detail?.[idx]?.satuan && <Requireds />}
                  </div>
                  <div className={isApp ? " relative " : " relative "}>
                    <label
                      htmlFor={"qty"}
                      className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm  text-gray-700 capitalize"
                    >
                      Harga / Qty
                    </label>
                    <Controller
                      name={`detail.${idx}.harga`}
                      control={control}
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          options={{
                            numeral: true,
                            numeralThousandsGroupStyle: "thousand",
                            numeralDecimalMark: ",",
                            delimiter: ".",
                            prefix: "Rp ",
                            rawValueTrimPrefix: true,
                          }}
                          onChange={(e) => {
                            field.onChange(Number(e.target.rawValue));
                          }}
                          placeholder="Masukkan nominal"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                        />
                      )}
                    />
                  </div>
                  {isApp && (
                    <>
                      <div className="relative ">
                        <label
                          htmlFor="name"
                          className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                        >
                          Status
                        </label>
                        <select
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                          {...register(`detail.${idx}.status`)}
                        >
                          <option value={true}>Setujui </option>
                          <option value={false}>Tolak</option>
                        </select>
                      </div>
                      <div className=" relative">
                        <label
                          htmlFor={"keterangan"}
                          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm  text-gray-700 capitalize"
                        >
                          Keterangan
                        </label>
                        <input
                          id="keterangan"
                          type="text"
                          autoComplete={"keterangan"}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                          {...register(`detail.${idx}.keterangan`)}
                        />
                      </div>
                    </>
                  )}

                  <div
                    className={
                      isApp
                        ? "hidden"
                        : "absolute sm:-right-4 -top-5 right-0 flex gap-5"
                    }
                  >
                    <button
                      onClick={() => remove(idx)}
                      className=" text-rose-500 "
                      type="button"
                    >
                      <MinusCircleIcon className="w-6" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {isApp && (
            <>
              <div className="relative sm:col-span-4">
                <label
                  htmlFor="name"
                  className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                >
                  Keterangan
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="permintaan barang di setujui"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                  {...register("keterangan", { required: true })}
                />
                {errors.keterangan && <Requireds />}
              </div>
              <div className="relative sm:col-span-2">
                <label
                  htmlFor="name"
                  className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                >
                  Status
                </label>
                <select
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                  {...register(`status`)}
                >
                  <option value={"APPROVED"} selected>
                    Setujui{" "}
                  </option>
                  <option value={"REJECTED"}>Tolak</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="my-6 flex items-center justify-end gap-x-6 ">
          <button
            type="submit"
            className="rounded-md bg-cyan-600 px-10 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:bg-cyan-100 disabled:text-slate-300 disabled:cursor-not-allowed disabled:border"
            disabled={dsb}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
