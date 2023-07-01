import { useState } from 'react';
import { useLocation } from 'wouter';


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useContext } from 'react';
import { GlobalContext } from './ContextApp'

const MySwal = withReactContent(Swal)

export const FormularioCincho = () => {
  const { cinchos, setCinchos } = useContext(GlobalContext);

  const [location, setLocation] = useLocation();
  
  const materialCapa1 = [
    { 'tipo': 'Cuero', 'descripcion': 'Cuero Negro' },
    { 'tipo': 'otro', 'descripcion': 'otro material' }
  ];
  const materialCapa2 = [
    { 'tipo': 'Esponja', 'descripcion': 'esponja 0.5mm' },
    { 'tipo': 'otro material','descripcion': 'esponja 0.8mm'  }
  ];
  const materialCapa3 = [
    { 'tipo': 'Cuero', 'descripcion': 'Cuero Cafe Claro' },
    { 'tipo': 'otro material', 'descripcion': 'otro material' }
  ];

  const [cincho, setCincho] = useState({
    capaInferior: '',
    capaCentro: '',
    capaSuperior: '',
  });

  const handleInputChange = (event) => {
    setCincho({
      ...cincho,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddCincho = (event) => {
    event.preventDefault();
    
    // Validar que se haya seleccionado una opción en cada select
    if (cincho.capaInferior === '' || cincho.capaCentro === '' || cincho.capaSuperior === '') {
      MySwal.fire({
        title: <p>Por favor, seleccione una opción en cada campo.</p>,
        confirmButtonColor : '#157347'
      }).then(() => {
        return
      })

      // alert('Por favor, seleccione una opción en cada campo.');
      // return;
    }
    else {
      // Agregar el nuevo cincho al array de cinchos en lugar de reemplazar el último
      setCinchos([...cinchos, cincho]);
      // Reiniciar los valores del formulario
      setCincho({
        capaInferior: '',
        capaCentro: '',
        capaSuperior: '',
      });
    }
    
    
  };

  const handleRemoveCincho = (index) => {
    const updatedCinchos = [...cinchos];
    updatedCinchos.splice(index, 1);
    setCinchos(updatedCinchos);
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log(cinchos);
    if (cinchos.length == 0) {
      MySwal.fire({
        title: <p>Por favor, seleccione una opción en cada campo.</p>,
        confirmButtonColor : '#157347'
      }).then(() => {
        return
      })
    }
    else{
      MySwal.fire({
        title: <p>Desea Confirmar el Pedido</p>,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Confirmar!'
      }).then((resultado) => {
        if(resultado.isConfirmed){
  
          setCinchos([])  // Aquí vacías el array
  
          setLocation('/cliente');
        }
  
        return; 
      })
    }
  }
  

  return (
    <div className='content'>
      
    <form onSubmit={handleAddCincho} className='form-materiales' >
      <h2>Crear Cincho</h2>
      <div className='form-group'>
          <label>
          Capa Superior:
          </label>
          <select name="capaSuperior" onChange={handleInputChange} value={cincho.capaSuperior}>
            <option value="">Seleccionar...</option>
            {materialCapa1.map((material) => (
              <option key={material.tipo} value={material.descripcion}>{material.descripcion}</option>
            ))}
          </select>
      </div> 
      <div className='form-group'>
        <label>
          Capa Centro:
        </label>
        <select name="capaCentro" onChange={handleInputChange} value={cincho.capaCentro}>
          <option value="">Seleccionar...</option>
          {materialCapa2.map((material) => (
            <option key={material.tipo} value={material.descripcion}>{material.descripcion}</option>
            ))}
            </select>
      </div>
      <div className='form-group'>

      <label>
        Capa Inferior:
      </label>
        <select name="capaInferior" onChange={handleInputChange} value={cincho.capaInferior}>
          <option value="">Seleccionar...</option>
          {materialCapa3.map((material) => (
            <option key={material.tipo} value={material.descripcion}>{material.descripcion}</option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <button type="submit">Crear Cincho</button>
      </div>
    </form>

    <form onSubmit={handleSubmit}>
      <div className='card-tabla'>
      <h2>Lista de Pedido</h2>
        {/* Renderizar los cinchos */}
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Capa Superior</th>
              <th>Capa Centro</th>
              <th>Capa Inferior</th>
              <th>Quitar</th>
            </tr>
          </thead>
          <tbody className='table-body '>
          {cinchos.map((cincho, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{cincho.capaSuperior}</td>
              <td>{cincho.capaCentro}</td>
              <td>{cincho.capaInferior}</td>
              <td>
              <button className='btn-danger' onClick={() => handleRemoveCincho(index)}>
                      Quitar
                    </button>
              </td>
            </tr>
          ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}><strong>Total: {cinchos.length}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className='form-group'>
        <button type='submit'>Confirmar Pedido</button>
      </div>  
    </form>
    </div>
  );
};
