import { useQuery, useMutation } from "@tanstack/react-query";
import { HeaderJSON, URLS } from "../lib";

export const addPemasukan = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await URLS.post(`/trans-pemasukan`, data, HeaderJSON);
      return response;
    },
    onSuccess,
    onError,
  });
};

export const useDetailPemasukan = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail_pemasukan", id],
    queryFn: async () => {
      return await URLS.get(`/trans-pemasukan/${id}`, HeaderJSON).then(
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

export const usePemasukan = (bulan) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["all_pemasukan", bulan],
    queryFn: async () => {
      return await URLS.get(`/trans-pemasukan?bulan=${bulan}`, HeaderJSON).then(
        (res) => res.data.query,
      );
    },
    enabled: !!bulan,
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
