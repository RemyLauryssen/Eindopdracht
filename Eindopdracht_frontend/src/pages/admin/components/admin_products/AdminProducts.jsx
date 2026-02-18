import "./AdminProducts.css";
import React, {useEffect, useState} from "react";
import adminApi from "../../../../constants/admin_api/AdminApi.jsx";
import LayoutHelper from "../../../../components/layout-helper/LayoutHelper.jsx";

function AdminProducts() {
    const [form, setForm] = useState({name: "", shortDescription: "", price: ""});
    const [productImage, setProductImage] = useState(null);
    const [previewUrlImage, setPreviewUrlImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [addSuccess, setAddSuccess] = useState(false);
    const [createdProduct, setCreatedProduct] = useState(null);

    useEffect(() => {
        return () => {
            if (previewUrlImage) {
                URL.revokeObjectURL(previewUrlImage);
            }
        };
    }, [previewUrlImage]);

    function handleChange(e) {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
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
                headers: {"Content-Type": "multipart/form-data"},
            });

            setCreatedProduct(res.data);
            setAddSuccess(true);
            setForm({name: "", shortDescription: "", price: ""});
            setProductImage(null);
            setPreviewUrlImage("");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Product aanmaken mislukt");
        } finally {
            setLoading(false);
        }

    }


    return (
        <LayoutHelper>

            <h1>Producten</h1>
            <div className="page-container">
                <div className="products-left-side">
                    <h2>Voorbeeldweergave product</h2>
                    {createdProduct && createdProduct.imageUrl && (
                        <>
                            <h4>Het product komt er zo uit te zien:</h4>
                            <ul className="product-catalog">
                                <div key={createdProduct.id} className="product-card">
                                    <img
                                        src={`http://localhost:8080${createdProduct.imageUrl}`}
                                        alt={createdProduct.name}
                                    />
                                    <li><h4>{createdProduct.name}</h4></li>
                                    <li><h5>{createdProduct.shortDescription}</h5></li>
                                    <li><h5>
                                        € {createdProduct.price.toLocaleString("nl-NL", {
                                        minimumFractionDigits: 2, maximumFractionDigits: 2,
                                    })}
                                    </h5></li>
                                </div>
                            </ul>
                        </>
                    )}
                </div>
                <div className="vertical-separator"/>
                <div className="products-right-side">
                    <h2>Product toevoegen</h2>
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

                        {previewUrlImage && (
                            <img
                                src={previewUrlImage}
                                alt="Preview"
                                className="image-preview"
                            />
                        )}

                        <div>
                            <button type="submit" className="products-add-button" disabled={loading}>
                                {loading ? "Bezig met uploaden…" : "Product toevoegen"}
                            </button>
                        </div>
                    </form>
                    {addSuccess && <p className="success-message">Product is toegevoegd!</p>}
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>

        </LayoutHelper>
    );
}

export default AdminProducts;