import { FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './components/InfoBox/InfoBox';
import Map from './components/Map/Map'
import Table from './components/Table/Table'
import {sortData} from './util'

function App() {

  const [countries,setCountries] = useState([])
  const [country, setCountry] = useState('Worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response =>response.json())
    .then(data =>{
      setCountryInfo(data)
    })
  },[])

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
        const sortedData = sortData(data)
        setTableData(sortedData)
      })
    }
    getCountriesData()
  },[])

  const onCountryChange = async (event) =>{
    const countryCode = event.target.value
    setCountry(countryCode)
    const url = countryCode ==='Worldwide'? 
                'https://disease.sh/v3/covid-19/all' :
                `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
    .then(response =>response.json())
    .then(data =>{
      setCountryInfo(data)
    })
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
              <InfoBox title ="Coronavirus Cases" cases ={countryInfo.todayCases} total={countryInfo.cases}></InfoBox>
              <InfoBox title ="Recovered" cases ={countryInfo.todayRecovered} total={countryInfo.recovered}></InfoBox>
              <InfoBox title ="Death" cases ={countryInfo.todayDeaths} total={countryInfo.deaths}></InfoBox>
        </div>   
        <div className="app_map">
              <Map></Map>
        </div>
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h2> Live cases by country</h2>
            <Table countries={tableData}/>
            <div> Worldwide new cases</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
