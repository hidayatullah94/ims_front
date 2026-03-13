import React, { useState } from "react";
import { useJasa } from "../../api/jasa";
import { Eroors, Founds, Loadings, MonthRange } from "../../component/mayor";
import { Tbodys, Theads } from "../../component/tabel";
import moment from "moment";

export const ReptJasa = () => {
  const [queri, setQueri] = useState({
    bulan: new Date(),
    status: "All",
  });

  const { data, isLoading, error } = useJasa({
    bulan: queri.bulan,
    status: queri.status,
  });
  if (isLoading) return <Loadings />;
  if (error) return <Eroors />;

  return (
    <div>
      {" "}
      <div className="">
        <div className="flex items-center gap-6">
          <MonthRange
            selected={queri.bulan}
            change={(date) =>
              setQueri((prev) => ({
                ...prev,
                bulan: date,
              }))
            }
          />

          <div className="relative sm:col-span-2">
            <label
              htmlFor="name"
              className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
            >
              Status
            </label>
            <select
              id="location"
              defaultValue={queri.status}
              className="block w-full rounded-md bg-white px-7 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-xs"
              onChange={(e) =>
                setQueri((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
            >
              <option value={"All"}>Semua</option>
              <option value={"PENDING"}>Pending</option>
              <option value={"REJECTED"}>Tolak</option>
              <option value={"APPROVED"}>Disetujui</option>
            </select>
          </div>
        </div>

        {data && data.length ? (
          <div className="my-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded">
                  <table className="relative min-w-full divide-y divide-gray-300">
                    <Theads
                      th1={"Tanggal"}
                      th2={"kode"}
                      th3={"Prihal"}
                      th4={"Cabang"}
                      th5={"status"}
                      th6={"keterangan"}
                    />
                    {data &&
                      data.map((e) => {
                        return (
                          <Tbodys
                            key={e.id}
                            tb1={moment(e.tanggal).format("DD-MM-Y")}
                            tb2={e.kode}
                            tb3={e.judul}
                            tb4={e.cabang["nama"]}
                            tb5={
                              <span
                                className={
                                  e.status === "PENDING"
                                    ? "bg-orange-200/70 px-3 rounded py-1 text-orange-600 font-semibold "
                                    : e.status === "REJECTED"
                                      ? "bg-rose-200/70 px-3 rounded py-1 text-rose-600 font-semibold "
                                      : "bg-emerald-200/70 px-3 rounded py-1 text-emerald-600 font-semibold "
                                }
                              >
                                {e.status}
                              </span>
                            }
                            tb6={e.keterangan === null ? "--" : e.keterangan}
                          />
                        );
                      })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Founds />
        )}
      </div>
    </div>
  );
};
