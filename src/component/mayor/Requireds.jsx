import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
export const Requireds = () => {
  return (
    <div className="flex gap-2 text-xs text-red-500 mt-1">
      <p className=" ">*Kolom Wajib diisi</p>
      <ExclamationTriangleIcon className="w-4 " />
    </div>
  );
};
