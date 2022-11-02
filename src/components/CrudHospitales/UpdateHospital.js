import axios from 'axios';
import React, { Component } from 'react';
import Global from './../../Global';
import { NavLink } from 'react-router-dom';

export default class UpdateHospital extends Component {
    cajaId = React.createRef();
    cajaNombre = React.createRef();
    cajaDireccion = React.createRef();
    cajaTel = React.createRef();
    cajaCamas = React.createRef();

    state = {
        statusUp: false
    }

    enviarDatos = (e) => {
        e.preventDefault();
        var request = "/webresources/hospitales/put";
        var url = Global.urlHospitales + request;
        var hospital = {
            idhospital: parseInt(this.props.idHosp),
            nombre: this.cajaNombre.current.value,
            direccion: this.cajaDireccion.current.value,
            telefono: this.cajaTel.current.value,
            camas: parseInt(this.cajaCamas.current.value)
        }
        axios.put(url, hospital).then(res=>{
            this.setState({
                statusUp: true
            });
        });
    }
  render() {
    return (
      <div>
        <h1>Modificacion de <span style={{color:"orange"}}>{this.props.nombreHosp}</span></h1>
        <form>
        <div className="form-floating mb-3">
        <input type="hidden" defaultValue={this.props.idHosp} ref={this.cajaId} className="form-control" id="floatingInput" placeholder="ej: 10"/>
        <label htmlFor="floatingInput">Introduzca nuevo id:</label>
        </div>
        <div className="form-floating mb-3">
        <input type="text" defaultValue={this.props.nombreHosp} ref={this.cajaNombre} className="form-control" id="floatingInput" placeholder="Hops. sin esperanzas"/>
        <label htmlFor="floatingInput">Nombre del hospital</label>
        </div>
        <div className="form-floating mb-3">
        <input type="text" defaultValue={this.props.direccionHosp} ref={this.cajaDireccion} className="form-control" id="floatingInput" placeholder="Avenida de sin salida"/>
        <label htmlFor="floatingInput">Dirección</label>
        </div>
        <div className="form-floating mb-3">
        <input type="text" defaultValue={this.props.telHosp} ref={this.cajaTel} className="form-control" id="floatingInput" placeholder="999 999 999"/>
        <label htmlFor="floatingInput">Nº de télefono</label>
        </div>
        <div className="form-floating mb-3">
        <input type="text" defaultValue={this.props.camas} ref={this.cajaCamas} className="form-control" id="floatingInput" placeholder="666"/>
        <label htmlFor="floatingInput">Nº de camas</label>
        </div>
        <hr/>
        <button className='btn btn-warning' onClick={this.enviarDatos}>
            Confirmar cambios
        </button>
        <NavLink to="/hospitales" className='btn btn-danger'>Volver atrás</NavLink>
        </form>
        {
            this.state.statusUp === true &&
            (<h2 style={{color:"green"}}>Modificado correctamente!</h2>)
        }
      </div>
    )
  }
}
