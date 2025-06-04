import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProducts = create((set) => ({
    products: [],
    totalPages: 0,
    page: 0,

    getAllProducts: async (page) => {
        try {
            const res = await axiosInstance.get(`/product?page=${page}`);
            set({
                products: res.data.products || [],
                page: res.data.page || 0,
                totalPages: res.data.totalPages || 0,
            });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    },

    searchProducts: async (query, page) => {
        try {
            const res = await axiosInstance.get(`/product/search?q=${query}&rcm=0&page=${page}`);
            set({
                products: res.data.products || [],
                page: res.data.page || 0,
                totalPages: res.data.totalPages || 0,
            });
            if (res.data.products.length === 0) {
                toast.error("Không có sản phẩm nào");
            }
        } catch (error) {
            console.error("Failed to search products:", error);
        }
    },

    addProduct: async (product) => {
        try {
            const res = await axiosInstance.post("/product/add", product);
            set((state) => ({
                products: [...state.products, res.data.product],
            }));
            toast.success("Thêm sản phẩm thành công");
        } catch (error) {
            console.error("Failed to add product:", error);
            toast.error("Thêm sản phẩm thất bại");
        }
    },

    editProduct: async (id, product) => {
        try {
            const res = await axiosInstance.put(`/product/edit/${id}`, product);
            set((state) => ({
                products: state.products.map((p) => (p._id === id ? res.data.product : p)),
            }));
            toast.success("Cập nhật sản phẩm thành công");
        } catch (error) {
            console.error("Failed to edit product:", error);
            toast.error("Cập nhật sản phẩm thất bại");
        }
    },

    deleteProduct: async (productId) => {
        try {
            await axiosInstance.delete(`/product/delete/${productId}`);
            set((state) => ({
                products: state.products.filter((p) => p._id !== productId),
            }));
            toast.success("Xoá sản phẩm thành công");
        } catch (error) {
            console.error("Failed to delete product:", error);
            toast.error("Xoá sản phẩm thất bại");
        }
    },
}));
