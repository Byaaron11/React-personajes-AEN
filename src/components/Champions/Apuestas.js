import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Global from '../../Global';

export default class Apuestas extends Component {
    state = {
        apuestas: [],
        statusApuestas: false
    }
    loadApuestas = () => {
        var request = "/api/Apuestas";
        var url = Global.urlChampions + request;
        axios.get(url).then(res=> {
            this.setState({
                apuestas: res.data,
                statusApuestas: true
            });
        });
    }
    componentDidMount = () => {
        this.loadApuestas();
    }

  render() {
    return (
      <div>
        <h1 className='display-3'>Tabla de apuestas</h1>
        <table className="table table-danger table-striped-columns">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Usuario</th>
              <th scope="col">Resultado</th>
              <th scope="col">Fecha</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {
                this.state.apuestas.map((a, index)=>{
                    return(
                        <tr key={a.idApuesta}>
                            <td>{a.idApuesta}</td>
                            <td>{a.usuario}</td>
                            <td>{a.resultado}</td>
                            <td>{a.fecha}</td>
                            <td><NavLink className="btn btn-outline-danger" to={"/deleteapuesta/"+a.idApuesta}>
                                Eliminar Apuesta
                                </NavLink>
                            </td>
                        </tr>
                    );
                })
            }
          </tbody>
        </table>
        <NavLink to="/createapuesta" className="btn btn-success">Crear Apuesta</NavLink>
      </div>
    )
  }
}
