import React from "react";

export const Theads = ({
  th1,
  th2,
  th3,
  th4,
  th5,
  th6,
  th7,
  th8,
  th9,
  th10,
  th11,
  th12,
  th13,
  th14,
  th15,
  th16,
  size = "sm",
}) => {
  const headers = [
    th1,
    th2,
    th3,
    th4,
    th5,
    th6,
    th7,
    th8,
    th9,
    th10,
    th11,
    th12,
    th13,
    th14,
    th15,
    th16,
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
    <thead className="bg-gray-50">
      <tr>
        {headers.slice(0, limit).map((th, idx) => (
          <th
            key={idx}
            scope="col"
            className={`${
              idx === 0
                ? "py-3.5 pr-3 pl-4 text-left text-xs font-semibold text-gray-900 sm:pl-6 capitalize"
                : "px-3 py-3.5 text-left text-xs font-semibold text-gray-900 capitalize"
            }`}
          >
            {th}
          </th>
        ))}
      </tr>
    </thead>
  );
};
