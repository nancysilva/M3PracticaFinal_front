import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const UsuariosTable = ({ usuarios, onEdit, onDelete }) => {
  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{ width: '100%' }} // 👉 hace que el contenedor use  el ancho disponible
    >
      <Table sx={{ width: '100%' }}> {/* 👉 asegura que la tabla también se expanda completamente */}
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1976d2' }}>
            <TableCell align="center" sx={{ color: 'white' }}>Nombre</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>Email</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>Descripción</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>Acciones</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.correo_electronico}</TableCell>
              <TableCell>{usuario.descripcion}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(usuario)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(usuario.id)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsuariosTable;
