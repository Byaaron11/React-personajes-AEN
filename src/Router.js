import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MenuRutas from './components/MenuRutas';
import NotFound from './components/NotFound';
//A partir de aqui ir importando los componentes
import Series from './components/Series';
import Personajes from './components/Personajes';
import ModificarPj from './components/ModificarPj';
import NuevoPj from './components/NuevoPj';

export default class Router extends Component {
  render() {
    //creo una funcion que me va a permitir recibir la id de la serie como parametro para poder hacer las peticiones desde el hijo
    //es decir desde el componente que devuelve esta funcion
    function SerieElement(){
      var {idSerie} = useParams();
      return(<Series id={idSerie}/>);
    }

    function PersonajesElement(){
      var {idSerie} = useParams();
      return(<Personajes id={idSerie}/>);
    }

    return (
      <BrowserRouter>
        <MenuRutas/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/serie/:idSerie' element={<SerieElement/>}/>
            <Route path='/personajes/:idSerie' element ={<PersonajesElement/>}/>
            <Route path='/modificar' element={<ModificarPj />}/>
            <Route path='/nuevo' element={<NuevoPj />}/>

            <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}

