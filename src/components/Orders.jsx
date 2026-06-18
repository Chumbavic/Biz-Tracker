// contains all the orders. It shows their state. Tracks the amount of unit per product.

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
    // declare the hooks
    const[orders, setOrders] = useState("");
    const[loading, setLoading] = useState("");

    return(
        <div className='row'>
            {/* Pending Orders */}
            <div className='col-md-4'>
                <h4>Pending Orders</h4>
                

            </div>

            {/* Completed Orders */}
            <div className='col-md-4'>
                <h4>Completed Orders</h4>

            </div>

            {/* All Recent Orders */}
            <div className='col-md-4'>
                <h4>Recent Orders</h4>

            </div>

        </div>
    );

    
};

export default Orders;