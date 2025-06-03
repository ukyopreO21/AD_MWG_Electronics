import { useState, useEffect } from "react";

import { useProducts } from "../../hooks/useProducts";
import ProductModal from "./components/ProductModal/ProductModal";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import formatCurrency from "../../utils/formatCurrency";

import styles from "./Products.module.css";

export default () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalState, setModalState] = useState(null);
    const [query, setQuery] = useState("");
    const { products, page, totalPages, getAllProducts, searchProducts, deleteProduct } =
        useProducts();

    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim() !== "") {
            searchProducts(query);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
            deleteProduct(id);
        }
    };

    useEffect(() => {
        getAllProducts(1);
    }, []);

    useEffect(() => {
        if (query.trim() === "") {
            getAllProducts(1);
        }
    }, [query]);

    return (
        <div className={styles.container}>
            <div className={styles.function}>
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm"
                    className={styles.searchBar}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setModalState({ type: "add" });
                    }}
                    className={styles.addButton}>
                    Thêm sản phẩm
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th className={styles._id}>id</th>
                        <th className={styles.pid}>Mã sản phẩm</th>
                        <th className={styles.name}>Tên</th>
                        <th className={styles.price}>Giá</th>
                        <th className={styles.discount}>Giảm giá</th>
                        <th className={styles.quantity}>Còn lại</th>
                        <th className={styles.edit}>Chỉnh sửa</th>
                        <th className={styles.edit}>Xoá</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.product_id}</td>
                            <td>{product.name}</td>
                            <td>{formatCurrency(product.price)}</td>
                            <td>{product.discount}</td>
                            <td>{product.stock_quantity}</td>
                            <td>
                                <button
                                    className={styles.editButton}
                                    onClick={() => {
                                        setIsModalOpen(true);
                                        setModalState({ type: "edit", product: product });
                                    }}>
                                    <PencilSquareIcon className={styles.icon} />
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className={styles.deleteButton}>
                                    <TrashIcon className={styles.icon} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button
                    className={styles.pageButton}
                    onClick={() => getAllProducts(page - 1)}
                    disabled={page <= 1}>
                    Trước
                </button>
                <span className={styles.pageInfo}>
                    Trang {page} / {totalPages}
                </span>
                <button
                    className={styles.pageButton}
                    onClick={() => getAllProducts(page + 1)}
                    disabled={page >= totalPages}>
                    Sau
                </button>
            </div>

            <ProductModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                modalState={modalState?.type}
                product={modalState?.product}
            />
        </div>
    );
};
