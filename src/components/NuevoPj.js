import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Global from "../Global";
import "./../App.css";
import loading from "./../assets/images/loading.gif";

export default class NuevoPj extends Component {
  //para recoger las variables necesito crear referencias
  //Las cuales llamo como atributos en el form del render
  cajaNombre = React.createRef();
  cajaImg = React.createRef();
  cajaSelect = React.createRef();

  //Necesito cargar las series de nuevo pero para incluirlas en el select
  state = {
    series: [],
    statusSeries: false,
    statusPost: false,
  };

  enviarDatos = (e) => {
    e.preventDefault();
    var nombre = this.cajaNombre.current.value;
    var imagen = this.cajaImg.current.value;
    var select = parseInt(this.cajaSelect.current.value);

    //A continuacion necesito crear un objeto
    //En este caso la request que ofrece el servicio requere de un objeto a mandar en el axios

    var personaje = {
      idPersonaje: 0, //Automaticamente al mandarlo el servicio le pone una id
      nombre: nombre,
      imagen: imagen,
      idSerie: select,
    };
    //Aqui no es necesario traducir al json puesto que ya lo acabamos de hacer
    var request = "/api/Personajes";
    var url = Global.urlSeries + request;
    axios.post(url, personaje).then((res) => {
      this.setState({
        statusPost: true,
      });
    });
  };

  loadSelect = () => {
    var request = "/api/Series";
    var url = Global.urlSeries + request;
    axios.get(url).then((res) => {
      this.setState({
        series: res.data,
        statusSeries: true,
      });
    });
  };

  componentDidMount = () => {
    this.loadSelect();
  };

  render() {
    if (this.state.statusSeries === true) {
      return (
        <div className="App">
          <h1 className="display-4" style={{ color: "blue" }}>
            Nuevo Personaje
          </h1>
          <div className="row">
            <div className="col"></div>
            <div className="col-4">
              <form>
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">
                    Nombre
                  </label>
                  <input
                    ref={this.cajaNombre}
                    type="text"
                    className="form-control"
                    id="cajanombre"
                    placeholder="Nuevo nombre"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="formGroupExampleInput2"
                    className="form-label"
                  >
                    Imagen
                  </label>
                  <input
                    ref={this.cajaImg}
                    type="text"
                    className="form-control"
                    id="cajaimagen"
                    placeholder="ej: https://..."
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="formGroupExampleInput2"
                    className="form-label"
                  >
                    Serie:
                  </label>
                  <select
                    ref={this.cajaSelect}
                    className="form-select"
                    id="cajaselect"
                    aria-label="Default select example"
                  >
                    {this.state.series.map((serie, index) => {
                      return (
                        <option key={serie.idSerie} value={serie.idSerie}>
                          {serie.nombre}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    className="btn btn-outline-success mt-4"
                    onClick={this.enviarDatos}
                  >
                    Crear personaje
                  </button>
                </div>
              </form>
            </div>
            <div className="col"></div>
          </div>
          {
            this.state.statusPost === true &&
            (<Navigate to={"/personajes/"+this.cajaSelect.current.value}/>)
          }
        </div>
      );
    } else {
        return(<img src={loading} alt=".."/>)
    }
  }
}
