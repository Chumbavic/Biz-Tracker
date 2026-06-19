import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Performance from './components/Performance';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import About from './components/About';
import Orders from './components/Orders';  
import Customers from './components/Customers';
import Products from './components/Products';
import Costs from './components/Costs';


function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1 className='text-dark'>Biz-Tracker</h1>

          </header>

          {/* navigation links */}
          <nav>
            <Link to={"/"}>DashBoard</Link>
            <Link to={"/signup"}>Sign Up</Link>
            <Link to={"/signin"}>Sign In</Link>
            <Link to={"/performance"}>Perfomance</Link>
            <Link to={"/customers"}>Customers</Link>
            <Link to={"/products"}>Products</Link>
            <Link to={"/costs"}>Costs</Link>
            <Link to={"/orders"}>Orders</Link>
            <Link to={"/contact"}>Contact Us</Link>
            <Link to={"/about"}>About Us</Link>
          </nav>

          {/* routes section */}
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/performance' element={<Performance/>}/>
            <Route path='/customers' element={<Customers/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/costs' element={<Costs/>}/>
          </Routes>

        </div>
    </BrowserRouter>  
  )
}

export default App
