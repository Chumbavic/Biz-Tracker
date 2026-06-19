import Dashboard from "../../../../AppData/Local/Temp/aefb86ae-0679-4436-9773-c562bdc67f16_biz-tracker.zip.f16/biz-tracker/src/components/Dashboard";

const Contact = () => {


    return(
        <div>
            <h4>Contact Us</h4>

        </div>
    );
};

export default Contact;

//------customers------
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// // the customers section. You can see the customers who are eligible for offers
// const Customers = () => {
//   // hooks
//   const [customers, setCustomers] = useState([]);

//   // hooks for information messages
//   const [loading, setLoading] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // a customer is treated as eligible for a loyalty reward once they cross this number of orders
//   const LOYALTY_MILESTONE = 5

//   // function to get data from the database
//   const getcustomers = async () => {

//     setLoading("Please wait...");

//     try {
//       const response = await axios.get("https://kipruto.alwaysdata.net/api/get_customers")
//       setCustomers(response.data)
//       setLoading("")
//     } catch (error) {
//       setLoading("")
//       setError("Oops! An error occured")
//     }
//   }

//   // function to send the reward sms through the gateway api once a vendor clicks the button
//   const sendreward = async (customerId) => {
//     try {
//       await axios.post("https://kipruto.alwaysdata.net/api/send_reward_sms", {
//         customer_id: customerId
//       })
//       setSuccess("Reward SMS sent")
//     } catch (error) {
//       setError("Could not send the reward SMS, please try again")
//     }
//   }

//   useEffect(() => {
//     getcustomers()
//   }, []);

//   return (
//     <div className="container">
//       <h1>Who's getting an offer today?</h1>

//       {/* binding the information messages */}
//       {loading && <p className="text-dark">{loading}</p>}
//       {error && <p className="text-danger">{error}</p>}
//       {success && <p className="text-success">{success}</p>}

//       <div className="row justify-content-center">
//         {customers.map((customer) => { // map loops though customers and displays each one as a card

//           // a customer counts as eligible once their total orders pass the milestone set above
//           const isEligible = customer.total_orders >= LOYALTY_MILESTONE

//           return (
//             <div
//               className="row justify-content-center mb-2"
//               key={customer.id} // key makes a specific column, set to the id of the customer
//             >
//               <div
//                 className="card shadow card-margin m-2"
//                 style={{
//                   height: '150px',
//                   border: isEligible ? '2px solid gold' : '1px solid grey',
//                   borderRadius: '10px',
//                   background: isEligible ? 'rgba(255, 215, 0, 0.15)' : 'rgba(242, 242, 242, 0.43)'
//                 }}
//               >
//                 <div className="card-body d-flex justify-content-between align-items-center">
//                   <div>
//                     <p className="mt-2" style={{ color: isEligible ? '#b8860b' : 'black' }}>
//                       {customer.customer_name}
//                     </p>
//                     <p className="text-muted">{customer.customer_phone}</p>
//                     <p className="text-muted">Orders: {customer.total_orders}</p>
//                   </div>

//                   {/* the reward button only shows up for customers who actually qualify */}
//                   {isEligible && (
//                     <button
//                       className="btn btn-success"
//                       onClick={() => sendreward(customer.id)}
//                     >
//                       Send Reward SMS
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   );
// };

// export default Customers;

//------Dashboard------
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // displays a simple overview and quick actions. Shows top metrics, a link to the sms parser and the latest pending orders
// const Dashboard = () => {
//   // initialize the hooks
//   const [summary, setSummary] = useState({}) // holds the high level numbers like total sales, total orders, pending count
//   const [recentPending, setRecentPending] = useState([]) // empty array by default
//   const [loading, setLoading] = useState("") // used to load message
//   const [error, setError] = useState("") // used for error message

//   // hook for navigation
//   const navigate = useNavigate()

//   // function to retrieve the dashboard summary data
//   const getsummary = async () => {

//     setLoading("Please wait, we are loading the dashboard...");

//     try {
//       const response = await axios.get("https://kipruto.alwaysdata.net/api/get_dashboard_summary")

