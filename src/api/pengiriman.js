import { useQuery, useMutation } from "@tanstack/react-query";
import { HeaderJSON, URLS } from "../lib";

export const addPengiriman = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await URLS.post(`/trans-pengiriman`, data, HeaderJSON);
      return response;
    },
    onSuccess,
    onError,
  });
};

export const useDetailPengiriman = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail_pengiriman", id],
    queryFn: async () => {
      return await URLS.get(`/trans-pengiriman/${id}`, HeaderJSON).then(
        (res) => res.data.query,
      );
    },
    enabled: !!id,
    staleTime: 5000,
    refetchOnMount: "always",
  });
  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
export const usePengiriman = ({ bulan, status }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["all_pengiriman", status, bulan],
    queryFn: async () => {
      return await URLS.get(
        `/trans-pengiriman?status=${status}&bulan=${bulan}`,
        HeaderJSON,
      ).then((res) => res.data.query);
    },
    enabled: !!status && !!bulan,
    staleTime: 5000,
    refetchOnMount: "always",
  });
  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const appPengiriman = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await URLS.put(
        `/trans-pengiriman-app/${id}`,
        data,
        HeaderJSON,
      );
      return response;
    },
    onSuccess,
    onError,
  });
};

//!line chart
export const useLinePengiriman = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["line_pengiriman"],
    queryFn: async () => {
      return await URLS.get(`/trans-pengiriman-dash`, HeaderJSON).then(
        (res) => res.data.data,
      );
    },
    staleTime: 5000,
    refetchOnMount: "always",
  });
  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
