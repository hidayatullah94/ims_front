import React, { useContext } from "react";
import { TogleConsum } from "../../contex/GlobalContex";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { logo } from "../../assets";
import { Links } from "./Links";

export const SideBars = () => {
  const [togle, setTogle] = useContext(TogleConsum);
  return (
    <div
      className={
        togle
          ? "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-16 lg:flex-col"
          : "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
      }
    >
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-cyan-800 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center justify-between">
          {togle ? null : (
            <>
              <img className="h-8 w-auto" src={logo} alt="Your Company" />
              <p className="text-white">Inventory CPI</p>
            </>
          )}
          <button className="text-white" onClick={() => setTogle(!togle)}>
            {togle ? (
              <ArrowsPointingOutIcon className="w-6" />
            ) : (
              <ArrowsPointingInIcon className="w-6" />
            )}
          </button>
        </div>
        <Links />
      </div>
    </div>
  );
};
