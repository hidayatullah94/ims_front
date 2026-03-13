import { useQuery, useMutation } from "@tanstack/react-query";
import { HeaderFORM, HeaderJSON, URLS } from "../lib";

//!
export const addPermintaan = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await URLS.post(`/trans-permintaan`, data, HeaderFORM);
      return response;
    },
    onSuccess,
    onError,
  });
};

export const useDetailPermintaan = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail_permintaan", id],
    queryFn: async () => {
      return await URLS.get(`/trans-permintaan/${id}`, HeaderJSON).then(
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

export const usePermintaan = ({ bulan, status }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["all_permintaan", status, bulan],
    queryFn: async () => {
      return await URLS.get(
        `/trans-permintaan?status=${status}&bulan=${bulan}`,
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

//! approve
export const appPermintaan = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await URLS.put(
        `/trans-permintaan-app/${id}`,
        data,
        HeaderJSON,
      );
      return response;
    },
    onSuccess,
    onError,
  });
};

//daily notif
export const useDailyNotif = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["daily_notif"],
    queryFn: async () => {
      return await URLS.get(`/trans-permintaan-day`, HeaderJSON).then(
        (res) => res.data.query,
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

//!line chart
export const useLinePermintaan = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["line_permintaan"],
    queryFn: async () => {
      return await URLS.get(`/trans-permintaan-dash`, HeaderJSON).then(
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

//!polar  chart
export const usePolarMonth = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["mont_polar"],
    queryFn: async () => {
      return await URLS.get(`/trans-permintaan-month-daily`, HeaderJSON).then(
        (res) => res.data.query,
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

//!pie  chart
export const usePieDay = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["day_pie"],
    queryFn: async () => {
      return await URLS.get(`/trans-permintaan-daily`, HeaderJSON).then(
        (res) => res.data.query,
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
