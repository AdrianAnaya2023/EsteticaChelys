import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPromos, createPromo, updatePromo, deletePromo } from './promosAPI';
import '../EstilosAdmin/ManagePromosPromosAdmin.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const ManagePromosPromosAdmin = () => {
  const [promos, setPromos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPromo, setCurrentPromo] = useState({
    id: '',
    foto: '',
    titulo: '',
    descripcion: '',
    fecha_fin: '',
  });

  useEffect(() => {
    const loadPromos = async () => {
      try {
        const data = await fetchPromos();
        setPromos(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    loadPromos();
  }, []);

  const openModal = (promo = null) => {
    setIsModalOpen(true);
    setIsEditing(!!promo);
    setCurrentPromo(promo || { id: '', foto: '', titulo: '', descripcion: '', fecha_fin: '' });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    try {
      let data;
      if (isEditing) {
        data = await updatePromo(currentPromo.id, currentPromo);
        setPromos(promos.map(promo => promo.id === currentPromo.id ? data : promo));
        toast.success('Promoción actualizada con éxito');
      } else {
        data = await createPromo(currentPromo);
        setPromos([...promos, data]);
        toast.success('Promoción creada con éxito');
      }
      closeModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePromo(id);
      setPromos(promos.filter(promo => promo.id !== id));
      toast.success('Promoción eliminada con éxito');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="manage-promos-container-promosAdmin">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h1>Promociones</h1>
      <Button variant="contained" color="primary" onClick={() => openModal()}>
        Agregar Promoción
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Foto</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha Fin</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promos.map(promo => (
              <TableRow key={promo.id}>
                <TableCell>{promo.id}</TableCell>
                <TableCell><img src={promo.foto} alt={promo.titulo} style={{ width: 100 }} /></TableCell>
                <TableCell>{promo.titulo}</TableCell>
                <TableCell>{promo.descripcion}</TableCell>
                <TableCell>{promo.fecha_fin}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => openModal(promo)}>Editar</Button>
                  <Button color="secondary" onClick={() => handleDelete(promo.id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen && (
        <Dialog open={isModalOpen} onClose={closeModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{isEditing ? 'Editar Promoción' : 'Agregar Promoción'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="foto"
              label="Foto URL"
              type="text"
              fullWidth
              value={currentPromo.foto}
              onChange={(e) => setCurrentPromo({ ...currentPromo, foto: e.target.value })}
            />
            <TextField
              margin="dense"
              id="titulo"
              label="Título"
              type="text"
              fullWidth
              value={currentPromo.titulo}
              onChange={(e) => setCurrentPromo({ ...currentPromo, titulo: e.target.value })}
            />
            <TextField
              margin="dense"
              id="descripcion"
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
              id="fecha_fin"
              label="Fecha de Fin"
              type="date"
              fullWidth
              value={currentPromo.fecha_fin}
              onChange={(e) => setCurrentPromo({ ...currentPromo, fecha_fin: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSave} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ManagePromosPromosAdmin;
