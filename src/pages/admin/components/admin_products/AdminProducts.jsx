import "./AdminProducts.css";
import React, { useState } from "react";
import adminApi from "../../../../constants/admin_api/adminApi";

function AdminProducts() {
    const [form, setForm] = useState({ name: "", shortDescription: "", price: "" });
    const [productImage, setProductImage] = useState(null);
    const [previewUrlImage, setPreviewUrlImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [addSuccess, setAddSuccess] = useState(false);
    const [createdProduct, setCreatedProduct] = useState(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) return alert("Alleen afbeeldingen toegestaan.");
        if (file.size > 15 * 1024 * 1024) return alert("Maximale bestandsgrootte is 15MB.");

        setProductImage(file);
        setPreviewUrlImage(URL.createObjectURL(file));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setAddSuccess(false);

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("shortDescription", form.shortDescription);
            formData.append("price", parseFloat(form.price));
            if (productImage) formData.append("file", productImage);

            const res = await adminApi.post("/products/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setCreatedProduct(res.data);
            setAddSuccess(true);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Product aanmaken mislukt");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page-container">
            <h1>Een nieuw product toevoegen</h1>

            {addSuccess && <p className="success-message">Product is toegevoegd!</p>}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="product-input-form">
                    <label className="product-title">
                        Productnaam:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="product-input-field"
                    />
                </div>
                <div className="product-input-form">
                    <label>
                        Korte beschrijving:
                    </label>
                    <input
                        type="text"
                        name="shortDescription"
                        value={form.shortDescription}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="product-input-form">
                    <label>
                        Prijs:
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="product-input-form">
                    <label>
                        Kies afbeelding:
                    </label>
                    <input type="file" className="file-input-button" onChange={handleImageChange}/>
                </div>

                {previewUrlImage && !createdProduct && (

                    <img
                        src={previewUrlImage}
                        alt="Preview"
                        className="image-preview"
                    />

                )}


                {createdProduct && createdProduct.imageUrl && (
                    <>
                        <p>Het product komt er zo uit te zien:</p>
                        <div className="full-product-preview">
                            <div className="image-preview">
                                <img
                                    src={`http://localhost:8080${createdProduct.imageUrl}`}
                                    alt={createdProduct.name}
                                />
                            </div>
                            <div>
                                <p>{createdProduct.name}</p>
                                <p>{createdProduct.shortDescription}</p>
                                <p>€ {createdProduct.price.toLocaleString("nl-NL", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}</p>
                            </div>
                        </div>
                    </>)}
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Bezig met uploaden…" : "Product toevoegen"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminProducts;