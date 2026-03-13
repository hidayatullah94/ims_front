import React from "react";
import DatePicker from "react-datepicker";
export const MonthRange = ({ change, selected, label = "Bulan" }) => {
  return (
    <div className="relative bg-transparent rounded-md py-2 px-1  text-slate-800">
      <div className="relative">
        <label
          htmlFor="tanggal-awal"
          className="absolute -top-2  inline-block  bg-white px-2 text-sm  z-10  "
        >
          {label}
        </label>
        <DatePicker
          selected={selected}
          onChange={change}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="block w-32 rounded-md bg-transparent px-3 py-1.5 text-xs  cursor-pointer border border-slate-300 text-end relative focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600"
        />
      </div>
    </div>
  );
};
