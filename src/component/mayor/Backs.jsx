import React from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

export const Backs = ({ click }) => {
  return (
    <div>
      <button
        className="relative inline-flex items-center justify-center  sm:px-5 px-2 sm:py-1.5 py-1 overflow-hidden   transition duration-300 ease-out border  rounded shadow group sm:text-sm text-xs border-slate-300"
        onClick={click}
      >
        <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-rose-800 group-hover:translate-x-0 ease">
          <ArrowUturnLeftIcon className="sm:w-6 w-5" />
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-cyan-500 transition-all duration-300 transform group-hover:translate-x-full ease">
          Kembali
        </span>
        <span className="relative invisible">Button Text</span>
      </button>
    </div>
  );
};
