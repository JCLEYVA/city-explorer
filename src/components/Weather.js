import React from 'react'
import { ListGroup } from 'react-bootstrap'


export default class Weather extends React.Component {
    render() {
        return (
            <ListGroup className='mb-1 wl'>
                <ListGroup.Item variant="dark">Current Weather</ListGroup.Item>
                <ListGroup.Item variant="warning">Description: {this.props.description}</ListGroup.Item>
                <ListGroup.Item variant="warning">Temperature: {this.props.temp}</ListGroup.Item>
                <ListGroup.Item variant="warning">Wind Speed: {this.props.windSpeed}</ListGroup.Item>
                <ListGroup.Item variant="warning">Humidity: {this.props.humidity}</ListGroup.Item>
            </ListGroup>
        )
    }
}