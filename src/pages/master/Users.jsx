import React, { useContext, useState } from "react";
import { Buttons, Eroors, Founds, Loadings } from "../../component/mayor";
import { FormUser } from "../../component/form";
import { addUser, editUser, useDetailUser, useUser } from "../../api/masters";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { URLimg } from "../../lib";
import { SearchConsum } from "../../contex/GlobalContex";

export const Users = () => {
  const [create, setCreate] = useState(false);
  const [search] = useContext(SearchConsum);
  const [detail, setDetail] = useState({
    open: false,
    id: null,
  });
  const { data, isLoading, error, refetch } = useUser();
  const {
    data: USER,
    isLoading: loadUser,
    error: errUser,
    refetch: fetchUser,
  } = useDetailUser(detail.id);

  //mutasi
  const { mutate, isPending } = addUser({
    onSuccess: () => {
      toast.success("User berhasil dibuat!");
      setTimeout(() => {
        setCreate(false);
        refetch();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 400) {
        toast.error("Username sudah ada !");
      } else {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });
  const { mutate: mutateUpdate, isPending: pendingUpdate } = editUser({
    onSuccess: () => {
      toast.success("User berhasil diupdate!");
      setTimeout(() => {
        setDetail({
          open: false,
          id: null,
        });
        refetch();
        fetchUser();
      }, 500);
    },
    onError: (err) => {
      if (err.response.status === 500) {
        toast.error("Sedang ada gangguan guys !");
      }
    },
  });

  //send
  const SaveUser = (data) => {
    let formData = new FormData();
    formData.append("foto", data.foto[0]);
    formData.append("nama", data.nama);
    formData.append("username", data.username);
    formData.append("divisiID", data.divisiID);
    formData.append("cabangID", data.cabangID);
    formData.append("password", data.password);
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
  const UpdateUser = (data) => {
    let formData = new FormData();
    formData.append("foto", data.foto[0]);
    formData.append("nama", data.nama);
    formData.append("username", data.username);
    formData.append("divisiID", data.divisiID);
    formData.append("cabangID", data.cabangID);
    formData.append("password", data.password);
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

  if (isLoading || loadUser) return <Loadings />;
  if (error || errUser) return <Eroors />;
  return (
    <div>
      {create ? (
        <>
          <FormUser
            close={() => setCreate(false)}
            Submit={SaveUser}
            dsb={isPending}
          />
        </>
      ) : null}
      {detail.open ? (
        <>
          <FormUser
            Submit={UpdateUser}
            dsb={pendingUpdate}
            close={() =>
              setDetail({
                open: false,
                id: null,
              })
            }
            df1={USER && USER.nama}
            df2={USER && USER.username}
            df3={USER && USER.divisiID}
            df4={USER && USER.cabangID}
            df5={USER && USER.status}
            isUpdate={true}
            title={"update user"}
          />
        </>
      ) : null}
      <div className="pb-8">
        {create ? null : (
          <div className="flex justify-end items-end mt-7">
            <Buttons klik={() => setCreate(true)} label="Buat User" />
          </div>
        )}
        {data && data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 overflow-hidden bg-white shadow-xs outline-1 outline-gray-900/5 sm:rounded-xl mt-7"
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
                  <li
                    key={e.id}
                    className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <img
                        alt=""
                        src={
                          e.ttd === null
                            ? `https://ui-avatars.com/api/?name=${e.nama}&background=random`
                            : `${URLimg}${e.ttd}`
                        }
                        className="size-12 flex-none rounded-full bg-gray-50 border border-slate-300"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm/6 font-semibold text-gray-900">
                          <span className="absolute inset-x-0 -top-px bottom-0" />
                          {e.nama} / {e.username}
                        </p>
                        <p className="mt-1 flex text-xs/5 text-gray-500">
                          {e.divisi["nama"]}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-4">
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm/6 text-gray-900">
                          {e.cabang["nama"]}
                        </p>
                        <div className="flex gap-2">
                          <p
                            className={
                              e.role === "ADMIN"
                                ? "text-xs font-semibold text-emerald-600"
                                : "text-xs"
                            }
                          >
                            {e.role}
                          </p>
                          <div className="">
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
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setDetail({
                            open: true,
                            id: e.id,
                          })
                        }
                        className="z-50"
                      >
                        <PencilSquareIcon
                          aria-hidden="true"
                          className="w-5 flex-none text-rose-700"
                        />
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