//       setSummary(response.data)
//       setLoading("")
//     } catch (error) {
//       setLoading("")
//       setError("There was an error loading the dashboard summary")
//     }
//   }

//   // function to get the 3 most recent pending orders for the quick action table
//   const getrecentpending = async () => {

//     try {
//       const response = await axios.get("https://kipruto.alwaysdata.net/api/get_orders")

//       // filter only the pending ones, sort by date and pick the latest 3
//       const pending = response.data
//         .filter((order) => order.status === 'pending')
//         .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
//         .slice(0, 3)

//       setRecentPending(pending)
//     } catch (error) {
//       setError("There was an error loading the recent orders")
//     }
//   }

//   // function to mark a pending order as complete straight from the dashboard
//   const markcomplete = async (orderId) => {
//     try {
//       await axios.put(`https://kipruto.alwaysdata.net/api/update_order_status/${orderId}`, {
//         status: 'completed'
//       })

//       // remove the order from the pending list once it has been marked complete so the table updates itself
//       setRecentPending((prev) => prev.filter((order) => order.id !== orderId))
//     } catch (error) {
//       setError("Could not mark the order as complete, please try again")
//     }
//   }

//   // function to call getsummary and getrecentpending once the page has finished loading
//   useEffect(() => {
//     getsummary()
//     getrecentpending()
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h3 className="display-4 mb-4"><b>Dashboard</b></h3>

//       {/* binding the loading and error messages */}
//       {loading && <p className="text-dark">{loading}</p>}
//       {error && <p className="text-danger">{error}</p>}

//       {/* top metric cards, this is just a quick snapshot so the vendor does not have to dig for numbers */}
//       <div className="row mb-4">
//         <div className="col-md-3 mb-3">
//           <div className="card text-white bg-primary h-100">
//             <div className="card-body">
//               <h6 className="card-title">Total Sales</h6>
//               <h3>Ksh {summary.total_sales || 0}</h3>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3 mb-3">
//           <div className="card text-white bg-success h-100">
//             <div className="card-body">
//               <h6 className="card-title">Completed Orders</h6>
//               <h3>{summary.completed_orders || 0}</h3>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3 mb-3">
//           <div className="card text-dark bg-warning h-100">
//             <div className="card-body">
//               <h6 className="card-title">Pending Orders</h6>
//               <h3>{summary.pending_orders || 0}</h3>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3 mb-3">
//           <div className="card text-white bg-info h-100">
//             <div className="card-body">
//               <h6 className="card-title">Total Customers</h6>
//               <h3>{summary.total_customers || 0}</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* big button in the middle that takes the vendor straight to the sms parser, this is meant to be the main shortcut on the page */}
//       <div className="row mb-4">
//         <div className="col-12 text-center">
//           <button
//             className="btn btn-lg btn-dark px-5 py-3"
//             onClick={() => navigate('/sms-parser')}
//           >
//             Parse SMS to Record a Sale
//           </button>
//         </div>
//       </div>

//       {/* small table at the bottom showing the 3 latest pending orders so the vendor can clear them fast */}
//       <div className="row">
//         <div className="col-12">
//           <h5 className="mb-3">Latest Pending Orders</h5>

//           {recentPending.length === 0 ? (
//             <p className="text-muted">No pending orders right now.</p>
//           ) : (
//             <table className="table table-bordered table-hover">
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Customer Phone</th>
//                   <th>Total</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentPending.map((order) => ( // map loops through the recent pending orders and displays each one as a row
//                   <tr key={order.id}> {/* key makes the row specific to the id of the order */}
//                     <td>{order.product_name}</td>
//                     <td>{order.customer_phone}</td>
//                     <td>Ksh {order.total}</td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-success"
//                         onClick={() => markcomplete(order.id)}
//                       >
//                         Mark Complete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// // -----orders-----
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// // contains all the orders. It shows their state. Tracks the amount of unit per product.
// const Orders = () => {
//   // declare the hooks
//   const [orders, setOrders] = useState([]); // empty array by default, holds every transaction
//   const [loading, setLoading] = useState("");
//   const [error, setError] = useState("");
//   const [filter, setFilter] = useState("all"); // controls which rows are shown, all, pending or completed

//   // function to get the orders from the database
//   const getorders = async () => {

