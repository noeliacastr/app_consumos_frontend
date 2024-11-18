import React, { useState } from 'react';
import { getVentas } from "../../api/ventas";
import ButtonAppBar from "../layout/Navbar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ExportFactura from './ExportVenta';  // Importa el componente de exportación

const columns = [
    { id: 'NoTicket', label: 'Factura', minWidth: 100 },
    { id: 'Descripcion', label: 'Producto', minWidth: 170 },
    { id: 'Codigo', label: 'Código', minWidth: 90 },
    { id: 'Fecha', label: 'Fecha', minWidth: 100 },
    { id: 'Hora', label: 'Hora', minWidth: 100 },
    { id: 'Costo', label: 'Total', minWidth: 100, align: 'right' },
    { id: 'Planilla', label: 'Planilla', minWidth: 100 },
    { id: 'Exportar', label: 'Exportar', minWidth: 90 }  // Columna para el botón de exportación
];

const VentasComponent = () => {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleFilter = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getVentas(startDate, endDate);
            setVentas(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <ButtonAppBar />
            <div className="container mt-4">
                <h1>Consulta de consumos</h1>
                <div className="row mb-3">
                    <div className="col-md-5">
                        <input 
                            type="date" 
                            className="form-control" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} 
                        />
                    </div>
                    <div className="col-md-5">
                        <input 
                            type="date" 
                            className="form-control" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                        />
                    </div>
                    <div className="col-md-2 custom-button-delete">
                        <button 
                            className="btn btn-primary  btn-3" 
                            onClick={handleFilter}
                        >
                            <span><i className="bi bi-eye"></i></span>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ventas.length > 0 ? (
                                        ventas
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((venta) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={venta.NoTicket}>
                                                    {columns.map((column) => {
                                                        const value = venta[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.id === 'Exportar' ? (
                                                                    <ExportFactura ventaData={venta} />
                                                                ) : (
                                                                    value
                                                                )}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} align="center">
                                                No hay ventas para el rango de fechas seleccionado
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={ventas.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                )}
            </div>
        </>
    );
};

export default VentasComponent;
