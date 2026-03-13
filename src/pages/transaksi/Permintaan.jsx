import React, { useState } from "react";
import {
  Backs,
  Buttons,
  Eroors,
  Founds,
  Loadings,
  MonthRange,
} from "../../component/mayor";
import { Tbodys, Theads } from "../../component/tabel";
import {
  FormPemasukan,
  FormPengiriman,
  FormPermintaan,
} from "../../component/form";
import { Roles } from "../../lib";
import {
  addPermintaan,
  appPermintaan,
  useDetailPermintaan,
  usePermintaan,
} from "../../api/permintaan";
import moment from "moment/moment";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import {
  CheckBadgeIcon,
  DocumentPlusIcon,
  EyeIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";
import { CardPermintaan } from "../../component/card";
import { classNames } from "../../action";
import { addPengiriman } from "../../api/pengiriman";
import { addPemasukan } from "../../api/pemasukan";

export const Permintaan = () => {
  const [create, setCreate] = useState(false);
  const [detail, setDetail] = useState({
    open: false,
    id: null,
    send: false,
    purchase: false,
    approv: false,
  });
  const [queri, setQueri] = useState({
    bulan: new Date(),
    status: "All",
  });
  const { data, isLoading, error, refetch } = usePermintaan({
    status: queri.status,
    bulan: queri.bulan,
  });
  const {
    data: REQ,
    isLoading: loadREQ,
    error: errREQ,
    refetch: fetchREQ,
  } = useDetailPermintaan(detail.id);

  //mutasi
  const { mutate, isPending } = addPermintaan({
    onSuccess: () => {
      toast.success("Permintaan berhasil dibuat!");
      setTimeout(() => {
        setCreate(false);
        refetch();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 500) {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });
  const { mutate: muteApp } = appPermintaan({
    onSuccess: () => {
      toast.success("Permintaan berhasil diApprove!");
      setTimeout(() => {
        setDetail({
          open: false,
          id: null,
        });
        refetch();
        fetchREQ();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 500) {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });
  const { mutate: muteSend } = addPengiriman({
    onSuccess: () => {
      toast.success("Pengiriman berhasil dibuat!");
      setTimeout(() => {
        setDetail({
          open: false,
          id: null,
        });
        refetch();
        fetchREQ();
        window.location.replace("/ims/transaksi/kirim");
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 500) {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });
  const { mutate: mutePur } = addPemasukan({
    onSuccess: () => {
      toast.success("Pengadaan berhasil dibuat!");
      setTimeout(() => {
        setDetail({
          open: false,
          id: null,
        });
        refetch();
        fetchREQ();
        window.location.replace("/ims/transaksi/masuk");
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 500) {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });

  const SavePermintaan = (data) => {
    let formData = new FormData();
    formData.append("memo", data.memo[0]);
    formData.append("lk", data.lk[0]);
    formData.append("wo", data.wo[0]);
    formData.append("judul", data.judul);
    formData.append("pekerjaanID", data.pekerjaanID);
    formData.append("detail", JSON.stringify(data.detail));

    confirmAlert({
      title: "Konfirmasi kirim data ",
      message: "Apakah kamu yakin ingin mengirim data ?",
      buttons: [
        {
          label: "Yee",
          onClick: () => mutate(formData),
        },
        {
          label: "Tidak",
        },
      ],
    });
  };
  const SaveSend = (data) => {
    confirmAlert({
      title: "Konfirmasi kirim data ",
      message: "Apakah kamu yakin ingin mengirim data ?",
      buttons: [
        {
          label: "Yee",
          onClick: () => muteSend(data),
        },
        {
          label: "Tidak",
        },
      ],
    });
  };
  const SaveApp = (data) => {
    confirmAlert({
      title: "Konfirmasi kirim data ",
      message: "Apakah kamu yakin ingin mengirim data ?",
      buttons: [
        {
          label: "Yee",
          onClick: () => muteApp({ id: detail.id, data }),
        },
        {
          label: "Tidak",
        },
      ],
    });
  };
  const SavePurchase = (data) => {
    confirmAlert({
      title: "Konfirmasi kirim data ",
      message: "Apakah kamu yakin ingin mengirim data ?",
      buttons: [
        {
          label: "Yee",
          onClick: () => mutePur(data),
        },
        {
          label: "Tidak",
        },
      ],
    });
  };

  if (isLoading || loadREQ) return <Loadings />;
  if (error || errREQ) return <Eroors />;
  return (
    <div>
      {detail.approv ? (
        <>
          <Backs
            click={() =>
              setDetail({
                approv: false,
                id: null,
              })
            }
          />
          <div className="mt-6">
            <FormPermintaan
              isApp={true}
              detail={REQ && REQ.detail}
              df1={REQ && REQ.judul}
              df2={REQ && REQ.pekerjaanID}
              Submit={SaveApp}
            />
          </div>
        </>
      ) : (
        <div className="">
          {detail.purchase ? (
            <div className="">
              <Backs
                click={() =>
                  setDetail({
                    id: null,
                    purchase: false,
                  })
                }
              />
              <div className="mt-6">
                <FormPemasukan
                  Submit={SavePurchase}
                  isPermintaan={true}
                  permintaanID={detail.id}
                  details={REQ && REQ.detail}
                />
              </div>
            </div>
          ) : (
            <div className="">
              {detail.send ? (
                <>
                  <Backs
                    click={() =>
                      setDetail({
                        send: false,
                        id: null,
                      })
                    }
                  />
                  <div className="mt-6">
                    <FormPengiriman
                      Submit={SaveSend}
                      cabang={REQ && REQ.cabang["nama"]}
                      cabangID={REQ && REQ.cabangID}
                      order={REQ && REQ.kode}
                      detail={REQ && REQ.detail}
                      permintaanID={REQ && REQ.id}
                    />
                  </div>
                </>
              ) : (
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
                        <CardPermintaan data={REQ && REQ} />
                      </div>
                    </div>
                  ) : (
                    <div className="">
                      {create ? (
                        <div className="flex flex-col gap-7">
                          <Backs click={() => setCreate(false)} />
                          <FormPermintaan
                            Submit={SavePermintaan}
                            dsb={isPending}
                          />
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
                                  <option value={"PENDING"}>Pending</option>
                                  <option value={"REJECTED"}>Tolak</option>
                                  <option value={"APPROVED"}>Disetujui</option>
                                </select>
                              </div>
                            </div>
                            {Roles === "USER" && (
                              <Buttons
                                label="Buat Permintaan"
                                klik={() => setCreate(true)}
                              />
                            )}
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
                                              tb1={moment(e.tanggal).format(
                                                "DD-MM-Y",
                                              )}
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
                                                  {Roles === "ADMIN" && (
                                                    <>
                                                      <button
                                                        className={
                                                          " cursor-pointer z-50 disabled:text-slate-400 disabled:cursor-not-allowed text-rose-700"
                                                        }
                                                        onClick={() =>
                                                          setDetail({
                                                            approv: true,
                                                            id: e.id,
                                                          })
                                                        }
                                                        disabled={
                                                          e.status ===
                                                            "APPROVED" ||
                                                          e.status ===
                                                            "REJECTED"
                                                        }
                                                      >
                                                        <CheckBadgeIcon className="w-5" />
                                                      </button>
                                                      <button
                                                        className={classNames(
                                                          e.pengiriman.length
                                                            ? "text-emerald-600"
                                                            : "text-rose-700",
                                                          " cursor-pointer z-50 disabled:text-slate-400 disabled:cursor-not-allowed",
                                                        )}
                                                        onClick={() =>
                                                          setDetail({
                                                            send: true,
                                                            id: e.id,
                                                          })
                                                        }
                                                        disabled={
                                                          e.status !==
                                                          "APPROVED"
                                                        }
                                                      >
                                                        <TruckIcon className="w-5" />
                                                      </button>

                                                      <button
                                                        className={classNames(
                                                          e.pengadaan.length
                                                            ? "text-orange-400"
                                                            : "text-emerald-600",
                                                          " cursor-pointer z-50 disabled:text-slate-400 disabled:cursor-not-allowed",
                                                        )}
                                                        disabled={
                                                          e.status !==
                                                          "APPROVED"
                                                        }
                                                        onClick={() =>
                                                          setDetail({
                                                            purchase: true,
                                                            id: e.id,
                                                          })
                                                        }
                                                      >
                                                        <DocumentPlusIcon className="w-5" />
                                                      </button>
                                                    </>
                                                  )}
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
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
