import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CoralLogo from '../../img/CoralLogo.png'; // Asegúrate de que la ruta sea correcta

const ExportFactura = ({ ventaData }) => {
    const [datos] = useState({
        numFactura: ventaData.NoTicket,
        fecha: ventaData.Fecha,
        producto: ventaData.Descripcion,
        total: ventaData.Costo,
    });

    const generarFactura = () => {
        const doc = new jsPDF();
        const imgData = CoralLogo; 
        // Agregar imagen al PDF (x, y, width, height)
        doc.addImage(imgData, 'PNG', -15, 1, 80, 50);

        // Encabezado de la factura
        doc.text(`Número de Venta: ${datos.numFactura}`, 10, 50); // Ajusta el texto debajo de la imagen
        doc.text(`Fecha: ${datos.fecha}`, 10, 60);

        // Tabla factura
        const columns = ['Producto', 'Total'];
        const data = [
            [`${datos.producto}`, `${datos.total}`],
        ];

        doc.autoTable({
            startY: 70,
            head: [columns],
            body: data,
        });

        // Guardar el PDF
        doc.save(`Factura_${datos.numFactura}.pdf`);
    };

    return (
        <div className='custom-button-delete'>
            <button
                type="button"
                className="btn btn-primary btn-3"
                onClick={generarFactura}
            >
                <span><i className="bi bi-download" /></span>
            </button>
        </div>
    );
};

export default ExportFactura;
