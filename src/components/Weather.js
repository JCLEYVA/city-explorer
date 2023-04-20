import {Component} from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";


class Weather extends Component{
    constructor(props){
        super(props);
        this.state = {
            error : false,
            forecastData : []
        };
    }



getApiData = async(e)=>{
    e.preventDefault();

    try{
        let newUrl = `http://localhost:3001/weather?lat=47.60621&lon=-122.33207&city=Seattle`;
        let newForecastData = await axios.get(newUrl);
        console.log(Array.from(newForecastData.data));
        this.setState({
            forecastData: newForecastData.data,
            error : true
        })
    }catch(error){
        console.log(error.message)
    }
}

    render(){
    return(
        <>
        {
        <Button variant="primary" type="submit" onClick={this.getApiData}>
        Get Weather Data
        </Button>
        }
        {
            this.state.error?
            <ListGroup>
            {this.state.forecastData.map((createForecastData) => {
            const hasDate = createForecastData.hasOwnProperty('date');
            const hasHighTemp = createForecastData.hasOwnProperty('hightemp');
            const hasLowTemp = createForecastData.hasOwnProperty('lowtemp');
            if (hasDate || hasHighTemp || hasLowTemp) {
              return (
                <ListGroup.Item key={createForecastData.date}>
                  {hasDate && `Date: ${createForecastData.date}`}
                  {hasHighTemp && ` High:${createForecastData.hightemp}`}
                  {hasLowTemp && ` Low:${createForecastData.lowtemp}`}
                </ListGroup.Item>
              );
            } else {
              return null;
            }
          })}


        </ListGroup>
            :
            <p>press the button</p>
        
        }
        </>
    )
}
}

export default Weather;
