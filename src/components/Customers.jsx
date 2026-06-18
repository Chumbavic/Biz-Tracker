// customers section . You can get to see the customers who are eligible for offers 
import "bootstrap/dist/css/bootstrap.min.css"
import {useState, useEffect} from "react";
import axios from 'axios';


const Customers = () => {
    // hooks
    const[customers, setCustomers] = useState([]);

    // hooks for information messages
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // function to get data from the database
    const getcustomers = async() => {

        setLoading("Please wait...");

        try{
            const response = await axios.get("")
            setCustomers(response.data)
            setLoading("")
        } catch (error){
            setLoading("")
            setError("Oops! An error occured")
        }
    }

    useEffect(() => {
        getcustomers()
    }, []);

    return(
        <div className="container">
            <h1>Who's getting an offer today ?</h1>
            <div className="col-md-9">
                 {customers.map((customer) => ( //map is a function that loops though products and displays each product
                    <div className="row justify-content-center mb-2" key={product.id}> {/*key inamake a specific column ikuwe specified to the id of the product*/}
                        {/* card to display the product on the page */}
                        <div className="card shadow card-margin m-2 " style={{height: '850px', border: '1px solid grey', borderRadius: '10px',background: 'rgba(242, 242, 242, 0.43)'}}>
                            <div className="card-body">
                                <p className="mt-2" style={{color: 'black'}}>{customer.customer_name}</p>
                                <p className="text-muted">{customer.customer_phone}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>       
        </div>
    );

};

export default Customers;