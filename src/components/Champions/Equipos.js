import axios from 'axios';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../../Global';
import loading from '../../assets/images/loading.gif';

export default class Equipos extends Component {
    state = {
        equipo: [],
        statusEquipo: false
    }

    loadEquipo = () => {
        var id = this.props.id;
        var request = "/api/Equipos/"+id;
        var url = Global.urlChampions + request;
        axios.get(url).then(res=>{
            this.setState({
                equipo: res.data,
                statusEquipo: true
            });
        });
    }

    componentDidMount = () => {
        this.loadEquipo();
    }

    componentDidUpdate = (oldParam) => {
        if(oldParam.id !== this.props.id){
            this.loadEquipo();
        }
    }
  render() {
    if (this.state.statusEquipo === true){
        return (
        <div>
            <div className="card text-center">
            <div className="card-header">
                {this.state.equipo.nombre}
            </div>
            <div className="card-body">
            <figure className="figure">
            <img src={this.state.equipo.imagen} width="300" className="figure-img img-fluid rounded" alt="..." />
            </figure>
                <h5 className="card-title">Champions: {this.state.equipo.champions}</h5>
                <p className="card-text">{this.state.equipo.descripcion}</p>
                <NavLink to={"/jugadores/"+this.state.equipo.idEquipo} className="btn btn-primary">Jugadores</NavLink> 
                <NavLink to="/" className="btn btn-secondary">Volver</NavLink>
            </div>
            <div className="card-footer text-muted">
                <a href={this.state.equipo.paginaWeb} target="BLANK" className="btn btn-outline-dark">Página Web</a>
            </div>
            </div>
        </div>
        )
    }else{
        return(<img src={loading} width="500" alt='...'/>)
    }
  }
}
