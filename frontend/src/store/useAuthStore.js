import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isLogout: false,
  isCheckingAuth: false,
  isRegistering: false,

  checkAuth: async () => {
    if (get().authUser) return;
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.post("/auth/checkauth");
      set({ authUser: res?.data?.user });
    } catch (error) {
      toast.error(error?.data?.message || "Yönlendiriliyorsunuz");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  loginUser: async (formData) => {
    if (get().authUser) return;
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("auth/login", formData);
      set({ authUser: res.data.user });
      if (res.data.status) {
        toast.success(res?.data?.message || "Giriş Başarılı!");
      } else {
        toast.error(res?.data?.message);
      }
      return res?.data;
    } catch (error) {
      toast.error(
        error?.data?.message ||
          "Bir hata oluştu lütfen daha sonra tekrar deneyiniz"
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logoutUser: async () => {
    set({ isLogout: true });

    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });

      if (res?.data?.status) {
        toast.success(res?.data?.message || "Çıkış başarılı");
      } else {
        toast.error(res?.data?.message || "Çıkış başarısız");
      }
    } catch (error) {
      toast.error(
        error?.data?.message ||
          "Bir sorun oluştu lütfen daha sonra tekrar deneyiniz!"
      );
    } finally {
      set({ isLogout: false });
    }
  },
}));
