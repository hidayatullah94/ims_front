import React from "react";
import { Tabs } from "../../component/mayor";
import { Outlet } from "react-router-dom";
import { ArchiveBoxArrowDownIcon, TagIcon } from "@heroicons/react/24/outline";

export const Barang = () => {
  const tabs = [
    {
      name: "Barang",
      href: "/ims/barang",
      icon: ArchiveBoxArrowDownIcon,
      roles: ["ADMIN", "USER"],
    },
    {
      name: "Kategori",
      href: "/ims/barang/kategori",
      icon: TagIcon,
      roles: ["ADMIN"],
    },
  ];
  return (
    <div className="bg-white min-h-145 sm:px-5 px-2 rounded">
      <Tabs idx={0} tabs={tabs} />
      <Outlet />
    </div>
  );
};
