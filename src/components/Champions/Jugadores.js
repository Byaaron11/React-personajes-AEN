import axios from "axios";
import React, { Component } from "react";
import Global from "../../Global";
import loading from "../../assets/images/loading.gif";
import { NavLink } from "react-router-dom";

export default class Jugadores extends Component {
  state = {
    jugadores: [],
    statusJugadores: false,
  };

  loadJugadores = () => {
    var id = this.props.id;
    var request = "/api/Jugadores/JugadoresEquipo/" + id;
    var url = Global.urlChampions + request;
    axios.get(url).then((res) => {
      this.setState({
        jugadores: res.data,
        statusJugadores: true,
      });
    });
  };

  componentDidMount = () =>{
    this.loadJugadores();
  }
  render() {
    if (this.state.statusJugadores === true) {
      return (
        <div>
          <h1 className="display-2">Jugadores </h1>
          <NavLink to={"/equipo/" + this.props.id} className='btn btn-success'>Volver</NavLink>
          <table className="table table-success">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Imagen</th>
                <th scope="col">Posición</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.jugadores.map((jug, index) => {
                return (
                  <tr key={jug.idJugador}>
                    <td>{jug.nombre}</td>
                    <td>
                      <figure className="figure">
                        <img
                          src={jug.imagen}
                          width="175"
                          className="figure-img img-fluid rounded"
                          alt="..."
                        />
                      </figure>
                    </td>
                    <td>{jug.posicion}</td>
                    <td>
                      <NavLink
                        to={"/ficha-jugador/" + jug.idJugador}
                        className="btn btn-outline-dark"
                      >
                        Detalles
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <img src={loading} alt="..." width="500" />;
    }
  }
}
