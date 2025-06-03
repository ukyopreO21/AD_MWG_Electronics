import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";

import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import styles from "./MainLayout.module.css";

export default () => {
    return (
        <div className={styles.container}>
            <Navigation />
            <main className={styles.main}>
                <Header />
                <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
                    <Outlet />
                </div>
            </main>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};
