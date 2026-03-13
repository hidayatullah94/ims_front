import React from "react";
import { Outlet } from "react-router-dom";
import { Tabs } from "../../component/mayor";
import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const Master = () => {
  const tabs = [
    {
      name: "Divisi",
      href: "/ims/master",
      icon: UserGroupIcon,
    },
    {
      name: "Cabang",
      href: "/ims/master/cabang",
      icon: BuildingOffice2Icon,
    },

    {
      name: "User",
      href: "/ims/master/user",
      icon: UsersIcon,
    },
    {
      name: "Pekerjaan",
      href: "/ims/master/pekerjaan",
      icon: BriefcaseIcon,
    },
  ];
  return (
    <div className="bg-white min-h-145 sm:px-5 px-2 rounded">
      <Tabs idx={0} tabs={tabs} />

      <Outlet />
    </div>
  );
};
