import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../../Global';

export default class DeleteApuesta extends Component { 
    state = {
        statusDel: false
    }
    deleteApuesta = () => {
        var id = this.props.id;
        var request = "/api/apuestas/" + id;
        var url = Global.urlChampions + request;
        axios.delete(url).then(res=>{
            this.setState({
                statusDel:true
            });
        });
    }
  render() {
    return (
      <div>
        <h1 className='display-1'>¿Eliminar Apuesta <span style={{color:"red"}}>{this.props.id}</span>?</h1>
        <button className='btn btn-outline-danger' onClick={this.deleteApuesta}>
            Sí
        </button>
        <NavLink className="btn btn-secondary" to="/apuestas">
            Volver
        </NavLink>
        {
            this.state.statusDel === true && 
            (<h2 className='display-4' style={{color:"orange"}}>Eliminado satisfactoriamente</h2>)
        }
      </div>
    )
  }
}
