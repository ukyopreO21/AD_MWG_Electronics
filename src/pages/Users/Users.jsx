import { useState } from "react";

import { useUsers } from "../../hooks/useUsers";

import formatDateTime from "../../utils/formatDateTime";

import styles from "./Users.module.css";

export default () => {
    const [query, setQuery] = useState("");
    const [lastQuery, setLastQuery] = useState("");
    const { users, page, totalPages, totalUsers, getUsersByQuery, updateUserActive } = useUsers();

    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim() !== "") {
            getUsersByQuery(query);
            setLastQuery(query);
        }
    };

    const handlePageChange = (newPage) => {
        getUsersByQuery(lastQuery, newPage);
    };

    const handleActive = async (user) => {
        if (
            window.confirm(
                `Bạn có chắc chắn muốn ${user.is_active ? "bỏ khoá" : "khoá"} người dùng này?`
            )
        )
            updateUserActive(user._id, user.email, user.is_active);
    };

    return (
        <div className={styles.container}>
            <div className={styles.function}>
                <input
                    type="text"
                    placeholder="Tìm kiếm người dùng"
                    className={styles.searchBar}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <span>Tìm thấy {totalUsers} người dùng</span>
            </div>

            <table>
                <thead>
                    <tr>
                        <th className={styles._id}>id</th>
                        <th className={styles.email}>Email</th>
                        <th className={styles.name}>Tên người dùng</th>
                        <th className={styles.phone}>Số điện thoại</th>
                        <th className={styles.address}>Địa chỉ</th>
                        <th className={styles.createdAt}>Thời gian tạo</th>
                        <th className={styles.isActive}>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.email}</td>
                            <td>{user.fullname}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>{formatDateTime(user.createdAt)}</td>
                            <td>
                                <button
                                    onClick={() => handleActive(user)}
                                    style={{
                                        color: user.is_active ? "white" : "black",
                                        backgroundColor: user.is_active
                                            ? "var(--primary-color)"
                                            : "var(--user-blocked-color)",
                                    }}
                                    className={styles.activeButton}>
                                    {user.is_active ? "Bình thường" : "Bị khoá"}
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
        </div>
    );
};
