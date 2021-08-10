import { useState, useEffect } from "react";
import { auth } from "./firebase"
import { useHistory, Link  } from "react-router-dom";
import "./signup.css";
import {actionTypes} from "./Reducer";
import {useStateValue} from "./StateProvider";

function SignIn() {
    let history = useHistory();
    const [emailAdress, setEmailAdress] = useState('');
    const [password, setPassword] = useState('');
    const isInvalid = emailAdress === '' || password === '';
    const [state, dispatch] = useStateValue();

    const handlesignIn = async (event) => {
        event.preventDefault();

        try { 
            await auth.signInWithEmailAndPassword(emailAdress, password)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            });
            history.push("/");
             
        } catch(error) {
            setEmailAdress('');
            setPassword('');
            alert(error.message)
        };
    }

  return (
    <div className="sign_up">
        <div className="sign_up_img">
            <img src="https://media.istockphoto.com/vectors/woman-with-laptop-sitting-in-nature-and-leaves-concept-illustration-vector-id1139913278?k=6&m=1139913278&s=612x612&w=0&h=vDks140zgZAaCDrxSW0C4IabyHQI7aM8uw0MfM7gMrs="/>
        </div>

        <div className="sign_up_containner">
            <div className="sign_up_box">
                <img className="sign_upImg"
                src="https://www.iradio.ie/wp-content/uploads/2018/11/tinder-logo.jpg" />
                <form>

                    <input className="input"
                    value={emailAdress}
                    placeholder="Email Adress"
                    type="email" 
                    onChange={(e) => setEmailAdress(e.target.value)} require/>

                    <input className="input"
                    value={password}
                    placeholder="Password"
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} require/>


                    <button className="button"
                    type="submit"
                    disabled={isInvalid}
                    onClick={handlesignIn}>Sign In</button>
                    
                </form>
            </div>
            
            <div className="signIn_link">
                <p>Don't have account?
                    <Link classname="link" to="./signup"> Sign Up
                    </Link>
                </p> 
            </div>
        </div>
    </div>
  );
}

export default SignIn;