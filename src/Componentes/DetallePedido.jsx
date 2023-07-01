import { useState } from 'react';
import { Link } from 'wouter';
import * as XLSX from 'xlsx';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export const DetallePedido = () => {
  const facturas = JSON.parse(localStorage.getItem('Facturas')) || [];

  const [expandedFacturaIndex, setExpandedFacturaIndex] = useState(-1);

  const toggleDetalle = (index) => {
    if (expandedFacturaIndex === index) {
      setExpandedFacturaIndex(-1);
    } else {
      setExpandedFacturaIndex(index);
    }
  };



  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    console.log(facturas);
    if(facturas.length == 0  || facturas == undefined){
      MySwal.fire({
        title: 'No hay Información para Exportar',
        confirmButtonColor : '#157347'
      })
      return
    }    
    else {
      facturas.forEach((factura, i) => {
        const facturaWithClientInfo = factura.detalle.map(detalle => ({
          'Nit': factura.cliente.nit,
          'Nombre': factura.cliente.nombre,
          'Direccion': factura.cliente.direccion,
          'Correo': factura.cliente.correo,
          'Telefono': factura.cliente.telefono,
          'Capa Superior': detalle.capaSuperior,
          'Capa Centro': detalle.capaCentro,
          'Capa Inferior': detalle.capaInferior
        }));
        const ws = XLSX.utils.json_to_sheet(facturaWithClientInfo);

        XLSX.utils.book_append_sheet(wb, ws, `${factura.cliente.nombre}`);
        
      });
      let now = new Date();
      XLSX.writeFile(wb, `facturas_${now.toLocaleDateString().replaceAll('/','_')}.xlsx`);
      localStorage.removeItem(`Facturas`);
  
    }
  };
  


  const renderDetalle = (detalle) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Capa Superior</th>
            <th>Capa Centro</th>
            <th>Capa Inferior</th>
          </tr>
        </thead>
        <tbody>
          {detalle.map((detalleItem, detalleIndex) => (
            <tr key={detalleIndex}>
              <td>{detalleItem.capaSuperior}</td>
              <td>{detalleItem.capaCentro}</td>
              <td>{detalleItem.capaInferior}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="detalle-factura">
       <button className='toExcel' onClick={exportToExcel}>Exportar a Excel</button>
      {facturas.map((factura, index) => (
        <div key={index} className={`factura ${index === expandedFacturaIndex ? 'expanded' : ''}`}>
          <div className="cliente-info">
            <h2>Factura #{index + 1}</h2>
            <p>NIT: {factura.cliente.nit}</p>
            <p>Nombre: {factura.cliente.nombre}</p>
            <p>Dirección: {factura.cliente.direccion}</p>
            <p>Correo electrónico: {factura.cliente.correo}</p>
            <p>Teléfono: {factura.cliente.telefono}</p>
          </div>
          <div className="detalle-grid">
            <button onClick={() => toggleDetalle(index)}>
              {index === expandedFacturaIndex ? 'Contraer Detalle' : 'Expandir Detalle'}
            </button>
            {index === expandedFacturaIndex && renderDetalle(factura.detalle)}
          </div>
        </div>
      ))}
    </div>
  );
};
