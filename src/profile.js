import React, { useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import {useStateValue} from "./StateProvider";
import { Avatar } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { storage, database, auth } from './firebase';
import "./profile.css";
import Info from "./profileInfo";
import Update from './profileUpdate';
import Button from '@material-ui/core/Button';
import Header from './Header';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

function Profile() {
    const [{user}, dispatch] = useStateValue();
    const [image, setImage] = useState(null);
    const [userData, setUserData] = useState('');
    const [update, setUpdate] = useState(false)
;

    const getUser = () => {
        database
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

    const handleChange = (event) => {
        event.preventDefault();
        setImage(event.target.files[0]);
    }

    const uploadPhoto = async () => {
            const fileRef = storage.ref().child(image.name);
            const task = fileRef.put(image);
            try {
                await task;
                const url = await fileRef.getDownloadURL();
                setImage(null);
                return url 
            } catch (e) {
                console.log(e);
                return null;
            }}
    

    const handleUpload = async () => {
        const imgUrl = await uploadPhoto();
        if (imgUrl == null) {
            console.log('not working')
        } else {
        database.collection('people').doc(user.uid).update({
            url: imgUrl,
        });
        }
    }

  return user?.displayName ?(

    <div className="profile_container">
            <Header />
            <div className="profile">
            <div className="profile_left">
                <div className="profile_reverse">
                    <div className="side_bar">
                        <Avatar src={userData ? userData.url : ''}/>
                        <h2>My Profile</h2>
                    </div>


                        {update ? (
                            <Update />
                        ) : (
                            <Info />
                        )}
            

                    <div className="button_Change">
                        {update ? (
                            <Button className="button_edit" onClick={() => setUpdate(false)}>Account Setting</Button>
                        ) : (
                            <Button className="button_edit" onClick={() => setUpdate(true)}>Edit Info</Button>
                    
                        )}   
                    </div>
                </div>
            </div>

            <div className="profile_right">
                <div className="profile_img"> 
                    <Avatar className="img" src={userData ? userData.url : ''}/>

                    <div className="buttons">
                        <input type="file" onChange={handleChange} />
                        
                        <IconButton onClick={handleUpload}>
                            <AddAPhotoIcon className="icon_image" />
                        </IconButton>

                    </div>

                    <div className="card_name">
                        <p className="card_text">{userData? userData.fname: ''}</p>
                        <p className="card_age">{userData? userData.age: ''}</p>
                    </div>
                    <div className="card_name2">
                        <PersonOutlineIcon className="icon_card" fontSize="small"></PersonOutlineIcon>
                        <p>{userData? userData.gender: ''}</p>
                    </div>
                </div>

            </div>

            </div>
        </div>
  ) : (
      <h1>Not Found</h1>
  )
}

export default Profile;
