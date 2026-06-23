// Manages catalog. Makes image sharing possible. Dropdown to see your own available products. 
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";



const Products = () => {
    //initialize the hooks
    const [products, setProducts] = useState([]) // empty array by default
    const [loading, setLoading] = useState("")//used to load message
    const [error, setError] = useState("")//used for error message

    // hook for navigation
    const navigation = useNavigate()

    //variable to specify the image location in DB
    const img_url = "https://kipruto.alwaysdata.net/static/images/"

    //function to retrieve the data (products from the db)
    const getproducts = async () => {
        
        setLoading("Please wait, we are retrieving the products..");

        try{
            const response = await axios.get("https://kipruto.alwaysdata.net/api/get_all_products")

            setProducts(response.data.products || [])
            setLoading("")
        } catch(error){
            setLoading(" ")
            setError("There was an error")
        }

    }

    //function to call the getproducts() function - ndio the same image isishinde imejirudia ikidisplay
    useEffect(() => {// useEffect hook makes the getproducts() to run only once which only runs when component/page has finished loading
        getproducts()
    }, []);

    return( 
        <div className="container">
            <h3 className="display-4"><b>Available Products</b></h3>
            {loading && <p>{loading}</p>}
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-3 mb-4" key={product.product_id}>
                        <div className="card shadow h-100">
                            <img
                                src={img_url + product.image_url}
                                alt={product.product_name}
                                className="card-img-top p-2"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5>{product.product_name}</h5>
                                <p className="text-muted">Category: {product.category || 'N/A'}</p>
                                <p className="text-dark">Ksh {product.product_cost || 0}</p>
                                <p>In stock: {product.remaining_units || 0}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;