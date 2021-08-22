import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import {useStateValue} from "./StateProvider";
import { database, auth } from './firebase';
import "./profile.css";
import { useHistory } from "react-router-dom";
import Discover from "./profileDis"

function Info() {
    const [userData, setUserData] = useState('');
    const [{user}, dispatch] = useStateValue();
    const [state, setState] = useState([]);
    let  history = useHistory();

    const getData = () => {
    const data = database
            .collection('people')
            .doc(user.uid)
            .collection('passion')
            .onSnapshot((snapshot) => {
          setState(snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()})
            ))})
        }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        getData();
    }, []);

    const getUser = () => {
    const currentUser = database
        .collection('people')
        .doc(user.uid)
        .get()
        .then((document) => {
            setUserData(document.data())
        })
    }

    useEffect(() => {
        getUser()
    }, [userData]);

  return user?.displayName && (

    <div className="profile_info">
            <div className="header_1">
                <p>Account Settings</p>
                <Button className="button_logout"
                    onClick={() => {auth.signOut()
                                history.push('/signin')}}>
                
                Log Out</Button>
            </div>
            <div className="box_container">
                <p>User Name</p>
                <p> {userData ? userData.userName : ''} </p>
            </div>

            <div className="box_container">
                <p>First Name</p>
                <p> {userData ? userData.fname : ''} </p>
            </div>

            <div className="box_container">
                <p>Last Name</p>
                <p> {userData ? userData.lname : ''} </p>
            </div>

            <div className="box_container">
                <p>Email</p>
                <p> {userData ? userData.emailAdress : ''} </p>
            </div>

            <div className="box_container">
                <p>Phone Number</p>
                <p> {userData ? userData.phoneNumber : ''}</p>
            </div>

            <div className="box_container">
                <p>Age</p>
                <p> {userData ? userData.age : ''} </p>
            </div>

            <div className="box_container">
                <p>Gender</p>
                <p> {userData ? userData.gender : ''} </p>
            </div>

            <div className="box_container">
                <p>Sexual Orientation</p>
                <p> {userData ? userData.sex : ''} </p>
            </div>

            <div className="header_1">
                <p>About you</p>
            </div>
            <div className="text_container_info">
                <p className="text_info"> {userData ? userData.text : ''} </p>
            </div>


            <div className="header_1">
                <p>Passions</p>
            </div>

            <div className="passion_button_container">
                {state.map(((item) => (
                    item?.select? (
                        <Button 
                            className = "passion_button_info"
                        > {item? item.name : ''} 
                        </Button>) : ('')
                    

                )))}
            </div>
            
            <div className="header_1">
                <p>Discovery Settings</p>
            </div>
        <Discover />
    </div>
  );
}

export default Info;
           
            
            
            
