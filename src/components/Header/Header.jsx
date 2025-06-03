import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export default () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const pathMap = {
        "/": "Trang chủ",
        "/users": "Người dùng",
        "/products": "Sản phẩm",
        "/orders": "Đơn hàng",
    };

    return (
        <header className={styles.container}>
            <div className={styles.path}>{pathMap[currentPath]}</div>
        </header>
    );
};
