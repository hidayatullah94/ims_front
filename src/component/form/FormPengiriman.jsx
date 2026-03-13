import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Requireds } from "../mayor";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

export const FormPengiriman = ({
  Submit,
  dsb,
  order,
  cabang,
  detail,
  cabangID,
  permintaanID,
}) => {
  const detailSend = detail.filter(
    (e) => e.status === true && e.isSend === false,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      detail: detailSend.map((i) => {
        return {
          barangID: Number(i.barangID),
          qty: Number(i.realisasi),
          barang: `${i.barang["nama"]} / ${i.barang["barcode"]}`,
          detailID: i.id,
        };
      }),
    },
  });
  const { fields, remove } = useFieldArray({
    control,
    name: "detail",
  });

  return (
    <form onSubmit={handleSubmit(Submit)}>
      <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full border p-7 border-slate-300 rounded-md">
        <div className="relative sm:col-span-3">
          <label
            htmlFor="name"
            className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
          >
            NO Order
          </label>
          <input
            value={order}
            id="name"
            type="text"
            placeholder="Surabaya"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
            readOnly
          />
        </div>
        <div className="relative sm:col-span-3">
          <label
            htmlFor="name"
            className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
          >
            Cabang
          </label>
          <input
            value={cabang}
            readOnly
            id="name"
            type="text"
            placeholder="Surabaya"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
          />
        </div>
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
            placeholder="pengiriman barang"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
            {...register("judul", { required: true })}
          />
          {errors.judul && <Requireds />}
        </div>
        <input
          type="number"
          className="hidden"
          {...register("cabangID")}
          value={cabangID}
        />
        <input
          type="number"
          className="hidden"
          {...register("permintaanID")}
          value={permintaanID}
        />
        <p className="w-full  font-semibold">Detail Item</p>
        <div className="col-span-full flex flex-col gap-5">
          {fields.map((e, idx) => {
            return (
              <div
                className="col-span-full grid grid-col-1 sm:grid-cols-3 gap-5 relative "
                key={e.id}
              >
                <input
                  type="number"
                  {...register(`detail.${idx}.barangID`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="hidden"
                />
                <input
                  type="number"
                  {...register(`detail.${idx}.detailID`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="hidden"
                />
                <div className="col-span-1 relative ">
                  <label
                    htmlFor={"barang"}
                    className="absolute -top-3 left-2 inline-block bg-white px-1 text-sm  text-gray-700 capitalize"
                  >
                    Barang
                  </label>
                  <input
                    id="barang"
                    type="text"
                    autoComplete={"barang"}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                    {...register(`detail.${idx}.barang`)}
                    readOnly
                  />
                </div>
                <div className="col-span-1 relative">
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
                    readOnly
                  />
                  {errors.detail?.[idx]?.qty && <Requireds />}
                </div>

                <div className="col-span-1 relative">
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
                <div
                  className={"absolute sm:-right-4 -top-5 right-0 flex gap-5 "}
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

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-cyan-600 px-10 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:bg-cyan-100 disabled:text-slate-300 disabled:cursor-not-allowed disabled:border"
          disabled={dsb}
        >
          Save
        </button>
      </div>
    </form>
  );
};
