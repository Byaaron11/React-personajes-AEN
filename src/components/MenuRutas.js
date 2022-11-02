import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Global from "../Global";
import loading from '../assets/images/loading.gif';
import logo from '../assets/images/logo.png';
export default class Menu extends Component {
  //Aqui voy a hacer un get de los equipos de la champions
  state = {
    series: [],
    statusSeries: false
  }

  loadSeries = () => {
    var request = "/api/Series";
    var url = Global.urlSeries + request;
    axios.get(url).then(response => {
      this.setState({
        series: response.data,
        statusSeries: true
      });
    });
  }
//Este método se ejecuta al cargar la página
componentDidMount = () => {
  this.loadSeries();
}

  render() {
    return (    
      <nav style={{backgroundColor: "#e3f2fd"}} className="navbar navbar-expand-lg"> 
      {/* navbar-dark bg-dark o custom -> style={{backgroundColor: "#e3f2fd"}} pero dejando className="navbar navbar-expand-lg" */}
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} width="100" alt='...'/>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/nuevo">
                  Nuevo Personaje
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/modificar">
                  Modificar Personajes
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/error">
                  Sin ruta ❗
                </NavLink>
              </li> */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Series
                </a>
                <ul className="dropdown-menu">

                  {
                    this.state.statusSeries === true ?
                    (this.state.series.map((serie, index)=>{
                      return(/* La key es para evitar que salga warning, vamos para diferenciar una etiqueta de otra */
                        <a key={serie.idSerie} className="dropdown-item" href={"/serie/"+serie.idSerie}>
                          {serie.nombre}
                        </a>
                      )
                    })):
                    (<img className="dropdown-item" src={loading} alt="..."/>)
                    
                  }
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
