import axios from 'axios';
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import Global from '../../Global';

export default class CreateApuesta extends Component {
    cajaUser = React.createRef();
    cajaFecha= React.createRef();
    cajaResultado= React.createRef();
    state = {
        statusPost: false
    }
    createApuesta = (e) => {
        e.preventDefault();
        var user = this.cajaUser.current.value;
        var fecha = this.cajaFecha.current.value;
        var resultado = this.cajaResultado.current.value;
        var request = "/api/apuestas";
        var url = Global.urlChampions + request;
        var newApuesta = {
            idApuesta: 0,
            usuario: user,
            resultado: resultado,
            fecha: fecha
        }
        axios.post(url, newApuesta).then(res=>{
            this.setState({
                statusPost:true
            });
        });
    }
  render() {
    return (
      <div>
        <h1 className='display-2'>Crear Apuesta</h1>
        <form className="form-floating">
        <div className="form-floating mb-3">

        <div className="form-floating mb-3">
        <input type="text" ref={this.cajaUser} className="form-control" id="floatingInput" placeholder="Hops. sin esperanzas"/>
        <label htmlFor="floatingInput">Nombre de usuario</label>
        </div>

        <div className="form-floating mb-3">
        <input type="text" ref={this.cajaResultado} className="form-control" id="floatingInput" placeholder="Hops. sin esperanzas"/>
        <label htmlFor="floatingInput">Resultado</label>
        </div>

        <div className="form-floating mb-3">
        <input type="text" ref={this.cajaFecha} className="form-control" id="floatingInput" placeholder="Avenida de sin salida"/>
        <label htmlFor="floatingInput">Fecha</label>
        </div>
        <button className='btn btn-success' onClick={this.createApuesta}>
            Crear apuesta
        </button>
        </div>
        </form>
        {
            this.state.statusPost === true && 
            (<Navigate to="/apuestas"/>)
        }
      </div>
    )
  }
}
