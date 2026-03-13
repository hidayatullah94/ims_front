import React from "react";

export const Tbodys = ({
  tb1,
  tb2,
  tb3,
  tb4,
  tb5,
  tb6,
  tb7,
  tb8,
  tb9,
  tb10,
  tb11,
  tb12,
  tb13,
  tb14,
  tb15,
  tb16,
  size = "sm",
}) => {
  const cells = [
    tb1,
    tb2,
    tb3,
    tb4,
    tb5,
    tb6,
    tb7,
    tb8,
    tb9,
    tb10,
    tb11,
    tb12,
    tb13,
    tb14,
    tb15,
    tb16,
  ];

  const sizeMap = {
    sm: 6,
    md: 8,
    lg: 10,
    xl: 12,
    "2xl": 14,
    "3xl": 16,
  };

  const limit = sizeMap[size] || 6;
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr>
        {cells.slice(0, limit).map((cell, idx) => (
          <td
            key={idx}
            className={`${
              idx === 0
                ? "py-3.5 pr-3 pl-4 text-left text-xs font-semibold text-gray-900 sm:pl-6 capitalize"
                : "px-3 py-3.5 text-left text-xs  text-gray-500 capitalize"
            }`}
          >
            {cell}
          </td>
        ))}
      </tr>
    </tbody>
  );
};
