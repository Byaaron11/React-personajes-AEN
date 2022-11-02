import React, { Component } from "react";
import Global from "../../Global";
import axios from "axios";
import { NavLink } from "react-router-dom";
import loading from "./../../assets/images/loading.gif";

export default class Empleados extends Component {
  state = {
    empleados: [],
    statusEmp: false,
  };

  loadEmpleados = () => {
    var dept = this.props.id;
    var request = "/api/Empleados/EmpleadosDepartamento/" + dept;
    var url = Global.urlEmpleados + request;
    axios.get(url).then((res) => {
      this.setState({
        empleados: res.data,
        statusEmp: true,
      });
    });
    console.log(this.state.empleados);
  };

  componentDidMount = () => {
    this.loadEmpleados();
  };

  render() {
    if (this.state.statusEmp === true) {
      return (
        <div>
          <h1>
            Empleados de <span style={{ color: "blue" }}>{this.props.id}</span>
          </h1>
          <table className="table table-secondary table-striped-columns">
            <thead>
              <tr>
                <th scope="col">Apellido</th>
                <th scope="col">Oficio</th>
                <th scope="col">Salario</th>
              </tr>
            </thead>
            <tbody>
              {this.state.empleados.map((emp, index) => {
                return (
                  <tr key={emp.idEmpleado}>
                    <td>{emp.apellido}</td>
                    <td>{emp.oficio}</td>
                    <td>{emp.salario}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <NavLink to="/departamentos" className="btn btn-outline-secondary">
            Volver
          </NavLink>
        </div>
      );
    }else{
        return(<img src={loading} width="500" alt="..."/>)
    }
  }
}
