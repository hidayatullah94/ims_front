import React from "react";
import { notfounds } from "../../assets";

export const Founds = ({ label = "sepertinya datanya ga ada nih !!" }) => {
  return (
    <div className="w-full flex flex-col justify-center justify-items-center items-center min-h-screen  bg-white">
      <img src={notfounds} alt="foto" className="w-auto" />
      <h1 className="font-semibold text-sm  text-sky-900 animate-pulse sm:text-base mt-3 capitalize">
        {label}
      </h1>
    </div>
  );
};