//     setLoading("Please wait, we are retrieving the orders...");

//     try {
//       const response = await axios.get("https://kipruto.alwaysdata.net/api/get_orders")

//       setOrders(response.data)
//       setLoading("")
//     } catch (error) {
//       setLoading("")
//       setError("There was an error loading the orders")
//     }
//   }

//   // function to call getorders once the page has finished loading, the empty array makes sure it only runs once
//   useEffect(() => {
//     getorders()
//   }, []);

//   // this decides what rows actually get displayed depending on what filter the vendor picked
//   const filteredOrders = orders.filter((order) => {
//     if (filter === "all") return true
//     return order.status === filter
//   })

//   // small helper that returns the right badge color depending on the order status
//   const getstatusbadge = (status) => {
//     if (status === 'completed') {
//       return <span className="badge bg-success">Completed</span>
//     }
//     return <span className="badge bg-warning text-dark">Pending</span>
//   }

//   return (
//     <div className="container mt-4">
//       <h3 className="display-4 mb-4"><b>Orders</b></h3>

//       {/* binding the loading and error messages */}
//       {loading && <p className="text-dark">{loading}</p>}
//       {error && <p className="text-danger">{error}</p>}

//       {/* filter buttons, clicking one just changes the filter state which the table below reacts to */}
//       <div className="mb-3">
//         <button
//           className={`btn btn-sm me-2 ${filter === 'all' ? 'btn-dark' : 'btn-outline-dark'}`}
//           onClick={() => setFilter('all')}
//         >
//           All
//         </button>
//         <button
//           className={`btn btn-sm me-2 ${filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
//           onClick={() => setFilter('pending')}
//         >
//           Pending
//         </button>
//         <button
//           className={`btn btn-sm ${filter === 'completed' ? 'btn-success' : 'btn-outline-success'}`}
//           onClick={() => setFilter('completed')}
//         >
//           Completed
//         </button>
//       </div>

//       {/* the full sales history table, every order is a row, the status badge tells you at a glance if its done or not */}
//       {filteredOrders.length === 0 ? (
//         <p className="text-muted">No orders to show.</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-striped table-bordered">
//             <thead>
//               <tr>
//                 <th>Transaction ID</th>
//                 <th>Customer Phone</th>
//                 <th>Item</th>
//                 <th>Total</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((order) => ( // map is a function that loops though filteredOrders and displays each order as a row
//                 <tr key={order.id}> {/* key makes a specific row, set to the id of the order */}
//                   <td>{order.id}</td>
//                   <td>{order.customer_phone}</td>
//                   <td>{order.product_name}</td>
//                   <td>Ksh {order.total}</td>
//                   <td>{getstatusbadge(order.status)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;

//-----performance-----
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// // contains the performance of the sales (daily, weekly, monthly). Highest and lowest performing timeframes
// const Performance = () => {
//   // hooks
//   const [performanceData, setPerformanceData] = useState([]) // empty array by default, holds the timeframe and total sales pairs
//   const [loading, setLoading] = useState("")
//   const [error, setError] = useState("")
//   const [timeframe, setTimeframe] = useState("daily") // controls which filter is active, daily, weekly or monthly

//   // function to get the performance data for whichever timeframe is currently selected
//   const getperformance = async () => {

//     setLoading("Please wait, we are loading the performance data...");

//     try {
//       const response = await axios.get(`https://kipruto.alwaysdata.net/api/get_performance?timeframe=${timeframe}`)

//       setPerformanceData(response.data)
//       setLoading("")
//     } catch (error) {
//       setLoading("")
//       setError("There was an error loading the performance data")
//     }
//   }

//   // function to call getperformance again whenever the vendor switches the timeframe filter
//   useEffect(() => {
//     getperformance()
//   }, [timeframe]);

//   // sort a copy of the data by total sales so we don't touch the original array
//   const sortedData = [...performanceData].sort((a, b) => b.total_sales - a.total_sales)

//   // best performing are the top entries once sorted highest first
//   const bestPerforming = sortedData.slice(0, 5)
//   // worst performing are the bottom entries, reversed so the lowest one shows first
//   const worstPerforming = [...sortedData].reverse().slice(0, 5)

