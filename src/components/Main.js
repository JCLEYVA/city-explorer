import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Weather from './weather'
// import '.App.css'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      map: '',
      error: false,
      errorMsg: '',
      forecast: [],
      // showWeather: false,
    }
  }

  handleCityInput = (ev) => {
    this.setState({
      city: ev.target.value
    })
  }


  getCityData = async (ev) => {
    ev.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${this.state.city}&format=json`

      let cityData = await axios.get(url)
      
      console.log(cityData.data)

      let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=14`

      let letResult = await axios.get(mapUrl)
      // console.log('this is the', letResults.config.url)
      this.setState({ map: letResult.config.url })
      this.setState({ map: mapUrl })
      console.log(cityData.data[0])
      this.setState({
        cityData: cityData.data[0],
        error: false
      })
  this.getWeather()
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: error.message,
        showWeather: false,
      })
    }

  }

  getWeather = async () => {
    // e.preventDefault();
    // let cityName = e.target.value
    // console.log('get weather')
    try {
  
    let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`

    let res = await axios.get(url)
    console.log(res.data)
    console.log('HERE')
    this.setState({
      forecast: res.data
    
    })
    } catch(error){
      console.error(error.message)
      console.error(error.captureStackTrace())
      // TODO: set state with the error boolean and error message
      // this.setState({
      // })
    }
  }

  render() {
    return (
      <>
        {/* <h2>City Data</h2> */}
        <form onSubmit={this.getCityData}>
          <label> Enter in a City name:
            <input type="text" onInput={this.handleCityInput} />
          </label>
          <Button type="submit">Explore!</Button>
        </form>

        {
          this.state.error
            ? <p>{this.state.errorMsg}</p>
            : <p>{this.state.cityData.display_name}</p>
        }

        {this.state.cityData || this.state.map?
        <Card>
          <Card.Text>
            <ul>
              <li>City: {this.state.cityData.display_name}</li>
              <li>Longitude: {this.state.cityData.lon}</li>
              <li>Latitude: {this.state.cityData.lat}</li>
              <li>Map: <img src={this.state.map} alt="City Map" /> </li>
            </ul>
          </Card.Text>
        </Card>
        : null }
      </>
    )
  }
}

export default Main;