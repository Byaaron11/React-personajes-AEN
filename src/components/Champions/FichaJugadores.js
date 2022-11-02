import axios from "axios";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Global from "../../Global";
import loading from "../../assets/images/loading.gif";

export default class FichaJugador extends Component {
  state = {
    jugador: {},
    statusJug: false,
  };
  loadJugador = () => {
    var id = this.props.id;
    var request = "/api/jugadores/" + id;
    var url = Global.urlChampions + request;
    axios.get(url).then((res) => {
      this.setState({
        jugador: res.data,
        statusJug: true,
      });
    });
  };

  componentDidMount = () => {
    this.loadJugador();
  };
  render() {
    if(this.state.statusJug === true){
        return (
        <div>
            <div>
            <div className="card text-center">
                <div className="card-header"><h1 className="display-4">{this.state.jugador.nombre}</h1></div>
                <div className="card-body">
                <figure className="figure">
                    <img
                    src={this.state.jugador.imagen}
                    width="300"
                    className="figure-img img-fluid rounded"
                    alt="..."
                    />
                </figure>
                <h5 className="card-title">
                    Fecha Nacimiento: {this.state.jugador.fechaNacimiento}
                </h5>
                <p className="card-text">País: {this.state.jugador.pais}</p>
                <NavLink
                    to={"/jugadores/" + this.state.jugador.idEquipo}
                    className="btn btn-secondary"
                >
                    Volver
                </NavLink>
                </div>
                <div className="card-footer text-muted">
                Posición: {this.state.jugador.posicion}
                </div>
            </div>
            </div>
        </div>
        );
    }else{
        return(<img src={loading} width="500" alt="..."/>)
    }
  }
}
