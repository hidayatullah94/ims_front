import React, { useState } from "react";
import {
  appPengiriman,
  useDetailPengiriman,
  usePengiriman,
} from "../../api/pengiriman";
import {
  Backs,
  Eroors,
  Founds,
  Loadings,
  MonthRange,
} from "../../component/mayor";
import { Tbodys, Theads } from "../../component/tabel";
import moment from "moment";
import { EyeIcon } from "@heroicons/react/20/solid";
import { CardPengiriman } from "../../component/card";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";

export const Pengiriman = () => {
  const [detail, setDetail] = useState({
    open: false,
    id: null,
    send: false,
  });
  const [queri, setQueri] = useState({
    bulan: new Date(),
    status: "All",
  });
  const { data, isLoading, error, refetch } = usePengiriman({
    status: queri.status,
    bulan: queri.bulan,
  });
  const {
    data: SEND,
    isLoading: loadSEND,
    error: errSEND,
    refetch: fetchSEND,
  } = useDetailPengiriman(detail.id);

  //mutasi
  const { mutate } = appPengiriman({
    onSuccess: () => {
      toast.success("Pengiriman berhasil diterima!");
      setTimeout(() => {
        setDetail({
          open: false,
          id: null,
        });
        refetch();
        fetchSEND();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 500) {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });
  const SaveApp = (data) => {
    confirmAlert({
      title: "Konfirmasi kirim data ",
      message: "Apakah kamu yakin ingin mengirim data ?",
      buttons: [
        {
          label: "Yee",
          onClick: () => mutate({ id: detail.id, data }),
        },
        {
          label: "Tidak",
        },
      ],
    });
  };

  if (isLoading || loadSEND) return <Loadings />;
  if (error || errSEND) return <Eroors />;

  return (
    <div>
      <div className="">
        {detail.open ? (
          <div>
            <Backs
              click={() =>
                setDetail({
                  open: false,
                  id: null,
                })
              }
            />
            <div className="my-6 pb-6">
              <CardPengiriman
                order={SEND && SEND.kode}
                judul={SEND && SEND.judul}
                cabang={SEND && SEND.cabang["nama"]}
                detail={SEND && SEND.detail}
                status={SEND && SEND.status}
                tglsend={moment(SEND && SEND.tanggal).format("DD-MM-Y")}
                tglApp={
                  SEND && SEND.status
                    ? moment(SEND && SEND.tanggalDone).format("DD-MM-Y")
                    : "--"
                }
                SaveApp={SaveApp}
                diff={
                  SEND && SEND.tanggalDone === null
                    ? "--"
                    : moment(SEND && SEND.tanggalDone).diff(
                        SEND && SEND.tanggal,
                        "day",
                      )
                }
                kode={SEND && SEND.permintaan["kode"]}
              />
            </div>
          </div>
        ) : (
          <div className="">
            <div className="flex justify-between mt-7 items-end">
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
                    <option value={true}>Diterima</option>
                    <option value={false}>Belum</option>
                  </select>
                </div>
              </div>
            </div>
            {data && data.length ? (
              <div className="mt-8 flow-root">
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
                          th6={"Aksi"}
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
                                      e.status
                                        ? "bg-emerald-200/70 px-3 rounded py-1 text-emerald-600 font-semibold "
                                        : "rounded py-1 px-3 text-orange-600 font-semibold bg-orange-200/70 "
                                    }
                                  >
                                    {e.status ? "Diterima" : "Pending"}
                                  </span>
                                }
                                tb6={
                                  <div div className="flex gap-5">
                                    <button
                                      className="text-cyan-500 cursor-pointer z-50 "
                                      onClick={() =>
                                        setDetail({
                                          open: true,
                                          id: e.id,
                                        })
                                      }
                                    >
                                      <EyeIcon className="w-5" />
                                    </button>
                                  </div>
                                }
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
        )}
      </div>
    </div>
  );
};
