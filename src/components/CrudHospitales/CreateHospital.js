import axios from 'axios';
import React, { Component } from 'react';
import Global from './../../Global';
import { NavLink } from 'react-router-dom';

export default class CreateHospital extends Component {
    state = {
        statusForm: false
    }

    cajaId = React.createRef();
    cajaNombre = React.createRef();
    cajaDireccion = React.createRef();
    cajaTel = React.createRef();
    cajaCamas = React.createRef();

    enviarDatos = (e) => {
        e.preventDefault();
        var request = "/webresources/hospitales/post";
        var url = Global.urlHospitales + request;
        var hospital = {
            idhospital: parseInt(this.cajaId.current.value),
            nombre: this.cajaNombre.current.value,
            direccion: this.cajaDireccion.current.value,
            telefono: this.cajaTel.current.value,
            camas: parseInt(this.cajaCamas.current.value)
        }
        axios.post(url, hospital).then(res=>{
            this.setState({
                statusForm: true
            });
        });
    }


  render() {
    return (
      <div>
        <h1>Crear Hospital</h1>
        <form>
        <div className="form-floating mb-3">
        <input type="text" ref={this.cajaId} className="form-control" id="floatingInput" placeholder="ej: 10"/>
        <label htmlFor="floatingInput">Introduzca nuevo id:</label>
        </div>
        <div className="form-floating mb-3">
        <input type="text" ref={this.cajaNombre} className="form-control" id="floatingInput" placeholder="Hops. sin esperanzas"/>
        <label htmlFor="floatingInput">Nombre del hospital</label>
        </div>
        <div className="form-floating mb-3">
        <input type="text" ref={this.cajaDireccion} className="form-control" id="floatingInput" placeholder="Avenida de sin salida"/>
        <label htmlFor="floatingInput">Dirección</label>
        </div>
        <div className="form-floating mb-3">
        <input type="text" ref={this.cajaTel} className="form-control" id="floatingInput" placeholder="999 999 999"/>
        <label htmlFor="floatingInput">Nº de télefono</label>
        </div>
        <div className="form-floating mb-3">
        <input type="text" ref={this.cajaCamas} className="form-control" id="floatingInput" placeholder="666"/>
        <label htmlFor="floatingInput">Nº de camas</label>
        </div>
        <hr/>
        <button className='btn btn-info' onClick={this.enviarDatos}>
            Guardar Hospital
        </button>
        <NavLink to="/hospitales" className='btn btn-danger'>Volver atrás</NavLink>
        </form>
        {
            this.state.statusForm === true &&
            (<h3 style={{color:"green"}}>{this.cajaNombre.current.value} añadido correctamente!</h3>)
        }
      </div>
    )
  }
}
