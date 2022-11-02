import React, { Component } from "react";
import "./../App.css";
import axios from "axios";
import Global from "./../Global";
import loading from "./../assets/images/loading.gif";


export default class ModificarPj extends Component {

    cajaSerie = React.createRef();
    cajaPj = React.createRef();

  state = {
    series: [],
    personajes: [],
    statusPj: false,
    statusSerie: false,
    statusPut: false
  };

  modificarDatos = (e) => {
    e.preventDefault();
    var selectPj = parseInt(this.cajaPj.current.value);
    var selectSer = parseInt(this.cajaSerie.current.value);
    //Aqui no hace falta objeto puesto que el cambio se hace en la url
    var request = "/api/Personajes/"+selectPj+"/"+selectSer;
    var url = Global.urlSeries + request;
    axios.put(url).then(res=>{
        this.setState({
            statusPut: true
        })
    })
  }

  loadPersonajesAndSeries = () => {
    var requestPj = "/api/personajes";
    var requestS = "/api/series";
    var url = Global.urlSeries;
    axios.get(url + requestPj).then((res) => {
      this.setState({
        personajes: res.data,
        statusPj: true,
      });
    });
    axios.get(url + requestS).then((res) => {
      this.setState({
        series: res.data,
        statusSerie: true,
      });
    });
  };

  componentDidMount = () => {
    this.loadPersonajesAndSeries();
  };
  render() {
    if(this.state.statusPj && this.state.statusSerie === true){
        return (
            <div className="App">
              <h1>Personajes y Series</h1>
              <div className="row">
                <div className="col"></div>
                <div className="col-3">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="formGroupExampleInput2" className="form-label">
                        Seleccione una serie:
                      </label>
                      <select
                      ref={this.cajaSerie}
                        className="form-select"
                        id="selectserie"
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
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formGroupExampleInput2" className="form-label">
                        Seleccione un personaje:
                      </label>
                      <select
                      ref={this.cajaPj}
                        className="form-select"
                        id="selectpersonaje"
                        aria-label="Default select example"
                      >
                        {this.state.personajes.map((pj, index) => {
                          return (
                            <option key={pj.idPersonaje} value={pj.idPersonaje}>
                              {pj.nombre}
                            </option>
                          );
                        })}
                      </select>
                      <button type="button" className="btn btn-info mt-4" onClick={this.modificarDatos}>
                        Guardar cambios
                      </button>
                    </div>
                  </form>
                  {
                    this.state.statusPut === true &&
                    (<h3 style={{color:"red"}}>{this.cajaSerie.current.value}</h3>)
                  }
                </div>
                <div className="col"></div>
              </div>
            </div>
          );
    }else{
        return(<img src={loading} alt="..."/>)
    }
  }
}
