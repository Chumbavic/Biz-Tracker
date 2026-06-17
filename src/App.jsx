import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Signup from './components/Signup';


function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>Biz-Tracker</h1>

          </header>

          {/* navigation links */}
          <nav>
            <Link to={"/"}>DashBoard</Link>
            <Link to={"/signup"}>Sign Up</Link>
            <Link to={"/"}>Sign In</Link>
            <Link to={"/"}>Perfomance</Link>
            <Link to={"/"}>Customers</Link>
            <Link to={"/"}>Products</Link>
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
            <Route path='/perfomance' element={<Performance/>}/>
            <Route path='/customers' element={<Customers/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/costs' element={<Costs/>}/>
          </Routes>

        </div>
    </BrowserRouter>  
  )
}

export default App
