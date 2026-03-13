import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";

export const Buttons = ({
  icon = <PlusIcon className="sm:w-5 w-4" />,
  klik,
  label = "Buat data",
}) => {
  return (
    <div>
      <button
        className="relative inline-flex items-center justify-center sm:px-7 px-5 sm:py-1.5 py-1 overflow-hidden font-mono font-medium tracking-tighter text-white bg-cyan-800 rounded group"
        onClick={klik}
      >
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-cyan-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30  from-transparent via-transparent to-gray-700"></span>
        <div className="flex gap-2 text-cyan-100 text-sm capitalize">
          <span className="relative">{label}</span>
          {icon}
        </div>
      </button>
    </div>
  );
};