//   return (
//     <div className="container mt-4">
//       <div className="card bg-dark text-white p-4">

//         {/* header row, title on the left and the filter tabs on the right, same style as the reference design */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h5 className="mb-0">Sales Performance</h5>

//           <div>
//             <button
//               className={`btn btn-sm me-2 ${timeframe === 'daily' ? 'text-primary fw-bold' : 'text-white-50'}`}
//               style={{ background: 'none', border: 'none' }}
//               onClick={() => setTimeframe('daily')}
//             >
//               Daily
//             </button>
//             <button
//               className={`btn btn-sm me-2 ${timeframe === 'weekly' ? 'text-primary fw-bold' : 'text-white-50'}`}
//               style={{ background: 'none', border: 'none' }}
//               onClick={() => setTimeframe('weekly')}
//             >
//               Weekly
//             </button>
//             <button
//               className={`btn btn-sm ${timeframe === 'monthly' ? 'text-primary fw-bold' : 'text-white-50'}`}
//               style={{ background: 'none', border: 'none' }}
//               onClick={() => setTimeframe('monthly')}
//             >
//               Monthly
//             </button>
//           </div>
//         </div>

//         {/* binding the loading and error messages */}
//         {loading && <p className="text-light">{loading}</p>}
//         {error && <p className="text-danger">{error}</p>}

//         <div className="row">

//           {/* best performing on the left so the vendor sees their strong points first */}
//           <div className="col-md-6 mb-3">
//             <h6 className="text-success mb-3">Best Performing</h6>

//             {bestPerforming.length === 0 ? (
//               <p className="text-white-50">No data yet for this timeframe.</p>
//             ) : (
//               bestPerforming.map((entry) => ( // map loops though bestPerforming and shows each one as a row
//                 <div
//                   key={entry.label} // key makes a specific row, set to the timeframe label
//                   className="d-flex justify-content-between align-items-center py-2 px-3 mb-2"
//                   style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}
//                 >
//                   <span>{entry.label}</span>
//                   <span className="text-success fw-bold">Ksh {entry.total_sales}</span>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* worst performing on the right so the vendor knows where to focus marketing or offers */}
//           <div className="col-md-6 mb-3">
//             <h6 className="text-danger mb-3">Worst Performing</h6>

//             {worstPerforming.length === 0 ? (
//               <p className="text-white-50">No data yet for this timeframe.</p>
//             ) : (
//               worstPerforming.map((entry) => ( // map loops though worstPerforming and shows each one as a row
//                 <div
//                   key={entry.label} // key makes a specific row, set to the timeframe label
//                   className="d-flex justify-content-between align-items-center py-2 px-3 mb-2"
//                   style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}
//                 >
//                   <span>{entry.label}</span>
//                   <span className="text-danger fw-bold">Ksh {entry.total_sales}</span>
//                 </div>
//               ))
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Performance;

// ----- products -----
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// // Manages catalog. Makes image sharing possible. Lets vendor add new products through a modal form.
// const Products = () => {
//   // initialize the hooks
//   const [products, setProducts] = useState([]) // empty array by default
//   const [loading, setLoading] = useState("") // used to load message
//   const [error, setError] = useState("") // used for error message
//   const [success, setSuccess] = useState("") // used for success message after adding a product

//   // hooks for the add product modal form
//   const [showModal, setShowModal] = useState(false)
//   const [productName, setProductName] = useState("")
//   const [productDescription, setProductDescription] = useState("")
//   const [productCost, setProductCost] = useState("")
//   const [productPhoto, setProductPhoto] = useState(null)

//   // variable to specify the image location in the database
//   const img_url = "https://kipruto.alwaysdata.net/static/images/"

//   // function to retrieve the data, products from the db
//   const getproducts = async () => {

//     setLoading("Please wait, we are retrieving the products...");

//     try {
//       const response = await axios.get("https://kipruto.alwaysdata.net/api/get_product_details")

//       setProducts(response.data)
//       setLoading("")
//     } catch (error) {
//       setLoading("")
//       setError("There was an error")
//     }
//   }

