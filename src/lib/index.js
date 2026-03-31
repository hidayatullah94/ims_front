import axios from "axios";
//http://localhost:3500
export const URLS = axios.create({
  baseURL: "https://ims.citrapersada.co.id",
});
export const TokenS = sessionStorage.getItem("token");
export const Roles = sessionStorage.getItem("roles");
export const URLimg = "https://ims.citrapersada.co.id";
export const HeaderJSON = {
  headers: {
    "Content-Type": "application/json",
    "Acess-Control-Allow-Origin": "*",
    Accept: "application/json",
    Authorization: `Bearer ${TokenS}`,
  },
};

//HEADER formdata
export const HeaderFORM = {
  headers: {
    "Acess-Control-Allow-Origin": "*",
    Accept: "application/json",
    Authorization: `Bearer ${TokenS}`,
  },
};
