import { use, useState } from "react";

import { PencilSquareIcon } from "@heroicons/react/24/outline";

import OrderModal from "./components/OrderModal/OrderModal";
import { useOrders } from "../../hooks/useOrders";

import formatDateTime from "../../utils/formatDateTime";

import styles from "./Orders.module.css";
import { useEffect } from "react";
export default () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderReading, setOrderReading] = useState({});
    const [query, setQuery] = useState("");
    const [lastQuery, setLastQuery] = useState("");
    const { orders, totalOrders, page, totalPages, getOrdersByQuery } = useOrders();

    useEffect(() => {
        handleGetFinishOrders();
    }, []);

    useEffect(() => {
        if (query.trim() === "") {
            getOrdersByQuery("thanh toán", 1);
            setLastQuery("");
        }
    }, [query]);

    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim() !== "") {
            getOrdersByQuery(query);
            setLastQuery(query);
        }
    };

    const handlePageChange = (newPage) => {
        getOrdersByQuery(lastQuery, newPage);
    };
    const handleGetFinishOrders = () => {
        getOrdersByQuery("thanh toán", 1);
        setQuery("");
        setLastQuery("");
    };
    return (
        <div className={styles.container}>
            <div className={styles.function}>
                <input
                    type="text"
                    placeholder="Tìm kiếm đơn hàng"
                    className={styles.searchBar}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <span>Tìm thấy {totalOrders} đơn hàng</span>
            </div>

            <table>
                <thead>
                    <tr>
                        <th className={styles._id}>Mã đơn hàng</th>
                        {/*<th className={styles.email}>Email</th>
                        <th className={styles.name}>Tên người nhận</th>
                        <th className={styles.phone}>Số điện thoại</th>
                        <th className={styles.address}>Địa chỉ</th>*/}
                        <th className={styles.createdAt}>Thời gian tạo</th>
                        <th className={styles.orderStatus}>TT đơn hàng</th>
                        <th className={styles.update}>Chi tiết & Cập nhật</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            {/*<td>{order.email}</td>
                            <td>{order.name}</td>
                            <td>{order.phone}</td>
                            <td>{order.address}</td>*/}
                            <td>{formatDateTime(order.createdAt)}</td>
                            <td>{order.order_status}</td>
                            <td>
                                <button
                                    className={styles.editButton}
                                    onClick={() => {
                                        setIsModalOpen(true);
                                        setOrderReading(order);
                                    }}>
                                    <PencilSquareIcon className={styles.icon} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}>
                    Trước
                </button>
                <span className={styles.pageInfo}>
                    Trang {page} / {totalPages}
                </span>
                <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}>
                    Sau
                </button>
            </div>

            <OrderModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                order={orderReading}
            />
        </div>
    );
};
