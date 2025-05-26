import React, { useEffect, useState } from 'react';
import { Fab, Container, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UsuariosTable from '../componentes/UsuariosTable';
import UsuarioFormDialog from '../componentes/UsuarioFormDialog';
import { Navbar } from "../componentes/Navbar";
import axios from 'axios';

const Home = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  // Obtener token del localStorage
  const token = localStorage.getItem('token');

  // Configuración headers con token para axios
  const axiosConfig = {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    }
  };

  // Cargar usuarios desde backend
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/usuarios', axiosConfig);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      alert('Error al obtener usuarios, verifica tu sesión.');
    }
  };

  useEffect(() => {
    if (!token) {
      alert('No autenticado. Por favor inicia sesión.');
      return;
    }
    fetchUsuarios();
  }, [token]);

  // Abrir dialog para agregar usuario
  const handleAdd = () => {
    setUsuarioEditando(null);
    setDialogOpen(true);
  };

  // Abrir dialog para editar usuario
  const handleEdit = (usuario) => {
    setUsuarioEditando(usuario);
    setDialogOpen(true);
  };

  // Eliminar usuario desde backend y actualizar estado
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/usuarios/${id}`, axiosConfig);
      setUsuarios(usuarios.filter(u => u.id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar usuario');
    }
  };

  const handleSave = async (usuario) => {
  try {
    console.log('Token que se enviará:', token);
    console.log('Datos enviados para update:', usuario);

    if (usuario.id) {
      // Actualizar usuario existente
      await axios.put(`http://localhost:3000/api/usuarios/${usuario.id}`, usuario, axiosConfig);
      // Actualiza el usuario en el estado local
      setUsuarios(usuarios.map(u => (u.id === usuario.id ? usuario : u)));
    } else {
      // Crear nuevo usuario, sin enviar id
      const { id: _, ...usuarioSinId } = usuario;
      const response = await axios.post('http://localhost:3000/api/usuarios/registro', usuarioSinId, axiosConfig);

      // response.data debería incluir el id nuevo, si configuras así el backend
      const nuevoId = response.data.id;

      // Opcional: actualizar el estado local añadiendo el usuario con el nuevo id
      const usuarioConId = { ...usuarioSinId, id: nuevoId };
      setUsuarios([...usuarios, usuarioConId]);
    }

    setDialogOpen(false);
  } catch (error) {
    console.error('Error al guardar usuario:', error.response || error.message || error);
    alert('Error al guardar usuario');
  }
};


  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Container 
        maxWidth={false} 
        disableGutters 
        sx={{ 
          py: 2, 
          px: 2, 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Gestión de Usuarios
        </Typography>
      </Container>

      <Box sx={{ flexGrow: 1, overflow: 'auto', px: 2, pb: 10 }}>
        <UsuariosTable usuarios={usuarios} onEdit={handleEdit} onDelete={handleDelete} />
      </Box>

      <UsuarioFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        usuarioEditando={usuarioEditando}
      />

      <Fab
        color="primary"
        onClick={handleAdd}
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Home;
