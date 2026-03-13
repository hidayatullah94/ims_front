import React, { createContext, useState } from "react";
export const TogleConsum = createContext();
export const SearchConsum = createContext();
export const SideConsum = createContext();

export const GlobalContex = ({ children }) => {
  const [search, setSearch] = useState("");
  const [togle, setTogle] = useState(false);
  const [side, setSide] = useState(false);
  return (
    <TogleConsum.Provider value={[togle, setTogle]}>
      <SearchConsum.Provider value={[search, setSearch]}>
        <SideConsum.Provider value={[side, setSide]}>
          {children}
        </SideConsum.Provider>
      </SearchConsum.Provider>
    </TogleConsum.Provider>
  );
};
