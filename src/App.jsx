
import './App.css'
import { useState } from 'react';
import { Route, Router, Redirect } from 'wouter';

import {FormularioCliente} from './Componentes/FormularioCliente'
import {FormularioCincho} from './Componentes/FormularioCincho'

import { GlobalProvider } from './Componentes/ContextApp';
import { DetallePedido } from './Componentes/DetallePedido';
import Sidebar from './Componentes/Sidebar';


function App() {
  const [cinchos, setCinchos] = useState([]); 
  return (
    <>
      <GlobalProvider  value={{cinchos, setCinchos}} >
      <div>
        <Sidebar></Sidebar>
      </div>  
      <div className='container'>
        <Router>
          <Route path="/" component={FormularioCincho} />
          <Route path="/cliente" component={FormularioCliente} />
          <Route path="/factura" component={DetallePedido} />
          <Redirect to="/" />
        </Router>
      </div>
      </GlobalProvider>
    </>
  )
}

export default App
