import React, { useState } from "react";
import { logo, paterns } from "../../assets";
import { URLS } from "../../lib";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { Requireds } from "../../component/mayor";
export const Login = () => {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const Submits = (data) => {
    setLoading(true);
    URLS.post(`/master-user-signin`, data)
      .then((res) => {
        const token = res.data.token;
        sessionStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        sessionStorage.setItem("roles", decoded.role_);
        sessionStorage.setItem("nama", decoded.created);
        sessionStorage.setItem("count", 1);
        toast.success("Login Berhasil !");
        setTimeout(() => {
          window.location.href = "/ims";
        }, 500);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 404:
            toast.error("Username tidak terdaftar !");
            break;
          case 403:
            toast.error("Username tidak aktif !");
            break;
          case 400:
            toast.error("Password salah !");
            break;
          default:
            toast.error("Waduh error nih !");
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 "
      style={{
        backgroundImage: `url(${paterns})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 capitalize">
          inventory management system
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto w-full md:max-w-md ">
        <div className="bg-white px-6 py-12 shadow-md sm:rounded-lg sm:px-12 border mx-5 rounded border-slate-50">
          <form
            className="space-y-10"
            method="POST"
            onSubmit={handleSubmit(Submits)}
          >
            <div className="relative">
              <label
                htmlFor="name"
                className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900 sm:text-sm"
              >
                Username
              </label>
              <input
                id="name"
                type="text"
                placeholder="username"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                {...register("username", { required: true })}
              />
              {errors.username && <Requireds />}
            </div>
            <div className="relative">
              <label
                htmlFor="name"
                className="absolute -top-3 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900 sm:text-sm z-50"
              >
                Password
              </label>
              <div className="relative ">
                <input
                  id="name"
                  type={show ? "password" : "text"}
                  placeholder="******"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-cyan-600 sm:text-sm/6 placeholder:text-xs"
                  {...register("password", { required: true })}
                />{" "}
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer "
                  onClick={() => setShow(!show)}
                >
                  {show ? (
                    <EyeSlashIcon className="w-4" />
                  ) : (
                    <EyeIcon className="w-4" />
                  )}
                </div>
              </div>
              {errors.password && <Requireds />}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-cyan-600 mt-10 disabled:bg-slate-300  disabled:text-slate-400 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Sign in
              </button>
            </div>
          </form>

          <div>
            <div className="relative mt-10">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">
                  Citra Persada Infrastruktur
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
