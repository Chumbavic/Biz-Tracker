// contains all the orders. It shows their state. Tracks the amount of unit per product.
// Also shows sales performance trends (daily/weekly/monthly).
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'; // used for state management
import axios from 'axios'; // used for API access

const Orders = () => {
    // initialize the hooks
    const [allOrders, setAllOrders] = useState([]); // empty array by default, holds every order
    const [loading, setLoading] = useState(''); // used to load message
    const [error, setError] = useState(''); // used for error message

    // hooks for performance (trends)
    const [performance, setPerformance] = useState([]); // empty array, holds { period, revenue } objects
    const [period, setPeriod] = useState('daily'); // timeframe: 'daily', 'weekly', 'monthly'

    // base URL for API calls
    const BASE_URL = 'http://kipruto.alwaysdata.net';

    // function to fetch all orders from the backend
    const getchOrders = async () => {
        setLoading('Loading orders...');
        try {
            const response = await axios.get(`${BASE_URL}/api/get_all_orders`);
            setAllOrders(response.data.orders || [])
            setLoading('');
        } catch (error) {
            setLoading('');
            setError('Could not load orders.');
        }
    };

    // function to fetch performance trends (daily/weekly/monthly)
    const getPerformance = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/trends?period=${period}`);
            setPerformance(response.data.trends || []); // response is { "trends": [...] }
        } catch (error) {
            setError('Could not load performance data.');
        }
    };

    // function to mark a pending order as complete (PUT request)
    const markComplete = async (orderId) => {
        try {
            await axios.put(`${BASE_URL}/api/order_status/${orderId}`);
            fetchOrders(); // refresh the list to move order to completed
        } catch (error) {
            setError('Could not update order status.');
        }
    };

    // function to call fetchOrders() once the page has finished loading
    useEffect(() => {
        getchOrders();
    }, []);

    // function to call getPerformance() whenever the period changes
    useEffect(() => {
        getPerformance();
    }, [period]);

    // filter orders by status
    const pending = allOrders.filter(o => o.order_status === 'Pending');
    const completed = allOrders.filter(o => o.order_status === 'Completed');
    const recent = [...allOrders]
        .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
        .slice(0, 5); // take the 5 most recent

    // find max revenue for progress bar scaling
    const maxRevenue = performance.reduce((max, p) => Math.max(max, p.revenue), 0);

    return (
        <div className="container mt-4">
            <h3 className="display-4"><b>Orders & Performance</b></h3>

            {/* binding the loading and error messages */}
            {loading && <p>{loading}</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* ------- 3 columns: Pending, Completed, Recent ------- */}
            <div className="row mb-4">
                {/* Pending Orders column */}
                <div className="col-md-4">
                    <h5>Pending Orders</h5>
                    <hr />
                    {pending.length === 0 ? (
                        <p className="text-muted">No pending orders.</p>
                    ) : (
                        pending.map((order) => ( //map is a function that loops though pending orders and displays each one as a card
                            <div className="card shadow card-margin m-2" key={order.order_id} style={{ border: '1px solid grey', borderRadius: '10px', background: 'rgba(255,255,255,0.4)' }}>
                                <div className="card-body">
                                    <h6>Order #{order.order_id}</h6>
                                    <p className="mb-1"><strong>Customer:</strong> {order.customer_name || 'N/A'}</p>
                                    <p className="mb-1"><strong>Amount:</strong> Ksh {order.order_amount}</p>
                                    <p className="mb-1"><strong>Cost:</strong> Ksh {order.order_cost}</p>
                                    <button
                                        className="btn btn-success btn-sm mt-1"
                                        onClick={() => markComplete(order.order_id)}
                                    >
                                        Mark Complete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Completed Orders column */}
                <div className="col-md-4">
                    <h5>Completed Orders</h5>
                    <hr />
                    {completed.length === 0 ? (
                        <p className="text-muted">No completed orders.</p>
                    ) : (
                        completed.map((order) => ( //map is a function that loops though completed orders and displays each one as a card
                            <div className="card shadow card-margin m-2" key={order.order_id} style={{ border: '1px solid grey', borderRadius: '10px', background: 'rgba(255,255,255,0.4)' }}>
                                <div className="card-body">
                                    <h6>Order #{order.order_id}</h6>
                                    <p className="mb-1"><strong>Customer:</strong> {order.customer_name || 'N/A'}</p>
                                    <p className="mb-1"><strong>Amount:</strong> Ksh {order.order_amount}</p>
                                    <p className="mb-1"><strong>Cost:</strong> Ksh {order.order_cost}</p>
                                    <small className="text-muted">{order.transaction_code || 'No txn'}</small>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Recent Orders column */}
                <div className="col-md-4">
                    <h5>Recent Orders</h5>
                    <hr />
                    {recent.length === 0 ? (
                        <p className="text-muted">No recent orders.</p>
                    ) : (
                        recent.map((order) => ( //map is a function that loops though recent orders and displays each one as a card
                            <div className="card shadow card-margin m-2" key={order.order_id} style={{ border: '1px solid grey', borderRadius: '10px', background: 'rgba(255,255,255,0.4)' }}>
                                <div className="card-body">
                                    <h6>Order #{order.order_id}</h6>
                                    <p className="mb-1"><strong>Customer:</strong> {order.customer_name || 'N/A'}</p>
                                    <p className="mb-1"><strong>Amount:</strong> Ksh {order.order_amount}</p>
                                    <span className={`badge ${order.order_status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                                        {order.order_status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* ------- Performance section (below orders) ------- */}
            <div className="row">
                <div className="col-12">
                    <h5>Sales Trends ({period})</h5>
                    <div className="btn-group mb-3">
                        <button
                            className={`btn btn-sm ${period === 'daily' ? 'btn-dark' : 'btn-outline-dark'}`}
                            onClick={() => setPeriod('daily')}
                        >
                            Daily
                        </button>
                        <button
                            className={`btn btn-sm ${period === 'weekly' ? 'btn-dark' : 'btn-outline-dark'}`}
                            onClick={() => setPeriod('weekly')}
                        >
                            Weekly
                        </button>
                        <button
                            className={`btn btn-sm ${period === 'monthly' ? 'btn-dark' : 'btn-outline-dark'}`}
                            onClick={() => setPeriod('monthly')}
                        >
                            Monthly
                        </button>
                    </div>

                    {performance.length === 0 ? (
                        <p className="text-muted">No data for this period.</p>
                    ) : (
                        performance.map((item) => ( //map is a function that loops though performance data and displays each as a progress bar
                            <div className="d-flex align-items-center mb-2" key={item.period}>
                                <span className="col-2 text-end me-2">{item.period}</span>
                                <div className="col-10">
                                    <div className="progress" style={{ height: '25px' }}>
                                        <div
                                            className="progress-bar bg-primary"
                                            role="progressbar"
                                            style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                                            aria-valuenow={item.revenue}
                                            aria-valuemin="0"
                                            aria-valuemax={maxRevenue}
                                        >
                                            {item.revenue}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;