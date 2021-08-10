import { useState, useEffect } from "react";
import { auth, database } from "./firebase";
import { useHistory, Link } from "react-router-dom";
import "./signup.css";
import array from './data.js';

function SignUp() {
    var batch = database.batch()
    let history = useHistory();
    const [userName, setUserName] = useState('');
    const [emailAdress, setEmailAdress] = useState('');
    const [password, setPassword] = useState('');
    const isInvalid = emailAdress === '' || password === '' || userName === '';

    const DoesuserExist = async (userName) => {
        const result = await database.collection('people').where('userName', '==', userName).get();

        return result.docs.map((user) => user.data().length > 0)
    };


    const handlesignUp = async (event) => {
        event.preventDefault();
        const userExist = await DoesuserExist(userName)
        if (!userExist.length) {
        try { 

            const createUser = auth.createUserWithEmailAndPassword(emailAdress, password).then( async (cred) => {
                await database.collection('people').doc(cred.user.uid).set({
                    userName: userName,
                    emailAdress: emailAdress,
                    fname: '',
                    lname: '',
                    phoneNumber: '',
                    url: ''
            });
                history.push("/signin");
                await cred.user.updateProfile({
                displayName: userName
            });
                await database.collection('people').doc(cred.user.uid).collection('passion').add(
                    {"name": "DIY",
                    "select": false}
                );
                array.forEach((doc) => {
                    const docRef = database.collection('people').doc(cred.user.uid).collection('passion').doc();
                    batch.set(docRef, doc)});
                    batch.commit();
        });


        } catch(error) {
            setEmailAdress('');
            setPassword('');
            setUserName('');
            alert(error.message)}
        } else {
            alert('The user name has been taken')
        }
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
                    value={userName}
                    placeholder="User Name"
                    type="text" 
                    onChange={(e) => setUserName(e.target.value)} require/>

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
                    onClick={handlesignUp}>Sign Up</button>
                    
                </form>
            </div>
            
            <div className="signIn_link">
                <p>Already had an account?
                    <Link classname="link" to="./signin"> Sign In
                    </Link>
                </p> 
            </div>
        </div>

    </div>
  );
}

export default SignUp;