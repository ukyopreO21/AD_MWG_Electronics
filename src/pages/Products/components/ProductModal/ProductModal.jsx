import { useState, useEffect } from "react";
import { useProducts } from "../../../../hooks/useProducts";

import Modal from "react-modal";

import styles from "./ProductModal.module.css";
import AutoResizeTextarea from "./components/AutoResizeTextarea";

Modal.setAppElement("#root");

export default ({ isModalOpen, setIsModalOpen, modalState, product }) => {
    const { addProduct, editProduct } = useProducts();

    const [formData, setFormData] = useState({
        product_id: product?.product_id || "",
        name: product?.name || "",
        product_line: product?.product_line || "",
        description: product?.description || "",
        price: product?.price || 0,
        discount: product?.discount || 0,
        category: product?.category || "",
        brand: product?.brand || "",
        specification_obj: product?.specification_obj || [],
        images: product?.images || [],
        stock_quantity: product?.stock_quantity || 0,
        is_available: product?.is_available || true,
        warranty_period: product?.warranty_period || 0,
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const keys = name.split(".");

        setFormData((prev) => {
            const updated = { ...prev };
            // Trường hợp đặc biệt cho specification_obj
            if (name === "specification_obj") {
                const obj = parseSpecifications(value);
                updated.specification_obj = obj;
                return updated;
            }

            // Trường hợp mặc định: cập nhật theo nested keys
            let current = updated;
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                current[key] = { ...current[key] };
                current = current[key];
            }
            current[keys[keys.length - 1]] = value;

            return updated;
        });
    };

    const handleProduct = () => {
        if (modalState === "add") {
            if (window.confirm("Bạn có chắc chắn muốn thêm sản phẩm này?")) addProduct(formData);
        } else {
            if (window.confirm("Bạn có chắc chắn muốn chỉnh sửa sản phẩm này?"))
                editProduct(product._id, formData);
        }
    };

    const resetFormData = () => {
        setFormData({
            product_id: "",
            name: "",
            product_line: "",
            description: "",
            price: 0,
            discount: 0,
            category: "",
            brand: "",
            specification_obj: [],
            images: [],
            stock_quantity: 0,
            is_available: true,
            warranty_period: 0,
        });
    };

    useEffect(() => {
        console.log(product);
        if (product) {
            setFormData({
                product_id: product.product_id || "",
                name: product.name || "",
                product_line: product.product_line || "",
                description: product.description || "",
                price: product.price || 0,
                discount: product.discount || 0,
                category: product.category || "",
                brand: product.brand || "",
                specification_obj: Array.isArray(product.specification_obj)
                    ? product.specification_obj
                    : [],
                images: Array.isArray(product.images) ? product.images : [],
                stock_quantity: product.stock_quantity || 0,
                is_available: product.is_available ?? true,
                warranty_period: product.warranty_period || 0,
            });
        } else {
            resetFormData();
        }
    }, [product, isModalOpen]);

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
            onRequestClose={() => setIsModalOpen(false)}
            onAfterClose={resetFormData}>
            <div className={styles.container}>
                <div className={styles.header}>
                    {modalState === "add" ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm"}
                </div>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div>
                            <label>Mã sản phẩm hệ thống</label>
                            <input
                                type="text"
                                placeholder="Hệ thống tự tạo"
                                value={product?._id}
                                disabled
                            />
                        </div>
                        <div>
                            <label>Mã sản phẩm</label>
                            <input
                                type="text"
                                name="product_id"
                                value={formData.product_id}
                                onChange={handleChange}
                                placeholder="Mã sản phẩm"
                            />
                        </div>
                        <div>
                            <label>Tên sản phẩm</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Tên sản phẩm"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div>
                            <label>Danh mục</label>
                            <input
                                type="text"
                                name="category"
                                placeholder="Danh mục sản phẩm"
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Thương hiệu</label>
                            <input
                                type="text"
                                name="brand"
                                placeholder="Thương hiệu sản phẩm"
                                value={formData.brand}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Dòng sản phẩm</label>
                            <input
                                type="text"
                                name="product_line"
                                placeholder="Dòng sản phẩm"
                                value={formData.product_line}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div>
                            <label>Giá bán</label>
                            <input
                                type="number"
                                min={0}
                                max={500000000}
                                name="price"
                                placeholder="Giá bán"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Giảm giá (%)</label>
                            <input
                                type="number"
                                min={0}
                                max={100}
                                name="discount"
                                placeholder="Giảm giá"
                                value={formData.discount}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Tồn kho</label>
                            <input
                                type="number"
                                min={0}
                                name="stock_quantity"
                                placeholder="Số lượng tồn kho"
                                value={formData.stock_quantity}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.complexRow}>
                        <label>Mô tả</label>
                        <div>
                            <AutoResizeTextarea
                                name="description"
                                onChange={handleChange}
                                value={formData.description}
                            />
                        </div>
                    </div>
                    <div className={styles.complexRow}>
                        <label>Thông số kỹ thuật</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}></div>
                        <div>
                            {formData.specification_obj?.map((spec, idx) => (
                                <div style={{ display: "flex", alignItems: "center" }} key={idx}>
                                    <input
                                        style={{ flex: 1 }}
                                        type="text"
                                        placeholder="Thông số"
                                        value={spec.key}
                                        onChange={(e) => {
                                            const newSpecs = [...formData.specification_obj];
                                            newSpecs[idx].key = e.target.value;
                                            setFormData({
                                                ...formData,
                                                specification_obj: newSpecs,
                                            });
                                        }}
                                    />
                                    <input
                                        style={{ flex: 2, marginLeft: "8px" }}
                                        type="text"
                                        placeholder="Giá trị"
                                        value={spec.value}
                                        onChange={(e) => {
                                            const newSpecs = [...formData.specification_obj];
                                            newSpecs[idx].value = e.target.value;
                                            setFormData({
                                                ...formData,
                                                specification_obj: newSpecs,
                                            });
                                        }}
                                    />
                                    <button
                                        style={{ marginLeft: "8px" }}
                                        onClick={() => {
                                            setFormData({
                                                ...formData,
                                                specification_obj:
                                                    formData.specification_obj.filter(
                                                        (_, i) => i !== idx
                                                    ),
                                            });
                                        }}>
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            style={{ height: "40px", marginTop: "8px", width: "fit-content" }}
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    specification_obj: [
                                        ...formData.specification_obj,
                                        { key: "", value: "" },
                                    ],
                                })
                            }>
                            + Thêm thông số
                        </button>
                    </div>
                    <div className={styles.row}>
                        <div>
                            <label>Danh sách ảnh</label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                {formData.images?.map((url, idx) => (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        key={idx}>
                                        <span style={{ marginRight: "8px", width: "60px" }}>{`Ảnh ${
                                            idx + 1
                                        }`}</span>
                                        <input
                                            style={{ flex: 1 }}
                                            type="text"
                                            value={url}
                                            onChange={(e) => {
                                                const newImages = [...formData.images];
                                                newImages[idx] = e.target.value;
                                                setFormData({ ...formData, images: newImages });
                                            }}
                                        />
                                        <button
                                            style={{ marginLeft: "8px" }}
                                            onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                    images: formData.images.filter(
                                                        (_, i) => i !== idx
                                                    ),
                                                });
                                            }}>
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                style={{ height: "40px", marginTop: "8px", width: "fit-content" }}
                                onClick={() =>
                                    setFormData({ ...formData, images: [...formData.images, ""] })
                                }>
                                + Thêm ảnh
                            </button>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.checkboxContainer}>
                            <label>Đang bán</label>
                            <span className={styles.checkbox}>
                                <input
                                    onChange={handleChange}
                                    type="checkbox"
                                    name="is_available"
                                    checked={formData.is_available}
                                />
                                <span>{formData.is_available ? "Có sẵn" : "Không"}</span>
                            </span>
                        </div>

                        <div>
                            <label>Thời gian bảo hành (tháng)</label>
                            <input
                                type="number"
                                min={0}
                                max={48}
                                name="warranty_period"
                                placeholder="Thời gian bảo hành"
                                value={formData.warranty_period}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                        Huỷ
                    </button>
                    <button className={styles.addButton} onClick={handleProduct}>
                        {modalState == "add" ? "Thêm sản phẩm" : "Chỉnh sửa"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
