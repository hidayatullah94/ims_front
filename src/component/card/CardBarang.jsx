import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { classNames } from "../../action";
import { Roles } from "../../lib";

export const CardBarang = ({
  img,
  stok,
  barcode,
  nama,
  klik,
  status,
  harga,
  lihat,
}) => {
  return (
    <div>
      <div className="group relative">
        <img
          alt={"foto"}
          src={img}
          className={classNames(
            status ? "bg-slate-200" : "bg-rose-200",
            "aspect-square w-full rounded-md  object-cover group-hover:opacity-75 lg:aspect-auto lg:h-64 border p-2 border-slate-300",
          )}
        />
        <div className="mt-1 flex flex-col relative">
          <div className="flex justify-between">
            <p className="text-sm text-cyan-600 capitalize">{stok}</p>
            <p
              className={
                Roles === "ADMIN"
                  ? "text-sm font-medium text-rose-700"
                  : "hidden"
              }
            >
              {harga}
            </p>
          </div>
          <div>
            <h3 className="text-sm text-gray-700 font-bold">{barcode}</h3>
            <p className="mt-1 text-sm text-gray-500 truncate  w-full">
              {nama}
            </p>
          </div>

          <button
            className={
              Roles === "ADMIN"
                ? "absolute right-0 bottom-5 cursor-pointer text-rose-700"
                : "hidden"
            }
            onClick={klik}
          >
            <PencilSquareIcon className="w-5" />
          </button>
          <button
            className={
              Roles === "ADMIN"
                ? "absolute right-0 bottom-0 cursor-pointer text-emerald-600"
                : "hidden"
            }
            onClick={lihat}
          >
            <EyeIcon className="w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
