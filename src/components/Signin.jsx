import "bootstrap/dist/css/bootstrap.min.css";
import {Link, useNavigate} from "react-router-dom" // useNavogate- is used for route or navigation
import axios from "axios"; //used for accessthe API
import {useState} from "react";// used to manage state


const Signin = () => {
    //Define the hooks
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    //hook for navigation
    const navigate = useNavigate()

    // function to help submit the data 
    const submit = async (e) => {
        e.preventDefault() //prevent default form submission
        
        setLoading("Please wait as we log you in")

        try{
            const data = new FormData();
            data.append("email", email);
            data.append("password", password);

            // post data to the api 
            const response = await axios.post("https://kipruto.alwaysdata.net/api/signin", data);
            
            setLoading("");

            //Check if the response as the user
            if(response.data.user){
                //take us to the homepage
                navigate("/")
            }else{
                //user not found
                setError("Login Failed")
            }

        }catch(error){
            setLoading("");
            setError("There was a server error");

        };
    }


    return (
        <div className = "row justify-content-center mt-5"
        style={{
                backgroundImage: "url('/images/signin.jpg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left',
                height: "100vh",
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}>
            <div className="col-md-6 card shadow p-4"
            style={{background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                fontFamily: "'Inter', sans-serif"
            }}>
                <h2 className="text-primary">Sign In</h2>
                {/* Form  */}
                <form onSubmit = {submit}>
                    {/* bind */}
                    {loading}
                    {error}


                    <input
                    type="email"
                    placeholder="Enter your email.."
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                    required
                    />
                    <br />
                    <input
                    type="pasword"
                    placeholder="enter password.."
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <br />

                    <button type="submit" className="btn btn-primary w-100" 
                    onClick={() => navigate("/")}>Log In</button>
                </form>
                Dont have an account ? <Link to ="/Signup">Sign up</Link>
            </div>
        </div>

    );
};

export default Signin;
