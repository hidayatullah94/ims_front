import { useQuery, useMutation } from "@tanstack/react-query";
import { HeaderFORM, HeaderJSON, URLS } from "../lib";

//?================= DIVISI ===============================
//!
export const addDivisi = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await URLS.post(`/master-divisi`, data, HeaderJSON);
      return response;
    },
    onSuccess,
    onError,
  });
};

export const useDetailDivisi = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail_divisi", id],
    queryFn: async () => {
      return await URLS.get(`/master-divisi/${id}`, HeaderJSON).then(
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

export const useDivisi = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["all_divisi"],
    queryFn: async () => {
      return await URLS.get(`/master-divisi`, HeaderJSON).then(
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

//!
export const editDivisi = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await URLS.put(`/master-divisi/${id}`, data, HeaderJSON);
      return response;
    },
    onSuccess,
    onError,
  });
};

//?================= CABANG ===============================
//!
export const addCabang = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await URLS.post(`/master-cabang`, data, HeaderJSON);
      return response;
    },
    onSuccess,
    onError,
  });
};

export const useCabang = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["all_cabang"],
    queryFn: async () => {
      return await URLS.get(`/master-cabang`, HeaderJSON).then(
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

export const useDetailCabang = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail_cabang", id],
    queryFn: async () => {
      return await URLS.get(`/master-cabang/${id}`, HeaderJSON).then(
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

//!
export const editCabang = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await URLS.put(`/master-cabang/${id}`, data, HeaderJSON);
      return response;
    },
    onSuccess,
    onError,
  });
};

export const useDivisiCabang = (divisi) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["cabang_divisi", divisi],
    queryFn: async () => {
      return await URLS.get(
        `/master-cabang-divisi?divisiID=${divisi}`,
        HeaderJSON,
      ).then((res) => res.data.query);
    },
    enabled: !!divisi,
    refetchOnMount: "always",
  });
  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

//?================= USER ===============================

//!
export const addUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await URLS.post(`/master-user`, data, HeaderFORM);
      return response;
    },
    onSuccess,
    onError,
  });
};

export const useUser = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["all_user"],
    queryFn: async () => {
      return await URLS.get(`/master-user`, HeaderJSON).then(
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

export const useDetailUser = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail_user", id],
    queryFn: async () => {
      return await URLS.get(`/master-user/${id}`, HeaderJSON).then(
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

//!
export const editUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const response = await URLS.put(
        `/master-user/${id}`,
        formData,
        HeaderFORM,
      );
      return response;
    },
    onSuccess,
    onError,
  });
};

//?================= KATEGORI ===============================
//!
export const addKategori = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await URLS.post(`/master-kategori`, data, HeaderJSON);
      return response;
    },
    onSuccess,
    onError,
  });
};

export const useDetailKategori = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail_kategori", id],
    queryFn: async () => {
      return await URLS.get(`/master-kategori/${id}`, HeaderJSON).then(
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

export const useKategori = (status = "All") => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["all_kategori", status],
    queryFn: async () => {
      return await URLS.get(
        `/master-kategori?status=${status}`,
        HeaderJSON,
      ).then((res) => res.data.query);
    },
    enabled: !!status,
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

//!
export const editKategori = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await URLS.put(
        `/master-kategori/${id}`,
        data,
        HeaderJSON,
      );
      return response;
    },
    onSuccess,
    onError,
  });
};

//?================= BARANG ===============================
//!
export const addBarang = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await URLS.post(`/master-barang`, data, HeaderFORM);
      return response;
    },
    onSuccess,
    onError,
  });
};

export const useBarang = (status = "All") => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["all_barang", status],
    queryFn: async () => {
      return await URLS.get(`/master-barang?status=${status}`, HeaderJSON).then(
        (res) => res.data.query,
      );
    },
    enabled: !!status,
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

export const useDetailBarang = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail_barang", id],
    queryFn: async () => {
      return await URLS.get(`/master-barang/${id}`, HeaderJSON).then(
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

export const useHistoriBarang = ({ id, tanggal }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["histori_barang", id, tanggal],
    queryFn: async () => {
      return await URLS.get(
        `/master-barang-histori?id=${id}&tanggal=${tanggal}`,
        HeaderJSON,
      ).then((res) => res.data.query);
    },
    enabled: !!id && !!tanggal,
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
//!
export const editBarang = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const response = await URLS.put(
        `/master-barang/${id}`,
        formData,
        HeaderFORM,
      );
      return response;
    },
    onSuccess,
    onError,
  });
};

//?================= PEKERJAAN ===============================

//!
export const addPekerjaan = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await URLS.post(`/master-pekerjaan`, data, HeaderJSON);
      return response;
    },
    onSuccess,
    onError,
  });
};

export const useDetailPekerjaan = (id) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail_pekerjaan", id],
    queryFn: async () => {
      return await URLS.get(`/master-pekerjaan/${id}`, HeaderJSON).then(
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

export const usePekerjaan = ({ status = "All", cabang = "All" }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["all_pekerjaan", status, cabang],
    queryFn: async () => {
      return await URLS.get(
        `/master-pekerjaan?status=${status}&cabang=${cabang}`,
        HeaderJSON,
      ).then((res) => res.data.query);
    },
    enabled: !!status && !!cabang,
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

//!
export const editPekerjaan = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await URLS.put(
        `/master-pekerjaan/${id}`,
        data,
        HeaderJSON,
      );
      return response;
    },
    onSuccess,
    onError,
  });
};