//   // function to call getproducts once the page has finished loading
//   useEffect(() => {
//     getproducts()
//   }, []);

//   // function that runs when the vendor submits the add product form
//   const handleaddproduct = async (e) => {
//     e.preventDefault()

//     // form data is needed here because we are sending a file along with the text fields
//     const formData = new FormData()
//     formData.append('product_name', productName)
//     formData.append('product_description', productDescription)
//     formData.append('product_cost', productCost)
//     formData.append('product_photo', productPhoto)

//     try {
//       await axios.post("https://kipruto.alwaysdata.net/api/add_product", formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       })

//       setSuccess("Product added successfully")

//       // clear the form fields so its ready for the next product
//       setProductName("")
//       setProductDescription("")
//       setProductCost("")
//       setProductPhoto(null)

//       setShowModal(false)

//       // reload the product list so the new item shows up straight away
//       getproducts()
//     } catch (error) {
//       setError("Could not add the product, please try again")
//     }
//   }

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h3 className="display-4"><b>Available Products</b></h3>
//         <button className="btn btn-dark" onClick={() => setShowModal(true)}>
//           Add New Product
//         </button>
//       </div>

//       {/* binding the success and the error messages */}
//       {loading && <p className="text-dark">{loading}</p>}
//       {error && <p className="text-danger">{error}</p>}
//       {success && <p className="text-success">{success}</p>}

//       <div className="row">
//         {products.map((product) => ( // map is a function that loops though products and displays each product
//           <div className="col-md-3 mb-4" key={product.id}> {/* key makes a specific column, set to the id of the product */}
//             <div className="card shadow h-100">
//               <img
//                 src={img_url + product.product_photo}
//                 alt={product.product_name}
//                 className="card-img-top p-2"
//                 style={{ height: '200px', objectFit: 'cover', borderRadius: '15px' }}
//               />
//               <div className="card-body">
//                 <h5>{product.product_name}</h5>
//                 <p className="text-muted">{product.product_description}</p>
//                 <p className="text-dark">Ksh {product.product_cost}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* add product modal, only shows up when showModal is true */}
//       {showModal && (
//         <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Add New Product</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//               </div>

//               <form onSubmit={handleaddproduct}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="form-label">Product Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={productName}
//                       onChange={(e) => setProductName(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Description</label>
//                     <textarea
//                       className="form-control"
//                       value={productDescription}
//                       onChange={(e) => setProductDescription(e.target.value)}
//                       required
//                     ></textarea>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Cost</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       value={productCost}
//                       onChange={(e) => setProductCost(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Product Photo</label>
//                     <input
//                       type="file"
//                       className="form-control"
//                       onChange={(e) => setProductPhoto(e.target.files[0])}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn btn-dark">
//                     Save Product
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;


// //Backend
// # These are the extra API endpoints needed to support the new frontend pages
// # (Dashboard, Orders, Customers, Performance). Add these into your main app.py
// # alongside your existing signup, signin and add_product routes.

// from flask import *
// import pymysql
// import pymysql.cursors

// app = Flask(__name__)


// # dashboard summary api
// # gives the dashboard page its top metric numbers in one single call
// @app.route("/api/get_dashboard_summary", methods=['GET'])
// def get_dashboard_summary():
//     connection = pymysql.connect(host='localhost', user='root', password='', database='heroe_sokogarden')
//     cursor = connection.cursor(pymysql.cursors.DictCursor)

//     # total sales is just the sum of every completed order
//     cursor.execute("SELECT SUM(total) as total_sales FROM orders WHERE status = 'completed'")
//     total_sales = cursor.fetchone()['total_sales'] or 0

//     cursor.execute("SELECT COUNT(*) as completed_orders FROM orders WHERE status = 'completed'")
//     completed_orders = cursor.fetchone()['completed_orders']

//     cursor.execute("SELECT COUNT(*) as pending_orders FROM orders WHERE status = 'pending'")
//     pending_orders = cursor.fetchone()['pending_orders']

//     cursor.execute("SELECT COUNT(*) as total_customers FROM customers")
//     total_customers = cursor.fetchone()['total_customers']

//     connection.close()

