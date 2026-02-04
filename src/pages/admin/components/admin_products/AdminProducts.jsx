import "./AdminProducts.css";
import React, { useState } from "react";

function AdminProducts() {
    const [form, setForm] = useState({
        name: "",
        shortDescription: "",
        price: "",
    });

    const [productImage, setProductImage] = useState(null);
    const [previewUrlImage, setPreviewUrlImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [addSuccess, setAddSuccess] = useState(false);

    // Handle text input changes
    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    // Handle image selection & preview
    function handleImageChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Only allow images
        if (!file.type.startsWith("image/")) {
            alert("Alleen afbeeldingen zijn toegestaan.");
            return;
        }

        // Max 15MB
        if (file.size > 15 * 1024 * 1024) {
            alert("Maximale bestandsgrootte is 15MB.");
            return;
        }

        setProductImage(file);
        setPreviewUrlImage(URL.createObjectURL(file));
    }

    // Handle form submission
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

            if (productImage) {
                formData.append("file", productImage);
            }

            if (isNaN(form.price)) {
                setError("Prijs is ongeldig");
                return;
            }

            const response = await fetch(
                "http://localhost:8080/products/create-with-image",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Product aanmaken mislukt");
            }

            // Reset form & show success
            setForm({ name: "", shortDescription: "", price: "" });
            setProductImage(null);
            setPreviewUrlImage("");
            setAddSuccess(true);
        } catch (error) {
            console.error(error);
            setError(error.message);
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
                <label>
                    Productnaam:
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Korte beschrijving:
                    <input
                        type="text"
                        name="shortDescription"
                        value={form.shortDescription}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Prijs:
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Kies afbeelding:
                    <input type="file" onChange={handleImageChange} />
                </label>

                {previewUrlImage && (
                    <img
                        src={previewUrlImage}
                        alt="Preview"
                        className="image-preview"
                    />
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Bezig met uploaden…" : "Product toevoegen"}
                </button>
            </form>
        </div>
    );
}

export default AdminProducts;
