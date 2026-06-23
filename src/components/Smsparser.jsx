import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";

const SmsParser = () => {
    const [smsText, setSmsText] = useState("");
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading("Processing...");
        try {
            const data = new FormData();
            data.append("sms_text", smsText);
            data.append("user_id", localStorage.getItem("user_id") || 1);
            const res = await axios.post("http://kipruto.alwaysdata.net/api/paste_sms", data);
            setLoading("");
            setSuccess("Order posted successfully!");
            setSmsText("");;
        } catch (err) {
            setLoading("");
            setError("Could not parse SMS");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow p-4">
                        <h3 className="text-center mb-3">Paste M‑Pesa SMS</h3>
                        <form onSubmit={handleSubmit}>
                            {loading && <p className="text-center">{loading}</p>}
                            {success && <p className="text-center text-success">{success}</p>}
                            {error && <p className="text-center text-danger">{error}</p>}
                            <textarea
                                className="form-control"
                                rows="8"
                                placeholder="Paste the full M-Pesa confirmation SMS here..."
                                value={smsText}
                                onChange={(e) => setSmsText(e.target.value)}
                                required
                            />
                            <br />
                            <div className="d-grid">
                                <button type="submit" className="btn btn-dark btn-lg">Parse & Save Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    );
};
export default SmsParser;