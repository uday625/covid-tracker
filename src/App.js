import { FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map'

function App() {

  const [countries,setCountries] = useState(["USA","UK","INDIA"])
  const [country, setCountry] = useState('Worldwide')
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

  const onCountryChange = async (event) =>{
    const countryCode = event.target.value
    // console.log("country code", countryCode)
    setCountry(countryCode)
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <div><h2> COVID TRACKER</h2></div>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem key ='Worldwide' value='Worldwide'>Worldwide</MenuItem>
              {
                countries.map(country=>(
                  <MenuItem key ={country.value} value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
              <InfoBox title ="Coronavirus Cases" cases ={123} total={2000}></InfoBox>
              <InfoBox title ="Recovered" cases ={3456} total={3000}></InfoBox>
              <InfoBox title ="Death" cases ={890} total={4000}></InfoBox>
        </div>   
        <div className="app_map">
              <Map></Map>
        </div>
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h2> Live cases by country</h2>
            <div> Worldwide new cases</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
