import { useQuery, useMutation } from "@tanstack/react-query";
import { HeaderFORM, HeaderJSON, URLS } from "../lib";

//!
export const addJasa = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await URLS.post(`/trans-jasa`, data, HeaderFORM);
      return response;
    },
    onSuccess,
    onError,
  });
};

export const useDetailJasa = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail_jasa", id],
    queryFn: async () => {
      return await URLS.get(`/trans-jasa/${id}`, HeaderJSON).then(
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

export const useJasa = ({ bulan, status }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["all_jasa", status, bulan],
    queryFn: async () => {
      return await URLS.get(
        `/trans-jasa?status=${status}&bulan=${bulan}`,
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

export const appJasa = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await URLS.put(
        `/trans-jasa-app/${id}`,
        data,
        HeaderJSON,
      );
      return response;
    },
    onSuccess,
    onError,
  });
};
