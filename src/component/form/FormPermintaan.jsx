import React, { useEffect } from "react";
import { useFieldArray, useForm, Controller, useWatch } from "react-hook-form";
import { Loadings, Requireds } from "../mayor";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { useBarang, usePekerjaan } from "../../api/masters";
import Select from "react-select";

export const FormPermintaan = ({ Submit, dsb, isApp, df1, df2, detail }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      detail: detail
        ? detail.map((i) => {
            return {
              barangID: Number(i.barangID),
              qty: Number(i.qty),
              realisasi: Number(i.qty),
              status: i.status,
              keterangan: i.keterangan,
              pengadaan: i.pengadaan,
            };
          })
        : [],
    },
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "detail",
  });
  const { data, isLoading } = useBarang(true);
  const { data: KERJAAN } = usePekerjaan({
    cabang: "All",
    status: true,
  });
  // const lk = useWatch({ control, name: "lk" });
  // const wo = useWatch({ control, name: "wo" });
  // useEffect(() => {
  //   if ((!lk || lk.length === 0) && (!wo || wo.length === 0)) {
  //     setError("lk", { type: "required" });
  //     setError("wo", { type: "required" });
  //   }
  // }, [lk, wo, setError, clearErrors]);

  if (isLoading) return <Loadings />;

  return (
    <div>
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
              placeholder="permintaan barang"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
              {...register("judul", { required: true })}
              readOnly={isApp}
              defaultValue={df1}
            />
            {errors.judul && <Requireds />}
          </div>
          <div className="relative sm:col-span-6">
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
            <>
              <div className="relative sm:col-span-2">
                <label
                  htmlFor="name"
                  className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                >
                  LK
                </label>
                <input
                  id="name"
                  type="file"
                  accept=".pdf"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs  file:text-xs file:text-cyan-700 file:font-bold "
                  {...register("lk")}
                />
                {errors.lk && (
                  <p className="text-xs text-rose-700 mt-1">
                    Wajib di isi salah satu WO/LK !
                  </p>
                )}
              </div>
              <div className="relative sm:col-span-2">
                <label
                  htmlFor="name"
                  className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                >
                  Wo
                </label>
                <input
                  id="name"
                  type="file"
                  accept=".pdf"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs  file:text-xs file:text-cyan-700 file:font-bold "
                  {...register("wo")}
                />
                {errors.wo && (
                  <p className="text-xs text-rose-700 mt-1">
                    Wajib di isi salah satu WO/LK !
                  </p>
                )}
              </div>
              <div className="relative sm:col-span-2">
                <label
                  htmlFor="name"
                  className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                >
                  Dokumen Lain
                </label>
                <input
                  id="name"
                  type="file"
                  accept=".pdf"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs  file:text-xs file:text-cyan-700 file:font-bold "
                  {...register("memo")}
                />
              </div>
            </>
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
                  barangID: null,
                  qty: 0,
                })
              }
            >
              Tambah Barang
            </button>
            {fields.map((e, idx) => {
              return (
                <div
                  className="col-span-full grid grid-col-1 sm:grid-cols-7 gap-5 relative "
                  key={e.id}
                >
                  <div
                    className={
                      isApp
                        ? " relative sm:col-span-2 "
                        : " relative sm:col-span-4 "
                    }
                  >
                    <label
                      htmlFor={"nama"}
                      className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm  text-gray-700 capitalize z-10"
                    >
                      Barang
                    </label>
                    <Controller
                      name={`detail.${idx}.barangID`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          isLoading={isLoading}
                          placeholder="Silakan ketik nama atau kode barang"
                          isClearable
                          isSearchable
                          styles={{
                            control: (base) => ({
                              ...base,
                              borderRadius: "5px",
                            }),
                          }}
                          options={data?.map((e) => ({
                            value: e.id,
                            label: `${e.barcode} - ${e.nama}`,
                          }))}
                          value={
                            data
                              ?.map((e) => ({
                                value: e.id,
                                label: `${e.barcode} - ${e.nama}`,
                              }))
                              .find((opt) => opt.value === value) || null
                          }
                          onChange={(opt) => onChange(opt ? opt.value : null)}
                          isDisabled={isApp}
                        />
                      )}
                    />

                    {errors.detail?.[idx]?.barangID && <Requireds />}
                  </div>
                  <div
                    className={isApp ? " relative " : " relative sm:col-span-3"}
                  >
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
                  {isApp && (
                    <>
                      <div className=" relative">
                        <label
                          htmlFor={"qty"}
                          className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm  text-gray-700 capitalize"
                        >
                          Realisasi
                        </label>
                        <input
                          id="realisasi"
                          type="number"
                          autoComplete={"realisasi"}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                          {...register(`detail.${idx}.realisasi`, {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                        {errors.detail?.[idx]?.realisasi && <Requireds />}
                      </div>
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
                      <div className="flex items-center gap-2 ">
                        <div className="group relative inline-flex w-11 shrink-0 rounded-full bg-gray-200 p-0.5 inset-ring inset-ring-gray-900/5 outline-offset-2 outline-emerald-600 transition-colors duration-200 ease-in-out has-checked:bg-emerald-600 has-focus-visible:outline-2">
                          <span className="size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-5" />
                          <input
                            id="annual-billing"
                            name="annual-billing"
                            type="checkbox"
                            aria-labelledby="annual-billing-label"
                            aria-describedby="annual-billing-description"
                            className="absolute inset-0 size-full appearance-none focus:outline-hidden"
                            {...register(`detail.${idx}.pengadaan`)}
                          />
                        </div>
                        <label htmlFor="" className="text-xs font-semibold">
                          Pengadaan
                        </label>
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
