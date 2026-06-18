// Manages catalog. Makes image sharing possible. Dropdown to see your own available products. 
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
            const response = await axios.get("https://kipruto.alwaysdata.net/api/get_product_details")

            setProducts(response.data)
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
        <div className="row" style={{
                backgroundImage: "url('/images/background1.jpg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: "100vh",
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <h3 className="display-4"><b>Available Products</b></h3>

            {/* binding the success and the error messages */}
            {loading  && <p className="text-dark">{loading}</p>}
            {error && <p className="text-danger">{error}</p>}
            
            {products.map((product) => ( //map is a function that loops though products and displays each product
            <div className="row justify-content-center mb-2" key={product.id}> {/*key inamake a specific column ikuwe specified to the id of the product*/}
                {/* card to display the product on the page */}
                <div className="card shadow card-margin m-2 " style={{height: '850px', border: '1px solid grey', borderRadius: '10px',background: 'rgba(242, 242, 242, 0.43)'}}>
                    <img 
                        src={img_url + product.product_photo} 
                        alt={product.product_name}
                        className="product_img mt-2 p-2"
                        style={{height: '400px', borderRadius: '15px'}}
                    />
                    <div className="card-body">
                        <h5 className="mt-2" style={{color: 'black'}}>{product.product_name}</h5>
                        <p className="text-muted">{product.product_description}</p>
                        <p className="text-dark">Ksh {product.product_cost}</p>
                    </div>
                </div>
            </div>
            ))}
        </div>
    );
};

export default Products;