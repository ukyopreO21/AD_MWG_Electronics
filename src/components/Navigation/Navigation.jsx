import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";
import {
    HomeIcon,
    UserIcon,
    TruckIcon,
    ShoppingBagIcon,
    ReceiptPercentIcon,
    ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default () => {
    const location = useLocation();

    const currentPath = location.pathname;

    return (
        <aside className={styles.container}>
            <div className={styles.main}>
                <img src="/logo-with-text.png" alt="MWG Electronics Logo" />
                <div className={styles.navigation}>
                    <Link
                        style={{
                            backgroundColor: currentPath === "/" ? "#727272" : "",
                            fontWeight: currentPath === "/" ? "600" : "normal",
                        }}
                        to="/">
                        <div>
                            <HomeIcon className={styles.icon} />
                            Trang chủ
                        </div>
                    </Link>
                    <Link
                        style={{
                            backgroundColor: currentPath === "/users" ? "#727272" : "",
                            fontWeight: currentPath === "/users" ? "600" : "normal",
                        }}
                        to="/users">
                        <div>
                            <UserIcon className={styles.icon} />
                            Người dùng
                        </div>
                    </Link>
                    <Link
                        style={{
                            backgroundColor: currentPath === "/products" ? "#727272" : "",
                            fontWeight: currentPath === "/products" ? "600" : "normal",
                        }}
                        to="/products">
                        <div>
                            <ShoppingBagIcon className={styles.icon} />
                            Sản phẩm
                        </div>
                    </Link>
                    <Link
                        style={{
                            backgroundColor: currentPath === "/orders" ? "#727272" : "",
                            fontWeight: currentPath === "/orders" ? "600" : "normal",
                        }}
                        to="/orders">
                        <div>
                            <TruckIcon className={styles.icon} />
                            Đơn hàng
                        </div>
                    </Link>
                    <Link
                        style={{
                            backgroundColor: currentPath === "/promo" ? "#727272" : "",
                            fontWeight: currentPath === "/promo" ? "600" : "normal",
                        }}
                        to="/">
                        <div>
                            <ReceiptPercentIcon className={styles.icon} />
                            Khuyến mãi
                        </div>
                    </Link>
                </div>
                <div className={styles.logout}>
                    <Link to="/">
                        <div>
                            <ArrowRightEndOnRectangleIcon className={styles.icon} />
                            Đăng xuất
                        </div>
                    </Link>
                </div>
            </div>
        </aside>
    );
};
