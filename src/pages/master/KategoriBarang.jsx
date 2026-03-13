import React, { useState } from "react";
import {
  addKategori,
  editKategori,
  useDetailKategori,
  useKategori,
} from "../../api/masters";
import toast from "react-hot-toast";
import { Buttons, Eroors, Founds, Loadings } from "../../component/mayor";
import { FormKategori } from "../../component/form";
import { confirmAlert } from "react-confirm-alert";
import { classNames } from "../../action";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export const KategoriBarang = () => {
  const [create, setCreate] = useState(false);
  const [detail, setDetail] = useState({
    open: false,
    id: null,
  });
  const { data, isLoading, error, refetch } = useKategori();
  const {
    data: KATEGORI,
    isLoading: loadCat,
    error: errCat,
    refetch: fetchCat,
  } = useDetailKategori(detail.id);

  //mutasi
  const { mutate, isPending } = addKategori({
    onSuccess: () => {
      toast.success("Kategori berhasil dibuat!");
      setTimeout(() => {
        setCreate(false);
        refetch();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 400) {
        toast.error("Nama Kategori sudah ada !");
      } else {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });
  const { mutate: mutateUpdate, isPending: pendingUpdate } = editKategori({
    onSuccess: () => {
      toast.success("Kategori berhasil diupdate!");
      setTimeout(() => {
        setDetail({
          open: false,
          id: null,
        });
        refetch();
        fetchCat();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 500) {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });
  const SaveKategori = (data) => {
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
  const UpdateKategori = (data) => {
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
  if (isLoading || loadCat) return <Loadings />;
  if (error || errCat) return <Eroors />;

  return (
    <div>
      {" "}
      <div>
        {create ? null : (
          <div className="flex justify-end mt-7 items-end">
            <Buttons label="buat kategori" klik={() => setCreate(true)} />
          </div>
        )}
        {data && data.length ? (
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {data &&
              data.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6 border border-slate-200 relative"
                >
                  <span
                    className={classNames(
                      item.status
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700",
                      "mt-1 text-sm tracking-tight  rounded  px-4",
                    )}
                  >
                    {item.status ? "Aktif" : "Tidak"}
                  </span>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    {item.nama}
                  </dt>
                  <button
                    className="absolute right-2 top-2 text-rose-700 cursor-pointer"
                    onClick={() =>
                      setDetail({
                        open: true,
                        id: item.id,
                      })
                    }
                  >
                    <PencilSquareIcon className="w-5" />
                  </button>
                </div>
              ))}
          </dl>
        ) : (
          <Founds />
        )}
        {create ? (
          <>
            <FormKategori
              close={() => setCreate(false)}
              title={"Tambah kategori"}
              Submit={SaveKategori}
              dsb={isPending}
            />
          </>
        ) : null}
        {detail.open ? (
          <>
            <FormKategori
              close={() =>
                setDetail({
                  open: false,
                  id: null,
                })
              }
              title={"Update kategori"}
              Submit={UpdateKategori}
              dsb={pendingUpdate}
              df1={KATEGORI && KATEGORI.nama}
              df2={KATEGORI && KATEGORI.status}
              isUpdate={true}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
