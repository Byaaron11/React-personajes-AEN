import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MenuRutas from './components/MenuRutas';
import NotFound from './components/NotFound';
//A partir de aqui ir importando los componentes
//Componentes de hospitales
import TablaHospitales from './components/CrudHospitales/TablaHospitales';
import CreateHospital from './components/CrudHospitales/CreateHospital';
import DeleteHospital from './components/CrudHospitales/DeleteHospital';
import UpdateHospital from './components/CrudHospitales/UpdateHospital';
//Componentes de departamentos 
import Departamentos from './components/Departamentos Empleados/Departamentos';
import Empleados from './components/Departamentos Empleados/Empleados';
//Componentes de la Champions
import Equipos from './components/Champions/Equipos';
import Jugadores from './components/Champions/Jugadores';
import FichaJugador from './components/Champions/FichaJugadores';
import Apuestas from './components/Champions/Apuestas';
import CreateApuesta from './components/Champions/CreateApuesta';
import DeleteApuesta from './components/Champions/DeleteApuesta';

export default class Router extends Component {
  render() {
    //HOSPITALES
    function DeleteHospitalElement () {
      var {idhospital} = useParams();
      return (<DeleteHospital id={idhospital}/>)
    }
    function ModificarHospitalElement () {
      var {idhospital, nombre, direccion, tel, camas} = useParams();
      return (<UpdateHospital idHosp={idhospital} nombreHosp={nombre} direccionHosp={direccion} telHosp={tel} camas={camas}/>)
    }

    //DEPARTAMENTOS Y EMPLEADOS
    function DepartamentoElement() {
      var {departamento} = useParams();
      return(<Empleados id={departamento}/>)
    }

    //CHAMPIONS
    function EquipoElement() {
      var {idEquipo} = useParams();
      return(<Equipos id={idEquipo}/>)
    }
    function JugadoresElement() {
      var {idEquipo} = useParams();
      return(<Jugadores id={idEquipo}/>)
    }
    function FichaJugadorElement() {
      var {idJugador} = useParams();
      return(<FichaJugador id = {idJugador}/>)
    }
    function DeleteApuestaElement() {
      var {idApuesta} = useParams();
      return(<DeleteApuesta id = {idApuesta}/>)
    }
    return (
      <BrowserRouter>
        <MenuRutas/>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/hospitales' element={<TablaHospitales />}/>
            <Route path='/createhospital' element={<CreateHospital />}/>
            <Route path='/deletehospital/:idhospital' element={<DeleteHospitalElement />}/>
            <Route path='/updatehospital/:idhospital/:nombre/:direccion/:tel/:camas' element={<ModificarHospitalElement />}/>

            <Route path='/departamentos' element={<Departamentos/>}/>
            <Route path='/empleados/:departamento' element={<DepartamentoElement />}/>

            <Route path='/equipo/:idEquipo' element={<EquipoElement />}/>
            <Route path='/jugadores/:idEquipo' element={<JugadoresElement/>}/>
            <Route path='/ficha-jugador/:idJugador' element={<FichaJugadorElement/>}/>
            <Route path='/apuestas' element={<Apuestas/>}/>
            <Route path='/createapuesta' element={<CreateApuesta/>}/>
            <Route path='/deleteapuesta/:idApuesta' element={<DeleteApuestaElement/>}/>

            <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
