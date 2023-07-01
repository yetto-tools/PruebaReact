import { useState, useContext } from 'react';
import { GlobalContext } from './ContextApp';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useLocation } from 'wouter';

const MySwal = withReactContent(Swal);

export const FormularioCliente = () => {
  const { cinchos } = useContext(GlobalContext);
  const [location, setLocation] = useLocation();

  const [cliente, setCliente] = useState({
    nit: '',
    nombre: '',
    direccion: '',
    correo: '',
    telefono: '',
  });

  const handleInputChange = (event) => {
    setCliente({
      ...cliente,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar los campos antes de enviar el formulario
    if (!cliente.nit || !cliente.nombre || !cliente.direccion || !cliente.correo || !cliente.telefono) {
      MySwal.fire({
        title: <p>Por favor, complete todos los campos.</p>,
        confirmButtonColor: '#157347',
      }).then(() => {
        return;
      });
    } else {
      const factura = {
        cliente: cliente,
        detalle: cinchos,
      };

      // Obtener las facturas del local storage
      let facturas = JSON.parse(localStorage.getItem('Facturas')) || [];

      // Agregar la factura actual a las facturas existentes
      facturas.push(factura);

      // Guardar las facturas actualizadas en el local storage
      localStorage.setItem('Facturas', JSON.stringify(facturas));

      // Resetear el estado del formulario después de enviar
      setCliente({
        nit: '',
        nombre: '',
        direccion: '',
        correo: '',
        telefono: '',
      });

      MySwal.fire({
        title: <p>Información Registrada correctamente.</p>,
        confirmButtonColor: '#157347',
      }).then((resultado) => {
        if(resultado.isConfirmed){
          setLocation('/factura');
        }
        return;
      });
    }
  };

  return (
    <div className='content'>
      <form onSubmit={handleSubmit}>
        <div>
          <div className='form-group'>
            <label>NIT:</label>
            <input type='text' name='nit' value={cliente.nit} onChange={handleInputChange} />
          </div>
          <div className='form-group'>
            <label>Nombre:</label>
            <input type='text' name='nombre' value={cliente.nombre} onChange={handleInputChange} />
          </div>
          <div className='form-group'>
            <label>Dirección:</label>
            <input type='text' name='direccion' value={cliente.direccion} onChange={handleInputChange} />
          </div>
          <div className='form-group'>
            <label>Correo electrónico:</label>
            <input type='email' name='correo' value={cliente.correo} onChange={handleInputChange} />
          </div>
          <div className='form-group'>
            <label>Teléfono:</label>
            <input type='tel' name='telefono' value={cliente.telefono} onChange={handleInputChange} />
          </div>
          <div className='form-group'>
            <button type='submit'>Enviar a Producir</button>
          </div>
        </div>
      </form>
    </div>
  );
};
