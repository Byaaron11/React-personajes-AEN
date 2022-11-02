import React, { Component } from "react";
import axios from "axios";
import Global from "../../Global";
import loading from "../../assets/images/loading.gif";
import TablaHospitales from "../CrudHospitales/TablaHospitales";
import { NavLink } from "react-router-dom";

export default class Departamentos extends Component {
  state = {
    deps: [],
    statusDep: false,
  };
  loadDepts = () => {
    var request = "/api/Departamentos";
    var url = Global.urlDepartamentos + request;
    axios.get(url).then(res => {
        this.setState({
            deps: res.data,
            statusDep:true
        })
    })
  };
  componentDidMount = () => {
    this.loadDepts();
  };
  render() {
    if (this.state.statusDep === true) {
      return (
        <div>
          <h1>Tabla de Departamentos</h1>
          <hr />
          <table className="table table-info table-striped">
            <thead>
              <tr>
                <th scope="col">Número</th>
                <th scope="col">Nombre</th>
                <th scope="col">Localidad</th> 
                <th scope="col">Acciones</th> 
              </tr>
            </thead>
            <tbody>
                {
                    this.state.deps.map((dep, index)=> {
                        return(
                            <tr key={dep.numero}>
                                <td>{dep.numero}</td>
                                <td>{dep.nombre}</td>
                                <td>{dep.localidad}</td>
                                <td>
                                    <NavLink className="btn btn-info" to={"/empleados/" + dep.numero}>Detalles</NavLink>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
          </table>
        </div>
      );
    } else {
      return <img src={loading} width="500" alt="..." />;
    }
  }
}
