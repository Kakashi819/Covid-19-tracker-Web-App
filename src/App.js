import "./App.css";
import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@mui/material";

function App() {

  const [country, setCountry] = useState('WorldWide');
  const [countries, setCountries] = useState([]);

  //i want to display all countries and change when something is changed
  useEffect(() => {

    const getCountryData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
        setCountries(countries); // update countries variable
        });
    };
    getCountryData(); // call async function
  }, [countries]);


  const onCountryChange =(event)=>{
    const countryCode =event.target.value;
    setCountry(countryCode);
  }
  
  
  return (
    <div className="app">
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">

          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="Worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>

        </FormControl>
      </div>
    </div>
  );
}

export default App;
