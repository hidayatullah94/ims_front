import React from "react";
import {
  CheckIcon,
  ClipboardDocumentCheckIcon,
  DocumentPlusIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";
import { classNames } from "../../action";

export const TimeLine = ({
  isCheck,
  isAdd,
  isSend,
  isDone,
  addTgl,
  checkTgl,
  sendTgl,
  donTgl,
  diff,
}) => {
  return (
    <div className="flow-root my-5 w-full border p-3 border-slate-300 rounded">
      <ul role="list" className="-mb-8 flex w-full ">
        <li className="w-full">
          <div className="relative pb-8 ">
            <span
              aria-hidden="true"
              className={classNames(
                isAdd ? "bg-emerald-500" : "bg-slate-400",
                "absolute top-4 left-0  h-0.5 w-full   ",
              )}
            />

            <div className="relative flex space-x-3 w-full">
              <div>
                <span
                  className={classNames(
                    isAdd
                      ? "bg-emerald-500 text-emerald-50"
                      : "bg-slate-400 text-slate-100",
                    "flex size-8 items-center justify-center rounded-full ring-8 ring-white ",
                  )}
                >
                  <DocumentPlusIcon className="size-5 " />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5 mt-4 relative">
                <p className="absolute text-xs right-0 text-rose-600">
                  {addTgl}
                </p>
                <p className="text-sm text-gray-500  w-full">Dibuat</p>
              </div>
            </div>
          </div>
        </li>
        <li className="w-full">
          <div className="relative pb-8 ">
            <span
              aria-hidden="true"
              className={classNames(
                isCheck ? "bg-emerald-500" : "bg-slate-400",
                "absolute top-4 left-0  h-0.5 w-full  ",
              )}
            />

            <div className="relative flex space-x-3 w-full">
              <div>
                <span
                  className={classNames(
                    isCheck
                      ? "bg-emerald-500 text-emerald-50"
                      : "bg-slate-400 text-slate-100",
                    "flex size-8 items-center justify-center rounded-full ring-8 ring-white ",
                  )}
                >
                  <ClipboardDocumentCheckIcon className="size-5 " />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5 mt-4 relative">
                <p className="absolute text-xs right-0 text-rose-600">
                  {checkTgl}
                </p>
                <p className="text-sm text-gray-500  w-full">Diproses</p>
              </div>
            </div>
          </div>
        </li>
        <li className="w-full">
          <div className="relative pb-8 ">
            <span
              aria-hidden="true"
              className={classNames(
                isSend ? "bg-emerald-500" : "bg-slate-400",
                "absolute top-4 left-0  h-0.5 w-full  ",
              )}
            />

            <div className="relative flex space-x-3 w-full">
              <div>
                <span
                  className={classNames(
                    isSend
                      ? "bg-emerald-500 text-emerald-50"
                      : "bg-slate-400 text-slate-100",
                    "flex size-8 items-center justify-center rounded-full ring-8 ring-white ",
                  )}
                >
                  <TruckIcon className="size-5 " />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5 mt-4 relative">
                <p className="absolute text-xs right-0 text-rose-600">
                  {sendTgl}
                </p>
                <p className="text-sm text-gray-500  w-full">Pengiriman</p>
              </div>
            </div>
          </div>
        </li>
        <li className="w-full">
          <div className="relative pb-8 ">
            <div className="relative flex space-x-3 w-full">
              <div>
                <span
                  className={classNames(
                    isDone
                      ? "bg-emerald-500 text-emerald-50"
                      : "bg-slate-400 text-slate-100",
                    "flex size-8 items-center justify-center rounded-full ring-8 ring-white ",
                  )}
                >
                  <CheckIcon className="size-5 " />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5 mt-4 relative">
                <p className="absolute text-xs left-6 -top-3 text-rose-600">
                  {donTgl}
                </p>
                <p className="text-sm text-gray-500  w-full">Selesai</p>
                <p className="font-bold flex gap-1 items-end text-rose-700">
                  {diff}{" "}
                  <span className="text-xs font-medium text-slate-700">
                    Hari
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
