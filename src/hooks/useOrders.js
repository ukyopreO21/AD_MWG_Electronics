import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useOrders = create((set, get) => ({
    orders: [],
    totalOrders: 0,
    totalPages: 0,
    page: 1,

    getOrdersByQuery: async (query, page) => {
        try {
            const res = await axiosInstance.get(
                `/order/query/${encodeURIComponent(query)}/${page}`
            );
            set({
                orders: res.data.orders || [],
                page: res.data.page || 0,
                totalPages: res.data.totalPages || 0,
                totalOrders: res.data.totalOrders || 0,
            });
            if (res.data.orders.length === 0) {
                toast.error("Không tìm thấy đơn hàng nào");
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            toast.error("Lỗi khi tìm kiếm đơn hàng");
        }
    },

    updateOrderStatus: async (orderId, order_status) => {
        try {
            const res = await axiosInstance.put(`/order/${orderId}`, {
                order_status,
            });
            set((state) => ({
                orders: state.orders.map((order) => (order._id === orderId ? res.data : order)),
            }));
            toast.success("Cập nhật đơn hàng thành công");
        } catch (error) {
            console.error("Failed to edit order:", error);
            toast.error("Cập nhật đơn hàng thất bại");
        }
    },
}));
