import React, { Component } from "react";
import "./../App.css";
import axios from "axios";
import Global from "./../Global";
import loading from "./../assets/images/loading.gif";
import { NavLink } from "react-router-dom";

export default class Personajes extends Component {
  state = {
    personajes: [], //Me va a devolver mas de un personaje,
    statusPj: false,
  };

  loadPersonajes = () => {
    var id = this.props.id;
    var request = "/api/Series/PersonajesSerie/" + id;
    var url = Global.urlSeries + request;
    axios.get(url).then((res) => {
      this.setState({
        personajes: res.data,
        statusPj: true,
      });
    });
  };
  componentDidMount = () => {
    this.loadPersonajes();
  };

  render() {
    if (this.state.statusPj === true) {
      return (
        <div>
          <div className="row">
            <div className="col"></div>
            <div className="col-5">
            <NavLink to={"/serie/"+this.props.id} className='btn btn-danger'>
                Volver
            </NavLink>
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Imagen</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {/* Aqui si que utilizo un map() ya que muestro MUCHOS personajes */}
                  {
                    this.state.personajes.map((pj, index)=>{
                        return(
                            <tr key={pj.idPersonaje}>
                                <td>{pj.nombre}</td>
                                <td><img src={pj.imagen} width='100' alt="..."/></td>
                            </tr>
                        )
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className="col"></div>
          </div>
        </div>
      );
    } else {
      return <img src={loading} alt="..." />;
    }
  }
}
