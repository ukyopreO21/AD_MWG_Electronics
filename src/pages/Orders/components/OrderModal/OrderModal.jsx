import { useState, useEffect } from "react";
import { useOrders } from "../../../../hooks/useOrders";

import Modal from "react-modal";

import styles from "./OrderModal.module.css";
import AutoResizeTextarea from "./components/AutoResizeTextarea";

import formatDateTime from "../../../../utils/formatDateTime";
import formatCurrency from "../../../../utils/formatCurrency";

Modal.setAppElement("#root");

export default ({ isModalOpen, setIsModalOpen, order }) => {
    const { updateOrderStatus } = useOrders();

    const [orderStatus, setOrderStatus] = useState(order.order_status);

    const handleChange = (event) => {
        setOrderStatus(event.target.value);
    };

    const handleUpdate = () => {
        if (window.confirm("Bạn có chắc chắn muốn thêm sản phẩm này?"))
            updateOrderStatus(order._id, orderStatus);
    };

    const getColor = () => {
        switch (orderStatus) {
            case "Đang chờ":
                return "var(--pending-status-color)";
            case "Đang xử lý":
                return "var(--processing-status-color)";
            case "Đang giao":
                return "var(--shipping-status-color)";
            case "Đã giao":
                return "var(--completed-status-color)";
            case "Bị huỷ":
                return "var(--cancel-status-color)";
            default:
                return "black"; // Màu mặc định
        }
    };

    useEffect(() => {
        setOrderStatus(order.order_status);
    }, [order]);

    return (
        <Modal
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                    backgroundColor: "var(--background-color)",
                },
            }}
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}>
            <div className={styles.container}>
                <div className={styles.header}>Cập nhật trạng thái đơn hàng</div>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div>
                            <label>Mã đơn hàng</label>
                            <input type="text" value={order?._id} disabled />
                        </div>
                        <div>
                            <label>ID người dùng</label>
                            <input type="text" value={order?.user_id} disabled />
                        </div>
                        <div>
                            <label>Thời gian tạo</label>
                            <input type="text" value={formatDateTime(order?.createdAt)} disabled />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div>
                            <label>Giá trị đơn hàng</label>
                            <input
                                type="text"
                                value={formatCurrency(order?.total_price)}
                                disabled
                            />
                        </div>
                        <div>
                            <label>Trạng thái thanh toán</label>
                            <input type="text" value={order?.payment_status} disabled />
                        </div>
                        <div>
                            <label>Trạng thái đơn hàng</label>
                            <select
                                style={{ color: getColor() }}
                                onChange={handleChange}
                                value={orderStatus}>
                                <option
                                    style={{ color: "var(--pending-status-color)" }}
                                    value="Đang chờ">
                                    Đang chờ
                                </option>
                                <option
                                    style={{ color: "var(--processing-status-color)" }}
                                    value="Đang xử lý">
                                    Đang xử lý
                                </option>
                                <option
                                    style={{ color: "var(--shipping-status-color)" }}
                                    value="Đang giao">
                                    Đang giao
                                </option>
                                <option
                                    style={{ color: "var(--completed-status-color)" }}
                                    value="Đã giao">
                                    Đã giao
                                </option>
                                <option
                                    style={{ color: "var(--cancel-status-color)" }}
                                    value="Bị huỷ">
                                    Bị huỷ
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div>
                            <label>Tên người nhận</label>
                            <input type="text" value={order?.shipping_address?.name} disabled />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="text" value={order?.shipping_address?.email} disabled />
                        </div>
                        <div>
                            <label>Số điện thoại</label>
                            <input type="text" value={order?.shipping_address?.phone} disabled />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div>
                            <label>Địa chỉ nhận hàng</label>
                            <input type="text" value={order?.shipping_address?.address} disabled />
                        </div>
                    </div>
                    <div className={styles.complexRow}>
                        <label>Ghi chú</label>
                        <div>
                            <AutoResizeTextarea value={order?.note || ""} />
                        </div>
                    </div>
                    <div className={styles.complexRow}>
                        <label>Chi tiết đơn hàng</label>
                        <table className={styles.orderDetailsTable}>
                            <thead>
                                <tr>
                                    <th>Mã sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order?.order_details?.map((detail, index) => (
                                    <tr key={index + 1}>
                                        <td>{detail.product_id}</td>
                                        <td>{detail.quantity}</td>
                                        <td>{formatCurrency(detail.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                        Huỷ
                    </button>
                    <button className={styles.addButton} onClick={handleUpdate}>
                        Cập nhật
                    </button>
                </div>
            </div>
        </Modal>
    );
};
