import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Signup = () => {

    //Initialize our hooks
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user_phone, setPhone] = useState("");

    //hooks to help indicate state of our signup process
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    // function to help submit the form
    // async - makes the user wait as the data is being synchronised. For (e) this represents the event

    const submit = async(e) => {
        e.preventDefault() //prevents the default javascript actions

        setLoading("Please wait as we try to upload your data...");

        try{
            //add the data in the hooks in a variable
            const data = new FormData(); //form data stores content from the user as an object(dictionary)
            data.append("username", username);//1st username - ifanane na ile ya insomnia (enye tulikuwa tunapea value then tunasubmit) 2nd username- the variable that stores the input from the user(enye iko kwa hook)
            data.append("email", email);
            data.append("passwrd", password);
            data.append("user_phone", user_phone);

            //post the data to the API
            const response = await axios.post("http://kipruto.alwaysdata.net/api/signup", data); //axios ni library that connects frontend to backend

            //update the state to loading
            setLoading("");

            //set the success hook to show a message
            // setSuccess("Data upload was successful")
            setSuccess(response.data.message);

            // clear the form input fields after data submission
            setUsername("");
            setEmail("");
            setPassword("");
            setPhone("");

        }catch (error) {
            setLoading("");
            setError(error.message)
        }
    }

    return(
        <div className='row justify-content-center mt-4'
        style={{
                backgroundImage: "url('/images/signup.jpg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left',
                height: "100vh",
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}>
            <div className='col-md-6 card shadow p-4'
            style={{background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                fontFamily: "'Inter', sans-serif"
            }}>
                <h2>Sign Up</h2>

                {/* form */}
                <form onSubmit={submit}>
                    {loading}
                    {success}
                    {error}


                    <input 
                    type='text' 
                    className='form-control'
                    placeholder='Enter username... '
                    value={username} //sets the value to the variable when the user inputs data in the form
                    onChange={(e) => setUsername(e.target.value)}//on a change once the event has been initiated, setUsername updates the value on the value
                    required/>
                    <br/>
                    <input
                    type='email'
                    className='form-control'
                    placeholder='Enter your email... '
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
                    <br/>
                    <input
                    type='password'
                    className='form-control'
                    placeholder='Enter password... '
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
                    <br/>
                    <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your phone number...'
                    value={user_phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required/>
                    <br/>
                    <button
                    type='submit'
                    className='btn btn-primary'>Create Account</button>
                </form>
                <br/>
                Already have an account?<Link to="/signin">Sign In</Link>
            </div>
        </div>
    );
};
export default Signup;