import axios, { Axios } from 'axios';
import React, { Component } from 'react'
import './../../App.css';
import Global from './../../Global';
import loading from '../../assets/images/loading.gif';
import { NavLink } from 'react-router-dom';

export default class TablaHospitales extends Component {
    state = {
        hospitales:[],
        statusHospitales: false
    }
    loadHospitales = () => {
        var request = "/webresources/hospitales";
        var url = Global.urlHospitales + request;
        axios.get(url).then(res=> {
            this.setState({
                hospitales: res.data,
                statusHospitales: true
            });
        });
    }

    componentDidMount = () => {
        this.loadHospitales();
    }


  render() {
    if (this.state.statusHospitales === true) {
    return (
      <div className='App'>
        <h1>Hospitales almacenados</h1>
        <table className="table table-dark table-striped-columns">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Dirección</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Nº de camas</th>
              <th scope="col">Acciones</th>              
            </tr>
          </thead>
          <tbody>
            {
                this.state.hospitales.map((hosp, index) =>{
                    return(
                        <tr key={hosp.idhospital}>
                            <td>{hosp.idhospital}</td>
                            <td>{hosp.nombre}</td>
                            <td>{hosp.direccion}</td>
                            <td>{hosp.telefono}</td>
                            <td>{hosp.camas}</td>                            
                            <td><NavLink className="btn btn-warning" to={"/updatehospital/"+ hosp.idhospital
                        + "/" + hosp.nombre + "/" + hosp.direccion + "/" + hosp.telefono + "/" + hosp.camas}>Modificar</NavLink>                           
                            <NavLink className="btn btn-danger" to={"/deletehospital/"+ hosp.idhospital }>Eliminar</NavLink></td>                            
                        </tr>
                    )
                })
            }
          </tbody>
        </table>
        <NavLink className="btn btn-outline-success" to="/createhospital" >Crear Hospital</NavLink> 
      </div>
    )
    }else{
        return(<img src={loading} width="500" alt='...'/>)
    }
  }
}
