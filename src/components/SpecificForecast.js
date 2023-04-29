import React from 'react'
import{ ListGroup } from 'react-bootstrap'


export default class SpecificForecast extends React.Component {
  render() {
    return (
        <ListGroup className='mb-1 sf'>
            <ListGroup.Item variant="info">{this.props.date}</ListGroup.Item>
            <ListGroup.Item variant="light">{this.props.description}</ListGroup.Item>
        </ListGroup>
    )
  }
}