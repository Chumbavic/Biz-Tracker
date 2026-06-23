import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";

const Addproduct = () => {
    const [product_name, setProductName] = useState("");
    const [product_category, setProductCategory] = useState("");
    const [product_cost, setProductCost] = useState("");
    const [remaining_units, setRemainingUnits] = useState("");
    const [product_photo, setProductPhoto] = useState(null);

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setLoading("Please wait..");
        const data = new FormData();
        data.append("product_name", product_name);
        data.append("product_category", product_category);
        data.append("product_cost", product_cost);
        data.append("remaining_units", remaining_units);
        data.append("user_id", localStorage.getItem("user_id") || 1); // fallback to 1
        data.append("product_photo", product_photo);

        try {
            const response = await axios.post("http://kipruto.alwaysdata.net/api/add_product", data);
            setLoading("");
            setSuccess("Product uploaded successfully.");
            setProductName("");
            setProductCategory("");
            setProductCost("");
            setRemainingUnits("");
            setProductPhoto(null);
        } catch (error) {
            setError("Failed to add product. Please try again.");
        }
    };

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <form onSubmit={submit}>
                    {loading && <h5>{loading}</h5>}
                    {success && <h5 className="text-success">{success}</h5>}
                    {error && <h5 className="text-danger">{error}</h5>}
                    <h3>Upload Products</h3>

                    <input
                        type="text"
                        placeholder="Enter Product name.."
                        className="form-control"
                        value={product_name}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                    <br />

                    <input
                        type="text"
                        placeholder="Enter product category (e.g., Drinks, Snacks)"
                        className="form-control"
                        value={product_category}
                        onChange={(e) => setProductCategory(e.target.value)}
                        required
                    />
                    <br />

                    <input
                        type="number"
                        placeholder="Enter product cost (price per unit)"
                        className="form-control"
                        value={product_cost}
                        onChange={(e) => setProductCost(e.target.value)}
                        required
                    />
                    <br />

                    <input
                        type="number"
                        placeholder="Enter remaining units in stock"
                        className="form-control"
                        value={remaining_units}
                        onChange={(e) => setRemainingUnits(e.target.value)}
                        required
                    />
                    <br />

                    <b className="text-dark">Browse/Upload Product Image</b>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setProductPhoto(e.target.files[0])}
                        required
                    />
                    <br />

                    <button type="submit" className="btn btn-outline-primary">Upload Product</button>
                </form>
            </div>
        </div>
    );
};
export default Addproduct;