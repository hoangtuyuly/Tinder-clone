import React, { useEffect, useState } from "react";
import { database } from './firebase';
import {useStateValue} from "./StateProvider";
import "./profile.css";
import Button from '@material-ui/core/Button';
import DiscoverUp from './profileDisUp';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

function Update() {
    const [{user}, dispatch] = useStateValue();
    const [userData, setUserData] = useState('');
    const [state, setState] = useState([]);
    const [gender, setGender] = useState('');
    const [sex, setSex] = useState('');
    const [text, setText] = useState('');

    const handleChangeGen = (event) => {
        setGender(event.target.value);
    }

    const handleText = (event) => {
        setText(event.target.value)
    }

    const handleChangeSex = (event) => {
        setSex(event.target.value);
    }

    const getUser = () => {
    const currentUser = database
            .collection('people')
            .doc(user.uid)
            .get()
            .then((document) => {
                setUserData(document.data())
            })
    }

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

    useEffect(() => {
        setGender(userData.gender)
    }, [userData]);

    useEffect(() => {
        setSex(userData.sex)
    }, [userData]);

    const updateProfile = () => {
        database.collection('people').doc(user.uid).update({
            fname: userData.fname,
            lname: userData.lname,
            phoneNumber: userData.phoneNumber,
            age: userData.age, 
            gender: gender,
            sex: sex,
            text: text
        });
    }


    const handleBt = async(id) => {
        let newState = state.map((item) => (
                item.id === id ? (
                item.name = item.name,
                item.select = !item.select
            ) : item ));
        await setState(newState);
        console.log(state);;
        const index =  await state.findIndex(i=> i.id === id);
        const result =  await state[index]['select']
        database.collection('people').doc(user.uid).collection('passion').doc(id).update({
            select: result
        })
    }




  return user?.displayName ?(
    <div className="App">
            <div className="header_1">
                <p>Account Update</p>
            </div>
            <div className="box_container">
                <p>User Name</p>
                <input className="input_box" type="text" value={userData ? userData.userName : ''}/>
            </div>

            <div className="box_container">
                <p>First Name</p>
                <input className="input_box" type="text" value={userData ? userData.fname : ''} 
                    onChange={(e) => setUserData({...userData, fname: e.target.value})} />
            </div>

            <div className="box_container">
                <p>Last Name</p>
                    <input className="input_box" type="text" value={userData ? userData.lname : ''} 
                        onChange={(e) => setUserData({...userData, lname: e.target.value})} />
            </div>

            <div className="box_container">
                <p>Email</p>
                <div>
                    <input className="input_box" type="text" value={userData ? userData.emailAdress : ''} />
                </div>
            </div>

            <div className="box_container">
                <p>Phone Number</p>
                    <input className="input_box" type="text" value={userData ? userData.phoneNumber : ''} 
                        onChange={(e) => setUserData({...userData, phoneNumber: e.target.value})} />
            </div>

            <div className="box_container">
                <p>Age</p>
                    <input className="input_box" type="text" value={userData ? userData.age : ''} 
                        onChange={(e) => setUserData({...userData, age: e.target.value})} />
            </div>

            <div className="box_container_gender">
                <p>Gender</p>
                <div className="gender_box1">
                    <Select
                        value={gender}
                        onChange={handleChangeGen}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}>        

                        <MenuItem value={'Men'}>Men</MenuItem>
                        <MenuItem value={'Woman'}>Woman</MenuItem>
                    </Select>
                </div>
            </div>

            <div className="box_container_gender">
                <p>Sexual Orientation</p>
                <div className="gender_box2">
                    <Select
                        value={sex}
                        onChange={handleChangeSex}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}>        

                        <MenuItem value={'Straight'}>Straight</MenuItem>
                        <MenuItem value={'Gay'}>Gay</MenuItem>
                        <MenuItem value={'Lesbian'}>Lesbian</MenuItem>
                        <MenuItem value={'Bisexual'}>Bisexual</MenuItem>
                        <MenuItem value={'Asexual'}>Asexual</MenuItem>
                        <MenuItem value={'Demisexual'}>Demisexual</MenuItem>
                        <MenuItem value={'Pansexaul'}>Pansexaul</MenuItem>
                        <MenuItem value={'Queer'}>Queer</MenuItem>
                        <MenuItem value={'Questioning'}>Questioning</MenuItem>
                    </Select>
                </div>
            </div>

            <div className="header_1">
                <p>About you</p>
            </div>

            <div className="text_container">
                <TextField multiline value={text} onChange={handleText} className="text" id="outlined-basic" label="Introducing yourself" variant="outlined" />
            </div>

            <div className="button_change">
                <Button className="button" onClick={updateProfile}> Update </Button>
            </div>

            <div className="header_1">
                <p>Passions</p>
            </div>

            <div className="passion_button_container">
                {state.map(((item) => (
                    <Button 
                        className = "passion_button"
                        style={{backgroundColor: item.select === true ? "#fa6b4f" : "#D0CDE6" }}
                        onClick={() => handleBt(item.id)}> {item? item.name : ''} 
                    </Button>
                )))}
            </div>

            <div className="header_1">
                <p>Discovery Settings</p>
            </div>

            <DiscoverUp />
    </div>

  ) : (
      <h1>Error</h1>
  )
}

export default Update;
