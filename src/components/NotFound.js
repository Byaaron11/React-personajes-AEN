import React, { Component } from 'react';
import './../App.css';
import notfound from './../assets/images/NotFounded.gif'

export default class NotFound extends Component {
  render() {
    return (
      <div className='App'>
        <h2>Algo no va bien... 💩</h2>
        <figure className="figure">
          <img src={notfound} width="500" className="figure-img img-fluid rounded" alt="..." />
          <figcaption className="figure-caption text-center">
            Estás donde no deberias de estar...
          </figcaption>
        </figure>
      </div>
    )
  }
}
