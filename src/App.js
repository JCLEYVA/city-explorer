
 

import React from 'react';
import Header from './components/Header'
// import Main from './components/Main'
import Footer from './components/Footer';
import Weather from './components/Weather';
import Explorer from './components/Explorer.js';
import SpecificForecast  from './components/SpecificForecast';
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherObj: null,
      weatherforobj: null
    };
  };
  updateParent = (obj1, obj2) =>{
    console.log("obj1: ", obj1);
    if(obj1 !== null) this.setState({weatherObj : obj1});
    if(obj2 !== null) this.setState({weatherforobj: obj2});
  }
  render(){
    return (
      <>
        <Header />
        <Explorer updateParent={this.updateParent}/>
        <Weather 
          // description={this.state.weatherObj.description}
          // temp={this.state.weatherObj.temp}
          // windSpeed={this.state.weatherObj.windSpeed}
          // humidity={this.state.weatherObj.humidity}
        />
        <SpecificForecast />
        {/* <Main /> */}
        <Footer />
      </>
    )
  }
}

export default App;