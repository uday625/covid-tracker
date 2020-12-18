import { FormControl, Select, MenuItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [countries,setCountries] = useState(["USA","UK","INDIA"])
   //API : https://disease.sh/v3/covid-19/countries

  useEffect(()=>{
    const getCountriesData = async() =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(response =>response.json())
      .then(data =>{
        const countries = data.map(country=>({
          name: country.country,
          value: country.countryInfo.iso2
        }))
        setCountries(countries)
      })
    }
    getCountriesData()
  },[])

  return (
    <div className="app">
      <h1> COVID TRACKER</h1>
      <div className="app__header">
      <FormControl className="app__dropdown">
        <Select variant="outlined" value="USA">
          {
            countries.map(country=>(
              <MenuItem key ={country.value} value={country.value}>{country.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      </div>
    </div>
  );
}

export default App;
