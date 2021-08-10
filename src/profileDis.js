import Slider from '@material-ui/core/Slider';
import React, { useState } from "react";
import './profileDis.css';
import { ThemeProvider } from "@material-ui/styles";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme } from '@material-ui/core'

function Discover() {
  const [valueAge, setValueAge] = useState([18, 55]);
  const [valueLocation, setValueLocation] = useState([2, 165]);
  const [age, setAge] = useState('');

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
    setAge(event.target.value);
  };

  return (
    <div className="discover">
      <div className="text">
        <p>Location</p>
      </div>
      <div className="location_slide">
        <div className="location_text">
          <p>Distance Preference</p> <p>{valueLocation[0]} - {valueLocation[1]} Km</p>
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
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}>        

            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Men</MenuItem>
            <MenuItem value={20}>Woman</MenuItem>
            <MenuItem value={30}>Everyone</MenuItem>  
          </Select>
      </div>
      <div className="age_slide">
        <div className="age_text">
          <p>Age Preference</p> <p>{valueAge[0]} - {valueAge[1]} +</p>
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
    </div>
  );
}

export default Discover;
