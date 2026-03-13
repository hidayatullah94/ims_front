import React from "react";
import { Tabs } from "../../component/mayor";
import { Outlet } from "react-router-dom";
import {
  BriefcaseIcon,
  FolderArrowDownIcon,
  FolderMinusIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";
export const Reports = () => {
  const tabs = [
    {
      name: "Permintaan",
      href: "/ims/report",
      icon: FolderArrowDownIcon,
      roles: ["ADMIN", "USER"],
    },
    {
      name: "Pengiriman",
      href: "/ims/report/kirim",
      icon: FolderMinusIcon,
      roles: ["ADMIN", "USER"],
    },
    {
      name: "Jasa",
      href: "/ims/report/jasa",
      icon: BriefcaseIcon,
      roles: ["ADMIN", "USER"],
    },
    {
      name: "Pemasukan",
      href: "/ims/report/masuk",
      icon: FolderPlusIcon,
      roles: ["ADMIN"],
    },
  ];

  return (
    <div>
      {" "}
      <div className="bg-white min-h-145 sm:px-5 px-2 rounded ">
        <Tabs idx={0} tabs={tabs} />
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
