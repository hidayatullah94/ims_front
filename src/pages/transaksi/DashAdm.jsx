import React from "react";
import {
  LineRequest,
  LineSend,
  PieDaily,
  PolarMonth,
} from "../../component/mayor";

export const DashAdm = () => {
  return (
    <div>
      <div className="mx-auto max-w-2xl px-2 lg:max-w-7xl lg:px-0 flex  flex-col gap-5">
        <div className="flex justify-evenly bg-white shadow rounded p-6">
          <PolarMonth />
          <PieDaily />
        </div>
        <div className="flex  flex-col gap-5">
          <LineRequest />
          <LineSend />
        </div>
      </div>
    </div>
  );
};
