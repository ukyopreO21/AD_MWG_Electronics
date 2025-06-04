import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useUsers = create((set, get) => ({
    users: [],
    totalUsers: 0,
    totalPages: 0,
    page: 1,

    getUsersByQuery: async (query, page) => {
        try {
            const res = await axiosInstance.get(`/user/query/${encodeURIComponent(query)}/${page}`);
            set({
                users: res.data.users || [],
                page: res.data.page || 0,
                totalPages: res.data.totalPages || 0,
                totalUsers: res.data.totalUsers || 0,
            });
            if (res.data.users.length === 0) {
                toast.error("Không tìm thấy người dùng nào");
            }
        } catch (error) {
            console.error("Failed to fetch users:", error);
            toast.error("Lỗi khi tìm kiếm người dùng");
        }
    },

    updateUserActive: async (_id, email, is_active) => {
        try {
            const data = {
                email,
                is_active: !is_active,
            };
            const res = await axiosInstance.put(`/user`, data);
            set((state) => ({
                users: state.users.map((user) => (user._id === _id ? res.data : user)),
            }));
            toast.success("Cập nhật người dùng thành công");
        } catch (error) {
            console.error("Failed to edit user:", error);
            toast.error("Cập nhật người dùng thất bại");
        }
    },
}));
