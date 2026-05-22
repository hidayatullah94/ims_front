import React, { useContext, useState } from "react";
import { Buttons, Eroors, Founds, Loadings } from "../../component/mayor";
import { FormCabang } from "../../component/form";
import {
  BuildingOffice2Icon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import {
  addCabang,
  editCabang,
  useCabang,
  useDetailCabang,
} from "../../api/masters";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { SearchConsum } from "../../contex/GlobalContex";

export const Cabang = () => {
  const [create, setCreate] = useState(false);
  const [search] = useContext(SearchConsum);
  const [detail, setDetail] = useState({
    open: false,
    id: null,
  });
  const { data, isLoading, error, refetch } = useCabang();
  const {
    data: CABANG,
    isLoading: loadCab,
    error: errCab,
    refetch: fetchCab,
  } = useDetailCabang(detail.id);

  //mutasi
  const { mutate, isPending } = addCabang({
    onSuccess: () => {
      toast.success("Cabang berhasil dibuat!");
      setTimeout(() => {
        setCreate(false);
        refetch();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 400) {
        toast.error("Nama Cabang sudah ada !");
      } else {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });
  const { mutate: mutateUpdate, isPending: pendingUpdate } = editCabang({
    onSuccess: () => {
      toast.success("Cabang berhasil diupdate!");
      setTimeout(() => {
        setDetail({
          open: false,
          id: null,
        });
        refetch();
        fetchCab();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 500) {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });
  //send
  const SaveCabang = (data) => {
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
  const UpdateCabang = (data) => {
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

  if (isLoading || loadCab) return <Loadings />;
  if (error || errCab) return <Eroors />;

  return (
    <div>
      {create ? (
        <>
          <FormCabang
            close={() => setCreate(false)}
            Submit={SaveCabang}
            dsb={isPending}
          />
        </>
      ) : null}
      {detail.open ? (
        <>
          <FormCabang
            Submit={UpdateCabang}
            close={() =>
              setDetail({
                open: false,
                id: null,
              })
            }
            df1={CABANG && CABANG.nama}
            df2={CABANG && CABANG.divisiID}
            df3={CABANG && CABANG.ruas}
            df4={CABANG && CABANG.alamat}
            df5={CABANG && CABANG.status}
            isUpdate={true}
            title={"update cabang"}
            dsb={pendingUpdate}
          />
        </>
      ) : null}
      <div className="">
        {create ? null : (
          <div className="flex justify-end mt-7 items-end">
            <Buttons klik={() => setCreate(true)} label="Buat Cabang" />
          </div>
        )}
        {data && data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-300 border-y border-slate-300 mt-7"
          >
            {data &&
              data
                .filter((item) => {
                  if (search !== " ") {
                    return item.nama.toLowerCase().includes(search);
                  } else if (search === " ") {
                    return item;
                  }
                })
                .map((e) => (
                  <li key={e.id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                      <BuildingOffice2Icon className="w-8 h-8 flex-none rounded-full bg-slate-300 p-1" />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm/6 font-semibold text-gray-900">
                          {e.nama} || {e.ruas}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          {e.alamat}
                        </p>
                      </div>
                    </div>
                    <div className=" shrink-0 sm:flex sm:flex-col sm:items-end relative">
                      <p className="text-xs/6 text-gray-700 font-semibold">
                        {e.divisi["nama"]}
                      </p>
                      <div className="absolute -top-4">
                        {e.status ? (
                          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="size-1.5 rounded-full bg-emerald-500" />
                          </div>
                        ) : (
                          <div className="flex-none rounded-full bg-rose-500/20 p-1">
                            <div className="size-1.5 rounded-full bg-rose-500" />
                          </div>
                        )}
                      </div>
                      <button
                        className="absolute bottom-0 text-rose-700 cursor-pointer"
                        onClick={() =>
                          setDetail({
                            open: true,
                            id: e.id,
                          })
                        }
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                    </div>
                  </li>
                ))}
          </ul>
        ) : (
          <Founds />
        )}
      </div>
    </div>
  );
};
