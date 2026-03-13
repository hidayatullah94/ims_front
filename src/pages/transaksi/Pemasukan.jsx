import React, { useState } from "react";
import {
  addPemasukan,
  useDetailPemasukan,
  usePemasukan,
} from "../../api/pemasukan";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import {
  Backs,
  Buttons,
  Eroors,
  Founds,
  Loadings,
  MonthRange,
} from "../../component/mayor";
import { Tbodys, Theads } from "../../component/tabel";
import { FormPemasukan } from "../../component/form";
import { EyeIcon } from "@heroicons/react/24/outline";
import moment from "moment/moment";
import { Roles } from "../../lib";
import { CardPemasukan } from "../../component/card";

export const Pemasukan = () => {
  const [create, setCreate] = useState(false);
  const [detail, setDetail] = useState({
    open: false,
    id: null,
    send: false,
  });
  const [queri, setQueri] = useState(new Date());

  const { data, isLoading, error, refetch } = usePemasukan(queri);
  const {
    data: ORD,
    isLoading: loadORD,
    error: errORD,
  } = useDetailPemasukan(detail.id);

  //mutasi
  const { mutate, isPending } = addPemasukan({
    onSuccess: () => {
      toast.success("Pemasukan berhasil dibuat!");
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

  const SavePermintaan = (data) => {
    confirmAlert({
      title: "Konfirmasi kirim data ",
      message: "Apakah kamu yakin ingin mengirim data ?",
      buttons: [
        {
          label: "Yee",
          onClick: () => mutate(data),
        },
        {
          label: "Tidak",
        },
      ],
    });
  };
  if (isLoading || loadORD) return <Loadings />;
  if (errORD || error) return <Eroors />;

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
              <CardPemasukan
                judul={ORD && ORD.judul}
                no_inv={ORD && ORD.no_invoice}
                no_permintaan={
                  ORD && ORD.permintaanID === null
                    ? "--"
                    : ORD && ORD.permintaan["kode"]
                }
                order={ORD && ORD.kode}
                tanggal={moment(ORD && ORD.tanggal).format("DD-MM-Y")}
                detail={ORD && ORD.detail}
              />
            </div>
          </div>
        ) : (
          <div className="">
            {create ? (
              <div className="flex flex-col gap-4">
                <Backs click={() => setCreate(false)} />
                <FormPemasukan Submit={SavePermintaan} dsb={isPending} />
              </div>
            ) : (
              <div className="">
                <div className="flex justify-between mt-7 items-end">
                  <MonthRange
                    selected={queri}
                    change={(date) => setQueri(date)}
                  />
                  {Roles === "ADMIN" && (
                    <Buttons
                      label="Buat Pemasukan"
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
                              th3={"Judul"}
                              th4={"Kode Permintaan"}
                              th5={"No PR"}
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
                                    tb4={
                                      e.permintaanID === null
                                        ? "--"
                                        : e.permintaan["kode"]
                                    }
                                    tb5={e.no_invoice}
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
        )}
      </div>
    </div>
  );
};
