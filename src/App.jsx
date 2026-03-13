import { useContext, useEffect, useState } from "react";
import { TogleConsum } from "./contex/GlobalContex";
import {
  Barang,
  Cabang,
  Divisi,
  IMSpage,
  KategoriBarang,
  ListBarang,
  Login,
  Master,
  Pekerjaan,
  Users,
} from "./pages/master";
import { Mobile, Navbars, SideBars } from "./component/mayor";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  DashAdm,
  DashUser,
  JasaTrans,
  Pemasukan,
  Pengiriman,
  Permintaan,
  Reports,
  ReptJasa,
  ReptKirim,
  ReptMasuk,
  ReptMinta,
  Transaksi,
} from "./pages/transaksi";
import { Roles } from "./lib";

function App() {
  const [togle] = useContext(TogleConsum);
  const [isLogin, setIsLogin] = useState(false);

  let token = sessionStorage.getItem("token");
  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        setIsLogin(false);
      }, 1000);
    }
    setTimeout(() => {
      setIsLogin(true);
    }, 1000);
  }, []);

  if (isLogin && token) {
    return (
      <div className="w-full ">
        <Toaster position="top-right" reverseOrder={false} />
        <Mobile />
        {/* Static sidebar for desktop */}
        <SideBars />
        <div className={togle ? "lg:pl-14" : "lg:pl-72"}>
          <Navbars />
          <main className="sm:py-8 py-4">
            <div className="px-3 sm:px-4 lg:px-6">
              <Routes>
                <Route path="/ims" element={<IMSpage />}>
                  <Route
                    path=""
                    element={Roles === "ADMIN" ? <DashAdm /> : <DashUser />}
                  />
                  {/* <Route path="" element={<DashUser />} /> */}
                  <Route path="master" element={<Master />}>
                    <Route path="" element={<Divisi />} />
                    <Route path="cabang" element={<Cabang />} />
                    <Route path="user" element={<Users />} />
                    <Route path="pekerjaan" element={<Pekerjaan />} />
                  </Route>
                  <Route path="barang" element={<Barang />}>
                    <Route path="" element={<ListBarang />} />
                    <Route path="kategori" element={<KategoriBarang />} />
                  </Route>
                  <Route path="report" element={<Reports />}>
                    <Route path="" element={<ReptMinta />} />
                    <Route path="kirim" element={<ReptKirim />} />
                    <Route path="masuk" element={<ReptMasuk />} />
                    <Route path="jasa" element={<ReptJasa />} />
                  </Route>

                  <Route path="transaksi" element={<Transaksi />}>
                    <Route path="" element={<Permintaan />} />
                    <Route path="kirim" element={<Pengiriman />} />
                    <Route path="masuk" element={<Pemasukan />} />
                  </Route>
                  <Route path="transaksi/jasa" element={<JasaTrans />} />
                </Route>
              </Routes>
            </div>
          </main>
        </div>
      </div>
    );
  } else {
    return (
      <main className="h-screen">
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </main>
    );
  }
}

export default App;
