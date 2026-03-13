import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../action";
import { Tab } from "@headlessui/react";
import { Roles } from "../../lib";

export const Tabs = ({ idx, tabs, change, selec }) => {
  const navigate = useNavigate();

  const filteredTabs = tabs.filter(
    (tab) => !tab.roles || tab.roles.includes(Roles),
  );

  return (
    <div className="border-b border-gray-200">
      <nav aria-label="Tabs">
        <Tab.Group selectedIndex={selec} onChange={change} defaultIndex={idx}>
          <Tab.List className="flex justify-center flex-wrap md:flex-nowrap">
            {filteredTabs.map((tab, idx) => (
              <Tab as={Fragment} key={idx}>
                {({ selected }) => (
                  <button
                    onClick={() => navigate(tab.href)}
                    className={classNames(
                      selected
                        ? "border-sky-500 text-sky-600 font-semibold"
                        : "border-transparent text-gray-500 hover:border-sky-300 hover:text-sky-600",
                      "w-1/3 max-w-sm border-b-2 py-3 px-1 text-center text-sm flex justify-center items-center gap-2 outline-none",
                    )}
                  >
                    <p className="truncate">{tab.name}</p>
                    <tab.icon
                      aria-hidden="true"
                      className={classNames(
                        selected
                          ? "text-sky-600"
                          : "text-gray-400 group-hover:text-sky-500",
                        "h-5 w-5 hidden sm:flex",
                      )}
                    />
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </nav>
    </div>
  );
};
