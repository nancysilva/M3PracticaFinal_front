import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

const UsuarioFormDialog = ({ open, onClose, onSave, usuarioEditando }) => {
  const [usuario, setUsuario] = useState({ nombre: '', correo_electronico: '', contrasena: '', descripcion: '' });

  useEffect(() => {
    if (usuarioEditando) {
      setUsuario({
        id: usuarioEditando.id,
        nombre: usuarioEditando.nombre || '',
        correo_electronico: usuarioEditando.correo_electronico || '',
        descripcion: usuarioEditando.descripcion || '',
        // No ponemos contrasena al editar
      });
    } else {
      setUsuario({ nombre: '', correo_electronico: '', contrasena: '', descripcion: '' });
    }
  }, [usuarioEditando]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Validar que el correo tenga '@'
    if (!usuario.correo_electronico.includes('@')) {
      alert('Por favor ingresa un correo electrónico válido que contenga "@"');
      return; // Detiene el guardado si no es válido
    }

    if (usuarioEditando && usuario.contrasena === '') {
      const { contrasena, ...usuarioSinContrasena } = usuario;
      onSave(usuarioSinContrasena);
    } else {
      onSave(usuario);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{usuarioEditando ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          name="nombre"
          fullWidth
          margin="normal"
          value={usuario.nombre}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="correo_electronico"
          fullWidth
          margin="normal"
          value={usuario.correo_electronico}
          onChange={handleChange}
        />
        
        {/* Solo mostrar contraseña al crear */}
        {!usuarioEditando && (
          <TextField
            label="Contraseña"
            name="contrasena"
            type="text" // visible texto para crear
            fullWidth
            margin="normal"
            value={usuario.contrasena}
            onChange={handleChange}
            required
          />
        )}

        {/* Puedes mostrar descripción */}
        <TextField
          label="Descripción"
          name="descripcion"
          fullWidth
          margin="normal"
          value={usuario.descripcion}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsuarioFormDialog;
