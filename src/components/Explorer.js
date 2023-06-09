import React from 'react';
import {Form, Button, Image} from 'react-bootstrap';
import axios from 'axios';
// import Weather from './Weather';
import ForecastWeather from './ForecastWeather';
import ShowMap from './ShowMap';
import ShowMovies from './ShowMovies';


export default class Explorer extends React.Component {
  constructor(props){
    super(props)
    this.state={
      city: '',
      lat: '',
      lon: '',
      visible: 'none',
      showInfo:false,
      showError:false,
      statusCode:0,
      weatherDataObj:{},
      weatherForecast:[],
      movieDataArray:[],
    
    };
  }

  //Update the city value from Input  
  updateCity = (e) => {
    this.setState({city: e.target.value});
  }
  
  //axios.GET method
  handleCityInfo = async (e) => {
    e.preventDefault()
    await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&format=json&q=${this.state.city}`)
    .then((res) =>{
      let lat = parseFloat(res.data[0].lat).toFixed(2);
      let lon = parseFloat(res.data[0].lon).toFixed(2);
      this.setState({lat, lon, visible:"inline", showInfo:true});
      this.getCurrentWeatherData(lat,lon);
      this.getForecastWeatherData(lat,lon);
      this.getMovieData(this.state.city);
    })
    .catch((error) =>{
      this.setState({showInfo:false, showError:true, statusCode:error.request.status});
      console.log({error:'Unable to geocode'});
    })
  }

  getCurrentWeatherData = (lat ,lon) =>{
    if(this.state.isFound === false) return
    axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`)
    .then((res) =>{
      this.props.updateParent(res.data, null);
       this.setState({weatherDataObj:res});
       console.log(this.state.weatherDataObj)
    }).catch((error) =>{
        this.setState({weatherDataObj:{}});
        console.log({error: 'Something went wrong.'});
    });
  }

  getForecastWeatherData = (lat, lon) =>{
    if(this.state.isFound === false) return
    axios.get(`${process.env.REACT_APP_SERVER}/forecast?lat=${lat}&lon=${lon}`)
    .then((res) =>{
      this.props.updateParent(null, res.data);
      this.setState({weatherForecast:[]});
    }).catch((error) =>{
      this.setState({weatherForecast:[]});
      console.log({error:'Cannot get forecast weather'});
    })
  }

  getMovieData = (city) =>{
    if(this.state.isFound === false) return
    axios.get(`${process.env.REACT_APP_SERVER}/movie?city=${city}`)
    .then((res) =>{
      this.setState({movieDataArray: res.data});
    }).catch((error) =>{
      this.setState({movieDataArray: []});
      console.log({error: 'Something went wrong'});
    });
  }
          render() {
            const{city, lat, lon, visible, showInfo, showError, statusCode, movieDataArray, weatherForecast} = this.state
            return (
              <div className="text-light">
                  <Form onSubmit={this.handleCityInfo}>
                    <Form.Group>
                        <Form.Label className="p-3" htmlFor="inputCity">Enter a city name you want to explorer!!</Form.Label>
                        <Form.Control className="m-3" id="inputCity" placeholder="Enter city you want to explorer"  onChange={this.updateCity}></Form.Control>
                        <Button variant="info" className="m-2" type="submit">Explorer!</Button>
                    </Form.Group>
                </Form>
                  {
                    showInfo ? (
                    <div className='text-primary p-3 '>
                      <div className='parent'>
                        <div className='item1'>
                          <ForecastWeather weatherForecast={weatherForecast}/>
                        </div>
                        <div className="item2">
                          <ShowMap city={city} lat={lat} lon={lon} visible={visible}/>
                        </div>
                        {/* <div className="item3">
                          <Weather windSpeed={weatherDataObj.WindSpeed} temp={weatherDataObj.temp} humidity={weatherDataObj.humidity} description={weatherDataObj.description} />
                        </div> */}
                        <div className="mapImage">
                          <Image className="mapItem" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${lat},${lon}&zoom=12`} alt='map' style={{display:visible}} width="500"></Image>
                        </div>
                        <div className="movieItem">
                          <ShowMovies className="movieItem" movieDataArray={movieDataArray}></ShowMovies>
                        </div>
                      </div>
                    </div>
                    ): showError ? <div>{statusCode} Error. Please try again.</div> : <div></div>
                  }
              </div>
            )
          }
        }
        

