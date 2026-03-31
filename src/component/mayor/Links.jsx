import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TogleConsum } from "../../contex/GlobalContex";
import {
  BriefcaseIcon,
  ChartPieIcon,
  ClipboardDocumentIcon,
  CubeIcon,
  PresentationChartLineIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { Roles } from "../../lib";

export const Links = () => {
  const [togle, setTogle] = useContext(TogleConsum);

  const navigation = [
    {
      name: "Dashboard",
      href: "/ims",
      icon: ChartPieIcon,
      id: 1,
      initial: "DS",
      Role: ["ADMIN", "USER"],
    },
    {
      name: "Transaksi Barang",
      href: "/ims/transaksi",
      icon: ClipboardDocumentIcon,
      id: 2,
      initial: "TB",
      Role: ["ADMIN", "USER"],
    },
    {
      name: "Transaksi Jasa",
      href: "/ims/transaksi/jasa",
      icon: BriefcaseIcon,
      id: 6,
      initial: "TJ",
      Role: ["ADMIN", "USER"],
    },
    {
      name: "Barang",
      href: "/ims/barang",
      icon: CubeIcon,
      id: 3,
      initial: "BR",
      Role: ["ADMIN", "USER"],
    },
    {
      name: "Master",
      href: "/ims/master",
      icon: RectangleStackIcon,
      id: 4,
      initial: "MS",
      Role: ["ADMIN"],
    },
    {
      name: "Reports",
      href: "/ims/report",
      icon: PresentationChartLineIcon,
      id: 5,
      initial: "RP",
      Role: ["ADMIN", "USER"],
    },
  ];

  const storedValueAsNumber = Number(sessionStorage.getItem("count"));
  //nav link
  const [active, setActive] = useState(
    Number.isInteger(storedValueAsNumber) ? storedValueAsNumber : 1,
  );
  useEffect(() => {
    sessionStorage.setItem("count", String(active));
  }, [active]);
  const filteredNavigation = navigation.filter((item) =>
    item.Role.includes(Roles),
  );
  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {filteredNavigation.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.href}
                  onClick={() => setActive(item.id)}
                  className={
                    active === item.id
                      ? "group flex gap-x-3 rounded-md py-2 text-sm font-semibold text-cyan-100 bg-cyan-600 pl-2 pr-8"
                      : "group flex gap-x-3 py-2 text-sm font-semibold text-slate-400 hover:text-cyan-50 hover:bg-cyan-900 rounded-md pl-2 pr-8"
                  }
                >
                  <item.icon
                    className={
                      active === item.id
                        ? "h-6 w-6 text-cyan-100"
                        : "h-6 w-6 text-slate-400 group-hover:text-cyan-50 "
                    }
                  />
                  <span className={togle ? "hidden" : ""}>{item.name}</span>
                  <span className={togle ? "absolute " : "hidden"}>
                    {item.initial}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};
