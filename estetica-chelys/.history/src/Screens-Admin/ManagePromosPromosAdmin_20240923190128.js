import React, { useState, useEffect } from 'react';
import { fetchPromos, createPromo, updatePromo, deletePromo } from './promosAPI'; // Asegúrate de importar el API correctamente
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManagePromosPromosAdmin = () => {
  const [promos, setPromos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPromo, setCurrentPromo] = useState({
    id: '',
    foto: '',
    titulo: '',
    descripcion: '',
    fecha_fin: ''
  });

  // Cargar las promociones cuando el componente se monta
  useEffect(() => {
    const loadPromos = async () => {
      try {
        const data = await fetchPromos();
        setPromos(data);
      } catch (error) {
        toast.error('Error al cargar promociones: ' + error.message);
      }
    };
    loadPromos();
  }, []);

  // Abrir modal para agregar o editar una promoción
  const openModal = (promo = null) => {
    setIsModalOpen(true);
    setIsEditing(!!promo); // Si promo es nulo, es un nuevo registro
    setCurrentPromo(promo || { id: '', foto: '', titulo: '', descripcion: '', fecha_fin: '' });
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Guardar la promoción (crear o actualizar)
  const handleSave = async () => {
    try {
      let data;
      if (isEditing) {
        data = await updatePromo(currentPromo.id, currentPromo);
        setPromos(promos.map((promo) => (promo.id === currentPromo.id ? data : promo)));
        toast.success('Promoción actualizada con éxito');
      } else {
        data = await createPromo(currentPromo);
        setPromos([...promos, data]);
        toast.success('Promoción creada con éxito');
      }
      closeModal();
    } catch (error) {
      toast.error('Error al guardar la promoción: ' + error.message);
    }
  };

  // Eliminar una promoción
  const handleDelete = async (id) => {
    try {
      await deletePromo(id);
      setPromos(promos.filter((promo) => promo.id !== id));
      toast.success('Promoción eliminada con éxito');
    } catch (error) {
      toast.error('Error al eliminar la promoción: ' + error.message);
    }
  };

  return (
    <div className="manage-promos-container">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <h1>Gestión de Promociones</h1>

      <Button variant="contained" color="primary" onClick={() => openModal()}>
        Agregar Promoción
      </Button>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Foto</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha de Fin</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promos.map((promo) => (
              <TableRow key={promo.id}>
                <TableCell>{promo.id}</TableCell>
                <TableCell><img src={promo.foto} alt={promo.titulo} style={{ width: 100 }} /></TableCell>
                <TableCell>{promo.titulo}</TableCell>
                <TableCell>{promo.descripcion}</TableCell>
                <TableCell>{new Date(promo.fecha_fin).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => openModal(promo)}>Editar</Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(promo.id)} style={{ marginLeft: '10px' }}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para agregar/editar promociones */}
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>{isEditing ? 'Editar Promoción' : 'Agregar Promoción'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Foto (URL)"
            type="text"
            fullWidth
            value={currentPromo.foto}
            onChange={(e) => setCurrentPromo({ ...currentPromo, foto: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Título"
            type="text"
            fullWidth
            value={currentPromo.titulo}
            onChange={(e) => setCurrentPromo({ ...currentPromo, titulo: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Descripción"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={currentPromo.descripcion}
            onChange={(e) => setCurrentPromo({ ...currentPromo, descripcion: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Fecha Fin"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={currentPromo.fecha_fin}
            onChange={(e) => setCurrentPromo({ ...currentPromo, fecha_fin: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">Cancelar</Button>
          <Button onClick={handleSave} color="primary">{isEditing ? 'Actualizar' : 'Guardar'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManagePromosPromosAdmin;
