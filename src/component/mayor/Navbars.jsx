import React, { Fragment, useContext } from "react";
import { SearchConsum, SideConsum } from "../../contex/GlobalContex";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import {
  BellAlertIcon,
  ChevronDownIcon,
  ListBulletIcon,
  MagnifyingGlassCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useDailyNotif } from "../../api/permintaan";
import moment from "moment/moment";

export const Navbars = () => {
  const [search, setSearch] = useContext(SearchConsum);
  const [sidebarOpen, setSidebarOpen] = useContext(SideConsum);
  const { data } = useDailyNotif();

  const handleLogut = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };
  const nama = sessionStorage.getItem("nama");
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <ListBulletIcon className="w-6" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <MagnifyingGlassCircleIcon
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm outline-none"
            placeholder="Search..."
            type="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <BellAlertIcon className="w-6" />
          </button>
          <Popover className={"relative"}>
            <PopoverButton>
              <p className="absolute bg-rose-500 text-white right-3 -top-4 h-6 w-6 rounded-full flex items-center justify-center">
                <button className="text-xs font-semibold ">
                  {data && data.length}
                </button>
              </p>
            </PopoverButton>
            <PopoverPanel className="flex flex-col absolute top-5 right-0 z-10">
              <div className="w-96 bg-transparent backdrop-blur-lg p-5 rounded border h-96 overflow-y-scroll border-slate-300">
                {data &&
                  data.map((e, idx) => {
                    return (
                      <div
                        className="border my-2 w-full  p-2 rounded relative bg-white cursor-pointer border-slate-300"
                        key={idx}
                      >
                        <p className="font-semibold">{e.status}</p>
                        <p className="text-sm capitalize an">{e.judul}</p>
                        <p className="text-xs absolute right-0 top-0 bg-cyan-600 text-white px-5 py-1 rounded-bl rounded-tr truncate">
                          {e.cabang["nama"]}
                        </p>
                        <p className="text-rose-600 font-semibold text-sm ">
                          {moment(e.tanggal).format("DD/MM/Y HH:mm")}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </PopoverPanel>
          </Popover>

          {/* Separator */}
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
            aria-hidden="true"
          />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src={`https://ui-avatars.com/api/?name=${nama}&background=random`}
                alt=""
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  {nama}
                </span>
                <ChevronDownIcon className="w-5" color="gray" />
              </span>
            </MenuButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <MenuItem>
                  <a
                    className="ms-3 cursor-pointer flex flex-row"
                    onClick={handleLogut}
                  >
                    <span>Log out </span>
                    <ArrowRightStartOnRectangleIcon className="w-4 text-slate-600 font-extralight ms-2" />
                  </a>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};
