import React, { useContext, useState } from "react";
import { FormBarang } from "../../component/form";
import {
  Backs,
  Buttons,
  Eroors,
  Founds,
  Loadings,
} from "../../component/mayor";
import { CardBarang, CardDetailBarang } from "../../component/card";
import {
  addBarang,
  editBarang,
  useBarang,
  useDetailBarang,
} from "../../api/masters";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { Roles, URLimg } from "../../lib";
import { format } from "../../action";
import { SearchConsum } from "../../contex/GlobalContex";

export const ListBarang = () => {
  const [create, setCreate] = useState(false);
  const [search] = useContext(SearchConsum);
  const [detail, setDetail] = useState({
    open: false,
    id: null,
    edit: false,
  });
  const [queri, setQueri] = useState("All");
  const { data, isLoading, error, refetch } = useBarang(queri);
  const {
    data: BARANG,
    isLoading: loadBar,
    error: errBar,
    refetch: fetchBar,
  } = useDetailBarang(detail.id);

  //mutasi
  const { mutate, isPending } = addBarang({
    onSuccess: () => {
      toast.success("Barang berhasil dibuat!");
      setTimeout(() => {
        setCreate(false);
        refetch();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 400) {
        toast.error("Barang sudah ada !");
      } else {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });
  const { mutate: mutateUpdate, isPending: pendingUpdate } = editBarang({
    onSuccess: () => {
      toast.success("Barang berhasil diupdate!");
      setTimeout(() => {
        setDetail({
          edit: false,
          id: null,
          open: false,
        });
        refetch();
        fetchBar();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 500) {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });

  //send
  const SaveBarang = (data) => {
    let formData = new FormData();
    formData.append("foto", data.foto[0]);
    formData.append("nama", data.nama);
    formData.append("barcode", data.barcode);
    formData.append("satuan", data.satuan);
    formData.append("kategoriID", data.kategoriID);
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
  const UpdateBarang = (data) => {
    let formData = new FormData();
    formData.append("foto", data.foto[0]);
    formData.append("nama", data.nama);
    formData.append("barcode", data.barcode);
    formData.append("satuan", data.satuan);
    formData.append("kategoriID", data.kategoriID);
    formData.append("status", data.status);

    confirmAlert({
      title: "Update Data  !",
      message: "Apkah kamu yakin ingin mengupdate data ?",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            mutateUpdate({ id: detail.id, formData });
          },
        },
        {
          label: "Tidak",
        },
      ],
    });
  };

  if (isLoading || loadBar) return <Loadings />;
  if (error || errBar) return <Eroors />;
  return (
    <div>
      {detail.open ? (
        <>
          <div className="mt-4">
            <Backs
              click={() =>
                setDetail({
                  open: false,
                  id: null,
                })
              }
            />
          </div>
          <CardDetailBarang id={detail.id} />
        </>
      ) : (
        <div className="">
          <div className="flex justify-between mt-7 items-end">
            <div className="flex gap-5">
              <div className="relative sm:col-span-2">
                <label
                  htmlFor="name"
                  className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs  text-gray-900 sm:text-sm"
                >
                  Status
                </label>
                <select
                  id="location"
                  defaultValue={queri}
                  className="block w-full rounded-md bg-white px-7 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-xs"
                  onChange={(e) => setQueri(e.target.value)}
                >
                  <option value={"All"}>Semua</option>
                  <option value={true}>Aktif</option>
                  <option value={false}>Tidak</option>
                </select>
              </div>
              <span className="text-rose-500 font-semibold text-sm">
                {data && data.length} Barang
              </span>
            </div>
            {Roles === "ADMIN" && (
              <Buttons label="Buat Barang" klik={() => setCreate(true)} />
            )}
          </div>
          {create ? (
            <FormBarang
              close={() => setCreate(false)}
              Submit={SaveBarang}
              dsb={isPending}
              title={"Buat Barang"}
            />
          ) : null}

          {detail.edit ? (
            <FormBarang
              Submit={UpdateBarang}
              close={() =>
                setDetail({
                  edit: false,
                  id: null,
                })
              }
              dsb={pendingUpdate}
              df1={BARANG && BARANG.nama}
              df2={BARANG && BARANG.barcode}
              df3={BARANG && BARANG.satuan}
              df4={BARANG && BARANG.kategoriID}
              df5={BARANG && BARANG.status}
              isUpdate={true}
              title={"Update Barang"}
            />
          ) : null}

          {data && data.length ? (
            <div className="sm:mt-10 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {data &&
                data
                  .filter((item) => {
                    if (search !== " ") {
                      return item.nama.toLowerCase().includes(search);
                    } else if (search === " ") {
                      return item;
                    }
                  })
                  .map((e) => {
                    return (
                      <CardBarang
                        key={e.id}
                        status={e.status}
                        barcode={e.barcode}
                        nama={e.nama}
                        stok={`${e.stok.length ? e.stok[0].qty : 0} ${e.satuan}`}
                        img={
                          e.foto === null
                            ? `https://dummyimage.com/300x300/eee/000&text=${e.nama}


`
                            : `${URLimg}${e.foto}`
                        }
                        harga={format(
                          e.pemasukan?.[e.pemasukan.length - 1]?.harga ?? 0,
                        )}
                        klik={() =>
                          setDetail({
                            edit: true,
                            id: e.id,
                          })
                        }
                        lihat={() =>
                          setDetail({
                            open: true,
                            id: e.id,
                          })
                        }
                      />
                    );
                  })}
            </div>
          ) : (
            <Founds />
          )}
        </div>
      )}
    </div>
  );
};
