import {
  EyeIcon,
  PencilSquareIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
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
  pakai,
}) => {
  return (
    <div>
      <div className="group relative cursor-pointer">
        <img
          alt={"foto"}
          src={img}
          className={classNames(
            status ? "bg-emerald-100" : "bg-slate-300 opacity-50",
            "aspect-square w-full rounded-md  object-cover group-hover:opacity-85 lg:aspect-auto lg:h-64 border p-2 border-slate-300",
          )}
        />
        <div className="mt-1 flex flex-col relative">
          <div className="flex justify-between">
            <p className="text-sm text-cyan-600 capitalize">{stok}</p>
            <p className={"text-sm font-medium text-rose-700"}>{harga}</p>
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
              "absolute right-0 bottom-0 cursor-pointer text-emerald-600"
            }
            onClick={lihat}
          >
            <EyeIcon className="w-5" />
          </button>
        </div>
        <button
          className="w-full mt-2 py-1 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 cursor-pointer flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
          onClick={pakai}
          disabled={!status || stok === 0}
        >
          Pakai <ShoppingCartIcon className="w-5 inline" />
        </button>
      </div>
    </div>
  );
};
