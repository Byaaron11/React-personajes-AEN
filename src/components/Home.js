import React, { Component } from 'react';
import './../App.css';
import imagen from './../assets/images/series-tv.jpg';

export default class Home extends Component {
  render() {
    return (
      <div className='App'>
        <h1 className='display-4' style={{color:"blue"}}>Examen Aaron Estrada Nieto</h1>
        <p>Pero en React</p>
        <img src={imagen}/>
      </div>
    )
  }
}
