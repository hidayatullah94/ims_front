import React, { useState } from "react";
import { Eroors, Founds, Loadings, MonthRange } from "../../component/mayor";
import { Tbodys, Theads } from "../../component/tabel";
import moment from "moment";
import { usePemasukan } from "../../api/pemasukan";

export const ReptMasuk = () => {
  const [queri, setQueri] = useState(new Date());
  const { data, isLoading, error } = usePemasukan(queri);
  if (isLoading) return <Loadings />;
  if (error) return <Eroors />;

  return (
    <div>
      {" "}
      <div className="flex  mt-7 items-end">
        <div className="flex items-center gap-6">
          <MonthRange selected={queri} change={(date) => setQueri(date)} />
        </div>
      </div>
      {data && data.length ? (
        <div className="mt-5 flow-root">
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
                    th6={"lokasi"}
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
                          tb6={e.cabang["nama"]}
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
  );
};
