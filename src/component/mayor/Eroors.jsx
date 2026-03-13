import React from "react";
import { erors } from "../../assets";

export const Eroors = () => {
  return (
    <div className="w-full flex flex-col justify-center justify-items-center items-center min-h-screen  bg-white">
      <img src={erors} alt="foto" className="w-auto" />
      <h1 className="font-semibold text-sm  text-sky-900 animate-bounce sm:text-base mt-3">
        Waduh seperti nya ada gangguan nih !!
      </h1>
    </div>
  );
};
