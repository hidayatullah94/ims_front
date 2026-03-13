import React from "react";
import { loads } from "../../assets";

export const Loadings = () => {
  return (
    <div className="w-full flex flex-col justify-center justify-items-center items-center min-h-screen  bg-white">
      <img src={loads} alt="foto" className="w-auto" />
      <h1 className="font-semibold text-sm  text-sky-900 animate-pulse sm:text-2xl">
        Loading ...
      </h1>
    </div>
  );
};