//     return jsonify({
//         "total_sales": total_sales,
//         "completed_orders": completed_orders,
//         "pending_orders": pending_orders,
//         "total_customers": total_customers
//     })


// # get orders api
// # returns every order, used by both the Orders page and the Dashboard quick action table
// @app.route("/api/get_orders", methods=['GET'])
// def get_orders():
//     connection = pymysql.connect(host='localhost', user='root', password='', database='heroe_sokogarden')
//     cursor = connection.cursor(pymysql.cursors.DictCursor)

//     cursor.execute("SELECT * FROM orders ORDER BY order_date DESC")
//     orders = cursor.fetchall()

//     connection.close()

//     return jsonify(orders)


// # update order status api
// # this is what the dashboard "Mark Complete" button calls
// @app.route("/api/update_order_status/<int:order_id>", methods=['PUT'])
// def update_order_status(order_id):
//     data = request.get_json()
//     new_status = data['status']

//     connection = pymysql.connect(host='localhost', user='root', password='', database='heroe_sokogarden')
//     cursor = connection.cursor()

//     cursor.execute("SELECT * FROM orders WHERE id = %s", (order_id,))
//     count = cursor.rowcount

//     if count == 0:
//         return jsonify({"message": "Order not found"})
//     else:
//         cursor.execute("UPDATE orders SET status = %s WHERE id = %s", (new_status, order_id))
//         connection.commit()

//         return jsonify({"success": "Order status updated"})


// # get customers api
// # returns the customer directory along with their total orders so the frontend can work out loyalty eligibility
// @app.route("/api/get_customers", methods=['GET'])
// def get_customers():
//     connection = pymysql.connect(host='localhost', user='root', password='', database='heroe_sokogarden')
//     cursor = connection.cursor(pymysql.cursors.DictCursor)

//     # the join counts how many orders belong to each customer so the frontend doesn't have to calculate it
//     sql = """
//         SELECT customers.id, customers.customer_name, customers.customer_phone,
//                COUNT(orders.id) as total_orders
//         FROM customers
//         LEFT JOIN orders ON orders.customer_id = customers.id
//         GROUP BY customers.id
//     """
//     cursor.execute(sql)
//     customers = cursor.fetchall()

//     connection.close()

//     return jsonify(customers)


// # send reward sms api
// # this is where you would plug in your sms gateway, africastalking or whichever provider you use
// @app.route("/api/send_reward_sms", methods=['POST'])
// def send_reward_sms():
//     data = request.get_json()
//     customer_id = data['customer_id']

//     connection = pymysql.connect(host='localhost', user='root', password='', database='heroe_sokogarden')
//     cursor = connection.cursor(pymysql.cursors.DictCursor)

//     cursor.execute("SELECT * FROM customers WHERE id = %s", (customer_id,))
//     customer = cursor.fetchone()

//     if not customer:
//         return jsonify({"message": "Customer not found"})

//     # this is the part where you would actually call your sms provider with customer['customer_phone']
//     # left as a placeholder since the provider details depend on which gateway you choose

//     return jsonify({"success": "Reward SMS sent to " + customer['customer_phone']})


// # get performance api
// # groups completed orders by the chosen timeframe (daily, weekly or monthly) and totals the sales for each
// @app.route("/api/get_performance", methods=['GET'])
// def get_performance():
//     timeframe = request.args.get('timeframe', 'daily')

//     connection = pymysql.connect(host='localhost', user='root', password='', database='heroe_sokogarden')
//     cursor = connection.cursor(pymysql.cursors.DictCursor)

//     # the date format changes depending on which timeframe was picked
//     if timeframe == 'weekly':
//         date_format = '%Y-%u'   # groups by year and week number
//     elif timeframe == 'monthly':
//         date_format = '%Y-%m'   # groups by year and month
//     else:
//         date_format = '%Y-%m-%d'  # groups by single day

//     sql = f"""
//         SELECT DATE_FORMAT(order_date, '{date_format}') as label, SUM(total) as total_sales
//         FROM orders
//         WHERE status = 'completed'
//         GROUP BY label
//         ORDER BY label
//     """
//     cursor.execute(sql)
//     performance = cursor.fetchall()

//     connection.close()

//     return jsonify(performance)
