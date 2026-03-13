import React from "react";
import { Tabs } from "../../component/mayor";
import { Outlet } from "react-router-dom";
import {
  FolderArrowDownIcon,
  FolderMinusIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";

export const Transaksi = () => {
  const tabs = [
    {
      name: "Permintaan",
      href: "/ims/transaksi",
      icon: FolderArrowDownIcon,
      roles: ["ADMIN", "USER"],
    },
    {
      name: "Pengiriman",
      href: "/ims/transaksi/kirim",
      icon: FolderMinusIcon,
      roles: ["ADMIN", "USER"],
    },

    {
      name: "Pemasukan",
      href: "/ims/transaksi/masuk",
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
