import React, { useState } from "react";
import { addJasa, appJasa, useDetailJasa, useJasa } from "../../api/jasa";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import {
  Backs,
  Buttons,
  Eroors,
  Founds,
  Loadings,
  MonthRange,
} from "../../component/mayor";
import { Tbodys, Theads } from "../../component/tabel";
import { CardJasa } from "../../component/card";
import { FormJasa } from "../../component/form";
import { CheckBadgeIcon, EyeIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import { Roles } from "../../lib";
import { romawi } from "../../action";

export const JasaTrans = () => {
  const [create, setCreate] = useState(false);
  const [detail, setDetail] = useState({
    open: false,
    id: null,
    approv: false,
  });
  const [queri, setQueri] = useState({
    bulan: new Date(),
    status: "All",
  });

  const { data, isLoading, error, refetch } = useJasa({
    bulan: queri.bulan,
    status: queri.status,
  });
  const {
    data: JASA,
    isLoading: loadJAS,
    error: errJAS,
    refetch: fetchJas,
  } = useDetailJasa(detail.id);

  //mutasi
  const { mutate, isPending } = addJasa({
    onSuccess: () => {
      toast.success("Permintaan Jasa berhasil dibuat!");
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
  const { mutate: muteApp } = appJasa({
    onSuccess: () => {
      toast.success("Permintaan jasa berhasil diApprove!");
      setTimeout(() => {
        setDetail({
          open: false,
          id: null,
          approv: false,
        });
        refetch();
        fetchJas();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 500) {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });
  const SavePermintaanJasa = (data) => {
    let formData = new FormData();
    formData.append("dokumen", data.dokumen[0]);
    formData.append("detail", JSON.stringify(data.detail));
    formData.append("judul", data.judul);
    formData.append("pekerjaanID", data.pekerjaanID);
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
  if (isLoading || loadJAS) return <Loadings />;
  if (errJAS || error) return <Eroors />;

  return (
    <div className="bg-white sm:px-5 px-2 py-1 rounded shadow ">
      {detail.approv ? (
        <div className="my-5">
          <Backs
            click={() =>
              setDetail({
                approv: false,
                id: null,
              })
            }
          />
          <div className="mt-5">
            <FormJasa
              Submit={SaveApp}
              isApp={true}
              detail={JASA && JASA.detail}
              df1={JASA && JASA.judul}
              df2={JASA && JASA.pekerjaanID}
            />
          </div>
        </div>
      ) : (
        <div className="">
          {detail.open ? (
            <div className="mt-5">
              <Backs
                click={() =>
                  setDetail({
                    open: false,
                    id: null,
                  })
                }
              />
              <div className="my-6 pb-6">
                <CardJasa
                  cabang={JASA && JASA.cabang["nama"]}
                  detail={JASA && JASA.detail}
                  judul={JASA && JASA.judul}
                  status={JASA && JASA.status}
                  kode={JASA && JASA.kode}
                  tanggal={moment(JASA && JASA.tanggal).format("DD/MM/Y")}
                  keterangan={JASA && JASA.keterangan}
                  kodeMemo={JASA && JASA.pekerjaan.nomor}
                  nama={JASA && JASA.user.nama}
                  ttd={JASA && JASA.user.ttd}
                  ruas={JASA && JASA.cabang["ruas"]}
                  pekerjaan={JASA && JASA.pekerjaan.keterangan}
                  nomor={`No : ${JASA && JASA.id}/${JASA && JASA.pekerjaan["nomor"]}/${romawi[moment(JASA && JASA.tanggal).format("M")]}/${moment(JASA && JASA.tanggal).format("Y")}`}
                />
              </div>
            </div>
          ) : (
            <div className="">
              {create ? (
                <div className="flex flex-col gap-4 mt-5">
                  <Backs click={() => setCreate(false)} />
                  <FormJasa Submit={SavePermintaanJasa} dsb={isPending} />
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
                        label="Buat Permintaan Jasa"
                        klik={() => setCreate(true)}
                      />
                    )}
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
                                            <button
                                              className="text-rose-700 cursor-pointer z-50 disabled:text-slate-400 disabled:cursor-not-allowed"
                                              onClick={() =>
                                                setDetail({
                                                  approv: true,
                                                  id: e.id,
                                                })
                                              }
                                              disabled={e.status !== "PENDING"}
                                            >
                                              <CheckBadgeIcon className="w-5" />
                                            </button>
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
  );
};
