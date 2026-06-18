import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from "react"; //used for state management
import axios from "axios";// used for API access


const Addproduct = () => {
    // declare the hooks
    const [product_name, setProductName] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [product_price, setProductPrice] = useState("");
    const [product_photo, setProductPhoto] = useState("");

    // hooks to show the information messages
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // function to help submit the data
    const submit = async(e) => {
        e.preventDefault()//prevents js actions  like submission in this case

        // update the loading
        setLoading("Please wait..");

        // data object to store the data entered by the user
        const data = new FormData();
        data.append("product_name", product_name);
        data.append("product_description", product_description);
        data.append("product_price", product_price);
        data.append("product_photo", product_photo);

        // post the data to the API
        try{
            const response = await axios.post("http://kipruto.alwaysdata.net/api/add_product", data);

            setLoading("");

            // update the message hook to successfully added - to show the user
            setSuccess("Product uploaded successfully.");

            //clear the form input fields
            setProductName("");
            setProductDescription("");
            setProductCost("");
            setProductPhoto("");
            
        } catch(error) {
            setError("Failed to add product.Please try again.")
        }
    };

    return(
        <div className="row justify-content-center mt-4"
            style={{
                backgroundImage: "url('/images/addproducts.jpg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: "100vh",
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <div className="col-md-6 card shadow p-4"
            style={{background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                fontFamily: "'Inter', sans-serif"
            }}>

                {/* form */}
                <form onSubmit={submit}> 
                    {/* product_name, product_description, product_cost, product_photo */}

                    {/* bind the status messages */}
                    <h5>{loading}</h5>
                    <h5>{success}</h5>
                    <h5>{error}</h5>

                    <h3>Upload Products</h3>

                    <input
                    type="text"
                    placeholder="Enter Product name.."
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}
                    value={product_name}
                    className="form-control"
                    onChange={(e) => setProductName(e.target.value)}// a function (e) that listens to the event and targets the value
                    
                    />
                    <br/>

                    <textarea
                        className="form-control"
                        placeholder="Describe your product.."
                        style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}
                        value={product_description}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    ></textarea>
                    <br/>

                    <input
                    type="number"
                    placeholder="Enter product cost.."
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}
                    value={product_cost}
                    className="form-control"
                    onChange={(e) => setProductCost(e.target.value)}
                    
                    required
                    />
                    <br/>

                    <b className="text-dark">Browser/Upload Product Image</b>
                    <input
                    type="file"
                    className="form-control"
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}
                    accept="image/*"
                    onChange={(e) => setProductPhoto(e.target.files[0])}
                    />
                    <br/>

                    {/* submit button */}
                    <button
                        type="submit"
                        className="btn btn-outline-primary "
                    >Upload Product</button>

                </form>

            </div>

        </div>
    );
};

export default Addproduct;