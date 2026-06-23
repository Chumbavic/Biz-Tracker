import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// displays a simple overview and quick actions
const Dashboard = () => {
    // initialize the hooks
    const [ summary, setSummary ] = useState({})
    const [ orders, setOrders ] = useState([])
    const [ customers, setCustomers ] = useState([])
    const [ loading, setLoading ] = useState("")
    const [ error, setError ] = useState("")

    // navigation hook
    const navigation = useNavigate()

    // retrieve the data from the database
    // function to retrieve sales
    const getsales = async () => {
        
        setLoading("Just a sec...")
        try{
            const sales_response = await axios.get("https://kipruto.alwaysdata.net/api/analytics_summary")
            setSummary(sales_response.data)
            setLoading("")

        } catch(error) {
            setLoading("")
            setError("Oops! An error occured")
        }
    } 

    // function to retrieve pending orders
    const getorders = async () => {
        setLoading("Retrieving Orders")
        
        try{
            const orders_response = await axios.get("https://kipruto.alwaysdata.net/api/get_all_orders")
            setOrders(orders_response.data.orders || [])
            setLoading("")
        } catch(error) {
            setLoading("")
            setError("Oops! An error occured")
        }
    }

    // function to retrieve customers
    const getcustomers = async () => {
        setLoading("Retrieving Customers")

        try{
            const customers_response = await axios.get("https://kipruto.alwaysdata.net/api/get_customers_with_orders")
            setCustomers(customers_response.data.customers || [])
            setLoading("")
        } catch(error) {
            setLoading("")
            setError("Oops! An error occured")
        }
    }

    // function to mark pending to complete
    const markComplete = async (orderId) => {
        try {
            await axios.put(`https://kipruto.alwaysdata.net/api/order_status/${orderId}`);
            // refresh
            getorders();
        } catch (error) {
            setError("Could not update order status");
        }
    };
    

    // function to call all the funcitons once 
    useEffect(() => {
        getcustomers()
        getorders()
        getsales()
    }, []);

    return(
        <div 
            className="conainer_fluid">
            <h3>Dashboard</h3>
            <div className="row"
            style={{
                justifyContent : "center"
            }}>
                <h5>Hey I am Dashboard</h5>

                {/* div to carry the three columns */}
                <div className="row mb-3" style={{ height: "60vh", border: "solid black 1px", borderRadius: "5px" }}>
                    
                    {/* Today's sales div - now displays summary numbers */}
                    <div className="col-md-4">
                        <h5>Today's Sales</h5>
                        <hr />
                        {/* Instead of .map(), we show the summary data directly */}
                        <div className="card shadow card-margin m-2" style={{ border: '1px solid grey', borderRadius: '10px', background: 'rgba(242, 242, 242, 0.43)' }}>
                            <div className="card-body">
                                <h5 className="mt-2" style={{ color: 'black' }}>Total Sales</h5>
                                <p className="text-dark">Ksh {summary.today_sales?.total || 0}</p>
                            </div>
                        </div>
                        <div className="card shadow card-margin m-2" style={{ border: '1px solid grey', borderRadius: '10px', background: 'rgba(242, 242, 242, 0.43)' }}>
                            <div className="card-body">
                                <h5 className="mt-2" style={{ color: 'black' }}>Top Customer</h5>
                                <p className="text-muted">{summary.top_customer?.customer_name || 'None'}</p>
                                <p className="text-dark">{summary.top_customer?.customer_phone || ''}</p>
                            </div>
                        </div>
                    </div>

                    {/* Pending Orders div - now uses actual pending orders */}
                    <div className="col-md-4">
                        <h5>Pending Orders</h5>
                        <hr />
                        {/* Filter only pending orders and map them */}
                        {orders.filter(order => order.order_status === 'Pending').map((order) => (
                            <div className="row justify-content-center mb-2" key={order.order_id}>
                                <div className="card shadow card-margin m-2" style={{ border: '1px solid grey', borderRadius: '10px', background: 'rgba(242, 242, 242, 0.43)' }}>
                                    <div className="card-body">
                                        <h5 className="mt-2" style={{ color: 'black' }}>Order #{order.order_id}</h5>
                                        <p className="text-muted">Customer: {order.customer_name || 'N/A'}</p>
                                        <p className="text-dark">Amount: Ksh {order.order_amount}</p>
                                        <button 
                                            className="btn btn-success btn-sm mt-2"
                                            onClick={() => markComplete(order.order_id)}
                                        >
                                            Mark Complete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Show message if no pending orders */}
                        {orders.filter(order => order.order_status === 'Pending').length === 0 && (
                            <p className="text-muted">No pending orders.</p>
                        )}
                    </div>

                    {/* Top Customers div - now uses actual customers with order counts */}
                    <div className="col-md-4">
                        <h5>Top Customers Today</h5>
                        <hr />
                        {/* Sort by total_orders descending, take top 5, then map */}
                        {customers
                            .sort((a, b) => b.total_orders - a.total_orders)
                            .slice(0, 5)
                            .map((customer) => (
                                <div className="row justify-content-center mb-2" key={customer.customer_id}>
                                    <div className="card shadow card-margin m-2" style={{ border: '1px solid grey', borderRadius: '10px', background: 'rgba(242, 242, 242, 0.43)' }}>
                                        <div className="card-body">
                                            <h5 className="mt-2" style={{ color: 'black' }}>{customer.customer_name}</h5>
                                            <p className="text-muted">{customer.customer_phone}</p>
                                            <p className="text-dark">Orders: {customer.total_orders}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {customers.length === 0 && <p className="text-muted">No customers yet.</p>}
                    </div>
                </div>
                
                {/* div to carry the sms parser */}
                <div 
                id="smsparser" 
                className="col-md-8 btn btn-outline-dark"
                style={{
                    height : "10vh",
                    textAlign : "center",
                    border : "solid black 1px",
                    borderRadius : "5px",
                    alignItems : "center",
                    justifyContent : "center"
                }}
                onClick={() => navigation("/sms-parser")}>
                    <p className="mt-2">Click to Paste your SMS</p>
                </div>
            </div>
            <hr/>

            {/* footer section */}
            <footer>
                {/* divs for footer information */}
                <div className="row">
                    {/* Contact Section div */}
                    <div 
                    id="footer-contact" 
                    className="col-md-4 text-start">
                        <h4 className="bold dark"><b>Contact</b></h4>
                        <p>
                            <img 
                                src=" "
                                alt=" Call Icon"
                                style={{
                                    height : " ",
                                    width : " "
                                }} 
                                
                            />
                            0757184134                           
                        </p>
                        <p>
                            <img 
                                src=" "
                                alt=" Address Icon"
                                style={{
                                    height : " ",
                                    width : " "
                                }} 
                                
                            />
                            11022SouthMalebo200, AP 4020                        
                        </p>
                        <p>
                            <img 
                                src=" "
                                alt=" Email Icon"
                                style={{
                                    height : " ",
                                    width : " "
                                }} 
                                
                            />
                            biztracker@yahoo.com                           
                        </p>

                    </div>

                    {/* Navigation Section div  */}
                    <div id="footer-navigation" className="col-md-2 text-start">
                        <h4 className="bold dark"><b>Navigation</b></h4>
                        <p>Orders</p>
                        <p>Performance</p>
                        <p>Products</p>
                        <p>Customers</p>
                    </div>

                    {/* Solution Section div*/}
                    <div id="footer-solution" className="col-md-2 text-start">
                        <h4 className="bold dark"><b>Solution</b></h4>
                        <p>Get in Touch</p>
                        <p>Who we are.</p>
                    </div>

                    {/* Discover Section div */}
                    <div id="footer-discover" className="col-md-2 text-start">
                        <h4 className="bold dark"><b>Discover</b></h4>
                        <p>Other Applications</p>
                        <p></p>
                    </div>

                    {/* Follow Us Section div */}
                    <div id="footer-followus" className="col-md-2 text-start">
                        <h4 className="bold dark"><b>Follow Us</b></h4>
                        <p>Instagram</p>
                        <p>Facebook</p>
                        <p>LinkedIn</p>
                        <p>Twitter</p>
                    </div>

                </div>
                <hr/>
                {/* Copyright div */}
                <div id="footer-copyright" className="row">
                    <p>
                        &&copy Copyright Biztracker.com. All rights reserved 2026.

                        <span>Privacy & Policy</span>
                        <span>Terms & Conditions</span>
                    </p>

                </div>

            </footer>
        </div>
    );

};

export default Dashboard;