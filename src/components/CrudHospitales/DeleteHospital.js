import axios from 'axios';
import React, { Component } from 'react';
import Global from './../../Global';
import { Navigate } from 'react-router-dom';

export default class DeleteHospital extends Component {
    state = {
        statusDel: false
    }

    deleteHospital = () => {
        var idDelete = this.props.id;
        var request = "/webresources/hospitales/delete/" + idDelete;
        var url = Global.urlHospitales + request;
        axios.delete(url).then(res=>{
            this.setState({
                statusDel: true
            });
        });
    }
  render() {
    return (
      <div>
        <h1>¿Eliminar Hospital nº <span style={{color:"red"}}>{this.props.id}</span>?</h1>
        <button onClick={this.deleteHospital} className='btn btn-outline-danger'>Eliminar</button>
        {
            this.state.statusDel === true &&
            (<Navigate to="/hospitales"/>)
            
        }
      </div>
    )
  }
}
