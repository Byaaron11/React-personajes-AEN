import React, { Component } from "react";
import "./../App.css";
//Necesito importar los componentes Global y axios para realizar peticiones
import axios from "axios";
import Global from "./../Global";
import loading from "./../assets/images/loading.gif";

export default class Series extends Component {
  //Primero creo la variable state para mostrar los elementos de la api
  state = {
    serie: {},
    statusSerie: false,
  };

  //Segundo, creo un método que cargue la petición al iniciar la página

  loadSerie = () => {
    var id = this.props.id;
    var request = "/api/Series/" + id;
    var url = Global.urlSeries + request;
    axios.get(url).then((res) => {
      //Al obtener ya los datos, me interesa insertarlos en el state ya que con ello lo muestro en el dibujo del render
      this.setState({
        serie: res.data,
        statusSerie: true,
        //La variable statusSerie mostrara un loading en caso de que la conexion con la api tarde y no piense el usuario que no funciona la app
      });
    });
  };

  //Con este metodo hara que cargue loadSerie al cargar la página
  componentDidMount = () => {
    this.loadSerie();
  };

  //SUPER IMPORTANTE Necesitare un Update para que vaya cambiando si en el menu pincho en otra serie
  componentDidUpdate = (oldParam) =>{
    if(oldParam.id !== this.props.id){
        this.loadSerie();
    }
  }

//Voy a ir al render a dibujar el state, como se trata de 1 solo nodo, NO necesito hacer un map()
  render() {
    if (this.state.statusSerie === true) {
      return (
        <div className="App">
          <div className="row">
            <div className="col"></div>
            <div className="col-2">
              <div className="card mt-5" style={{ width: "18rem" }}>
                <img src={this.state.serie.imagen} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{this.state.serie.nombre}</h5>
                  <p className="card-text">
                    Puntuación: {this.state.serie.puntuacion}
                  </p>
                  <a href={"/personajes/"+this.state.serie.idSerie} className="btn btn-primary">
                    Personajes
                  </a>
                </div>
              </div>
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
