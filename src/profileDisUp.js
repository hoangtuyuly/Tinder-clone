import Slider from '@material-ui/core/Slider';
import React, { useState, useEffect } from "react";
import { database } from './firebase';
import './profileDis.css';
import { ThemeProvider } from "@material-ui/styles";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import {useSelector} from "react-redux";
import {selectUser} from './features/userReducer';


function DiscoverUp() {
  const user = useSelector(selectUser)
  const [userData, setUserData] = useState('');
  const [valueAge, setValueAge] = useState([18, 55]);
  const [valueLocation, setValueLocation] = useState([2, 165]);
  const [genderLook, setGenderLook] = useState('');
  const [address, setAddress] = useState('');

  const handleSelect = (address) => {
    const result = geocodeByAddress(address)
      .then(() => setAddress(address))
      .catch(error => console.error('Error', error));
  }

  const getUser = () => {
    const currentUser = database
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
    setAddress(userData.location)
  }, [userData]);

  useEffect(() => {
    setGenderLook(userData.genderLook)
  }, [userData]);

  useEffect(() => {
    setValueAge(userData.agePre);
  }, [userData]);

  useEffect(() => {
    setValueLocation(userData.locationPre);
  }, [userData]);




  const updateProfile = async() => {
    await database.collection('people').doc(user.uid).update({
            location: address,
            locationPre: valueLocation,
            agePre: valueAge,
            genderLook: genderLook,
      });
    }

   const AmountSlider = createMuiTheme({
    overrides: {
      MuiSlider: {
    root: {
        color: 'red',
        height: 3,
        padding: '13px 0',
    },
    thumb: {
        height: 30,
        width: 30,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        marginTop: -12,
        marginLeft: -13,
        boxShadow: '#ebebeb 0 2px 2px',
        '&:focus, &:hover, &$active': {
        boxShadow: '#ccc 0 2px 3px 1px',
        },
        '& .bar': {
        // display: inline-block !important;
        height: 9,
        width: 1,
        marginLeft: 1,
        marginRight: 1,
        },
    },
    active: {},
    track: {
        height: 3,
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: 3,
    },
    }}});

  const handleChangeAge = (event, newValue) => {
    setValueAge(newValue);
  };

  const handleChangeLocation = (event, newValue) => {
    setValueLocation(newValue);
  };

  const handleChange = (event) => {
    setGenderLook(event.target.value);
  };


  return (
    <div className="discover">
      <div className="location_fill">
        <div className="text">
          <p>Location</p>
        </div>
        <div className="autofill">
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect(address)}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div className="autofill">
                  <TextField multiline id="standard-basic" className="input_autofill" {...getInputProps({placeholder: 'Search Places'})} />
                  <div className="autocomplete-dropdown-container">
                    {loading ? <div>...loading</div> : ''}
                        {suggestions.map((suggestion) => {
                          const style = {
                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                          };
                          return (
                              <div  className="autofill_option"{...getSuggestionItemProps(suggestion, { style })}>
                                {suggestion.description}
                              </div>
                          )
                      })}
                    </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      </div>
      <div className="location_slide">
        <div className="location_text">
          <p>Distance Preference</p> 
          {valueLocation?
            <p>{valueLocation[0]} - {valueLocation[1]} Km</p> :
            ''}
        </div>
        <div className="slider">
          <ThemeProvider theme={AmountSlider}>
            <Slider
              value={valueLocation}
              onChange={handleChangeLocation}
              step={1}
              min={2}
              max={165}
            />
          </ThemeProvider>
        </div>
      </div>
      <div className="looking_for">
        <p>Looking for</p>
          <Select
            value={genderLook}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}>        

            <MenuItem value={'Men'}>Men</MenuItem>
            <MenuItem value={'Woman'}>Woman</MenuItem>
            <MenuItem value={'Everyone'}>Everyone</MenuItem>  
          </Select>
      </div>
      <div className="age_slide">
        <div className="age_text">
          <p>Age Preference</p>
          {valueAge?
            <p> {valueAge[0]} - {valueAge[1]} +</p> :
            '' }
        </div>
        <div className="slider">
          <ThemeProvider theme={AmountSlider}>
            <Slider
              value={valueAge}
              onChange={handleChangeAge}
              aria-labelledby="range-slider"
              min={18}
              max={55}
            />
          </ThemeProvider>
        </div>
      </div>
      <div className="button_change">
          <Button className="button" onClick={updateProfile}> Update </Button>
      </div>
    </div>
  );
}

export default DiscoverUp;
