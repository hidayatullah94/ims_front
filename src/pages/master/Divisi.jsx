import React, { useState } from "react";
import { Buttons, Eroors, Founds, Loadings } from "../../component/mayor";
import { FromDivisi } from "../../component/form";
import { PencilSquareIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import {
  addDivisi,
  editDivisi,
  useDetailDivisi,
  useDivisi,
} from "../../api/masters";
import { classNames } from "../../action";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";

export const Divisi = () => {
  const [create, setCreate] = useState(false);
  const [detail, setDetail] = useState({
    open: false,
    id: null,
  });
  const { data, isLoading, error, refetch } = useDivisi();
  const {
    data: DIVISI,
    isLoading: loadDiv,
    error: errDiv,
    refetch: fetchDiv,
  } = useDetailDivisi(detail.id);

  //mutasi
  const { mutate, isPending } = addDivisi({
    onSuccess: () => {
      toast.success("Divisi berhasil dibuat!");
      setTimeout(() => {
        setCreate(false);
        refetch();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 400) {
        toast.error("Nama Divisi sudah ada !");
      } else {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });
  const { mutate: mutateUpdate, isPending: pendingUpdate } = editDivisi({
    onSuccess: () => {
      toast.success("Divisi berhasil diupdate!");
      setTimeout(() => {
        setDetail({
          open: false,
          id: null,
        });
        refetch();
        fetchDiv();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 500) {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });

  const SaveDivisi = (data) => {
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
  const UpdateDivisi = (data) => {
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
  if (isLoading || loadDiv) return <Loadings />;
  if (error || errDiv) return <Eroors />;

  return (
    <div>
      {create ? null : (
        <div className="flex justify-end mt-7 items-end">
          <Buttons label="buat divisi" klik={() => setCreate(true)} />
        </div>
      )}
      {data && data.length ? (
        <ul
          role="list"
          className="divide-y divide-gray-400 border-y border-slate-400 mt-8"
        >
          {data.map((e) => (
            <li key={e.id} className="flex gap-x-4 py-5 relative">
              <UserGroupIcon className="w-8 h-8 flex-none rounded-full bg-slate-300 p-1" />
              <div className="min-w-0">
                <p className="text-sm/6 font-semibold text-gray-900">
                  {e.nama}
                </p>
                <p
                  className={classNames(
                    e.status
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700",
                    "mt-1 truncate text-xs/5  text-center rounded",
                  )}
                >
                  {e.status ? "Aktif" : "Tidak"}
                </p>
              </div>
              <button
                className="absolute right-0 cursor-pointer"
                onClick={() =>
                  setDetail({
                    open: true,
                    id: e.id,
                  })
                }
              >
                <PencilSquareIcon className="w-5 text-rose-700" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <Founds />
      )}
      {create ? (
        <>
          <FromDivisi
            close={() => setCreate(false)}
            title={"Tambah divisi"}
            Submit={SaveDivisi}
            dsb={isPending}
          />
        </>
      ) : null}
      {detail.open ? (
        <>
          <FromDivisi
            close={() =>
              setDetail({
                open: false,
                id: null,
              })
            }
            title={"Update divisi"}
            Submit={UpdateDivisi}
            dsb={pendingUpdate}
            df1={DIVISI && DIVISI.nama}
            df2={DIVISI && DIVISI.status}
            isUpdate={true}
          />
        </>
      ) : null}
    </div>
  );
};
