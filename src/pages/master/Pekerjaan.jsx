import React, { useContext, useState } from "react";
import {
  addPekerjaan,
  editPekerjaan,
  useCabang,
  useDetailPekerjaan,
  usePekerjaan,
} from "../../api/masters";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { Buttons, Eroors, Founds, Loadings } from "../../component/mayor";
import { Tbodys, Theads } from "../../component/tabel";
import { FormPekerjaan } from "../../component/form";
import moment from "moment";
import { Roles } from "../../lib";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { SearchConsum } from "../../contex/GlobalContex";

export const Pekerjaan = () => {
  const [create, setCreate] = useState(false);
  const [search] = useContext(SearchConsum);
  const [detail, setDetail] = useState({
    open: false,
    id: null,
  });
  const [queri, setQueri] = useState({
    status: "All",
    cabang: "All",
  });
  const { data, isLoading, error, refetch } = usePekerjaan({
    status: queri.status,
    cabang: queri.cabang,
  });
  const { data: Cabang } = useCabang();
  const {
    data: PEKERJAAN,
    isLoading: loadKer,
    error: errKer,
    refetch: fetchKer,
  } = useDetailPekerjaan(detail.id);

  //mutasi
  const { mutate, isPending } = addPekerjaan({
    onSuccess: () => {
      toast.success("Pekerjaan berhasil dibuat!");
      setTimeout(() => {
        setCreate(false);
        refetch();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 400) {
        toast.error("Kode Pekerjaan sudah ada !");
      } else {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });

  const { mutate: mutateUpdate, isPending: pendingUpdate } = editPekerjaan({
    onSuccess: () => {
      toast.success("Pekerjaan berhasil diupdate!");
      setTimeout(() => {
        setDetail({
          open: false,
          id: null,
        });
        refetch();
        fetchKer();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 500) {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });
  //send
  const SavePekerjaan = (data) => {
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
  const UpdatePekerjaan = (data) => {
    confirmAlert({
      title: "Update Data  !",
      message: "Apkah kamu yakin ingin mengupdate data ?",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            mutateUpdate({ id: detail.id, data });
          },
        },
        {
          label: "Tidak",
        },
      ],
    });
  };

  if (isLoading || loadKer) return <Loadings />;
  if (error || errKer) return <Eroors />;
  return (
    <div>
      {" "}
      <div>
        <div className="flex justify-between mt-7 items-end">
          <div className="flex gap-6">
            <div className="relative ">
              <label
                htmlFor="name"
                className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
              >
                Cabang
              </label>
              <select
                id="location"
                defaultValue={queri.cabang}
                className="block w-full rounded-md bg-white px-7 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-xs"
                onChange={(e) =>
                  setQueri((prev) => ({
                    ...prev,
                    cabang: e.target.value,
                  }))
                }
              >
                <option value={"All"}>Semua</option>
                {Cabang &&
                  Cabang.map((e) => {
                    return <option value={e.id}>{e.nama}</option>;
                  })}
              </select>
            </div>
            <div className="relative ">
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
                <option value={true}>Aktif</option>
                <option value={false}>Tidak</option>
              </select>
            </div>
          </div>
          {Roles === "ADMIN" && (
            <Buttons label="Buat Pekerjaan" klik={() => setCreate(true)} />
          )}
        </div>
        {create ? (
          <FormPekerjaan
            close={() => setCreate(false)}
            Submit={SavePekerjaan}
            dsb={isPending}
            title={"Buat Pekerjaan"}
          />
        ) : null}

        {detail.open ? (
          <FormPekerjaan
            Submit={UpdatePekerjaan}
            close={() =>
              setDetail({
                open: false,
                id: null,
              })
            }
            dsb={pendingUpdate}
            df1={PEKERJAAN && PEKERJAAN.kode}
            df2={PEKERJAAN && PEKERJAAN.nomorKontrak}
            df3={PEKERJAAN && PEKERJAAN.nomor}
            df4={PEKERJAAN && PEKERJAAN.tanggalKontrak}
            df5={PEKERJAAN && PEKERJAAN.cabangID}
            df6={PEKERJAAN && PEKERJAAN.keterangan}
            df7={PEKERJAAN && PEKERJAAN.status}
            isUpdate={true}
            title={"Update Barang"}
          />
        ) : null}

        {data && data.length ? (
          <div className="mt-7 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded">
                  <table className="relative min-w-full divide-y divide-gray-300">
                    <Theads
                      th1={"Kode"}
                      th2={"nomor Kontrak"}
                      th3={"nomor memo"}
                      th4={"tanggal Kontrak"}
                      th5={"pekerjaan"}
                      th6={"cabang"}
                      th7={"status"}
                      th8={"aksi"}
                      size="md"
                    />
                    {data &&
                      data
                        .filter((item) => {
                          if (search !== " ") {
                            return item.keterangan
                              .toLowerCase()
                              .includes(search);
                          } else if (search === " ") {
                            return item;
                          }
                        })
                        .map((e) => {
                          return (
                            <Tbodys
                              key={e.id}
                              tb1={e.kode}
                              tb2={
                                e.nomorKontrak === null ? "--" : e.nomorKontrak
                              }
                              tb3={e.nomor === null ? "--" : e.nomor}
                              tb4={
                                e.tanggalKontrak === null
                                  ? "--"
                                  : moment(e.tanggalKontrak).format(
                                      "DD-MM-YYYY",
                                    )
                              }
                              tb5={e.keterangan}
                              tb6={e.cabang["nama"]}
                              tb7={
                                e.status ? (
                                  <span className="text-emerald-600 bg-emerald-100 px-3 font-semibold py-1 rounded">
                                    Aktif
                                  </span>
                                ) : (
                                  <span className="text-rose-600 bg-rose-100 px-3 font-semibold py-1 rounded">
                                    Tidak
                                  </span>
                                )
                              }
                              tb8={
                                <>
                                  <button
                                    className="text-rose-700"
                                    onClick={() =>
                                      setDetail({
                                        open: true,
                                        id: e.id,
                                      })
                                    }
                                  >
                                    <PencilSquareIcon className="w-5" />
                                  </button>
                                </>
                              }
                              size="md"
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
