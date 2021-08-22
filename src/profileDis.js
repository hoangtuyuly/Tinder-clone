import React, { useState, useEffect } from "react";
import {useStateValue} from "./StateProvider";
import { database } from './firebase';
import './profileDis.css';


function Discover() {
  const [{user}, dispatch] = useStateValue();
  const [userData, setUserData] = useState('');
  const [valueAge, setValueAge] = useState([]);
  const [valueLocation, setValueLocation] = useState([]);

  const getUser = async() => {
    const currentUser = await database
            .collection('people')
            .doc(user.uid)
            .get()
            .then((document) => {
                setUserData(document.data());
            })
    }
  
  useEffect(() => {
    getUser();
    }, []);
  
  useEffect(() => {
    setValueAge(userData.agePre);
  }, [userData]);

  useEffect(() => {
    setValueLocation(userData.locationPre);
  }, [userData]);

  return (
    <div className="discover">
      <div className="location_fill">
        <div className="text">
          <p>Location</p>
        </div>
        <div className="autofill_info">
            <p> {userData? userData.location: ''} </p>
        </div>
      </div>
      <div className="location_slide">
        <div className="location_text">
          <p>Distance Preference</p> 
          {valueLocation? 
            <p>{valueLocation[0]} - {valueLocation[1]} Km</p> :
            ''}
        </div>
      </div>
      <div className="looking_for">
        <p>Looking for</p>
        <p>{userData.genderLook}</p>
      </div>
      <div className="age_slide">
        <div className="age_text">
          <p>Age Preference</p>
          {valueAge? 
            <p> {valueAge[0]} - {valueAge[1]} Age</p> :
            '' }
        </div>
      </div>
    </div>
  );
}

export default Discover;
