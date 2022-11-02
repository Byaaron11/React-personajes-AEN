import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Global from "../Global";
import loading from '../assets/images/loading.gif';
export default class Menu extends Component {
  //Aqui voy a hacer un get de los equipos de la champions
  state = {
    equipos: [],
    stateEquipos: false
  }

  loadEquipos = () => {
    var request = "/api/Equipos";
    var url = Global.urlChampions + request;
    axios.get(url).then(response => {
      this.setState({
        equipos: response.data,
        stateEquipos: true
      });
    });
  }

componentDidMount = () => {
  this.loadEquipos();
}

  render() {
    return (    
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
      {/* navbar-dark bg-dark o custom -> style={{backgroundColor: "#e3f2fd"}} pero dejando className="navbar navbar-expand-lg" */}
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Ir a Home
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
                <NavLink className="nav-link active" aria-current="page" to="/hospitales">
                  Api hospitales
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/departamentos">
                  Departamentos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/apuestas">
                  Apuestas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/error">
                  Sin ruta ❗
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Champions
                </a>
                <ul className="dropdown-menu">

                  {
                    this.state.stateEquipos === true ?
                    (this.state.equipos.map((equipo, index)=>{
                      return(
                        <a key={equipo.idEquipo} className="dropdown-item" href={"/equipo/"+equipo.idEquipo}>
                          {equipo.nombre}
                        </a>
                      )
                    })):
                    (<img className="dropdown-item" src={loading} alt="..."/>)
                    
                  }




                  {/* <li>
                    <a className="dropdown-item" href="/">
                      this.state.nombre
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      No uses map() si solo obtienes 1 objeto
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Utiliza Axios.get(url).then(res {'=>'} setState)
                    </a>
                  </li> */}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
