import React, { useEffect } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { Loadings, Requireds } from "../mayor";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { useBarang } from "../../api/masters";
import Select from "react-select";
import Cleave from "cleave.js/react";
export const FormPemasukan = ({
  Submit,
  dsb,
  permintaanID,
  isPermintaan,
  details = [],
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      detail: [],
    },
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "detail",
  });
  useEffect(() => {
    if (isPermintaan && details?.length) {
      reset({
        detail: details.map((e) => ({
          barangID: Number(e.barangID),
          qty: Number(e.qty),
          harga: 0,
        })),
      });
    }
  }, [isPermintaan, details, reset]);

  const { data, isLoading } = useBarang(true);
  if (isLoading) return <Loadings />;
  return (
    <div>
      <form onSubmit={handleSubmit(Submit)}>
        <input
          type="number"
          {...register("permintaanID")}
          value={permintaanID}
          className="hidden"
        />
        <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full border p-7 border-slate-300 rounded-md">
          <div className="relative col-span-full">
            <label
              htmlFor="name"
              className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
            >
              Judul
            </label>
            <input
              id="name"
              type="text"
              placeholder="barang masuk"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
              {...register("judul", { required: true })}
            />
            {errors.judul && <Requireds />}
          </div>
          <div className="relative col-span-full">
            <label
              htmlFor="no_invoice"
              className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
            >
              No Tanda Terima
            </label>
            <input
              id="name"
              type="text"
              placeholder="X252-158165"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
              {...register("no_invoice", { required: true })}
            />
            {errors.no_invoice && <Requireds />}
          </div>

          <div className={"col-span-full flex flex-col gap-5"}>
            <button
              className={
                isPermintaan
                  ? "hidden"
                  : "bg-emerald-100 text-emerald-700 text-sm py-1 rounded cursor-pointer shadow mb-5"
              }
              type="button"
              onClick={() =>
                append({
                  barangID: null,
                  qty: 0,
                  harga: 0,
                })
              }
            >
              Tambah Barang
            </button>
            {fields.map((e, idx) => {
              return (
                <div
                  className="col-span-full grid grid-col-1 sm:grid-cols-3 gap-5 relative "
                  key={e.id}
                >
                  <div className=" relative ">
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
                        />
                      )}
                    />

                    {errors.detail?.[idx]?.barangID && <Requireds />}
                  </div>
                  <div className=" relative">
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
                    />
                    {errors.detail?.[idx]?.qty && <Requireds />}
                  </div>
                  <div className="col-span-1 relative">
                    <label
                      htmlFor={"qty"}
                      className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm  text-gray-700 capitalize"
                    >
                      Harga
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

                  <div className="absolute sm:-right-4 -top-5 right-0 flex gap-5">
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
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
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
