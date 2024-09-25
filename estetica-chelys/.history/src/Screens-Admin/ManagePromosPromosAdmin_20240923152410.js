import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';  // Importa toastify para notificaciones
import '../EstilosAdmin/ManagePromosPromosAdmin.css';

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
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/promos`);
      setPromos(response.data);
    } catch (error) {
      console.error('Error al obtener las promos:', error);
      toast.error('Error al cargar promociones');
    }
  };

  const openModal = (promo = null) => {
    setIsModalOpen(true);
    if (promo) {
      setCurrentPromo(promo);
      setIsEditing(true);
    } else {
      setCurrentPromo({ id: '', foto: '', titulo: '', descripcion: '', fecha_fin: '' });
      setIsEditing(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    if (!currentPromo.titulo || !currentPromo.descripcion) {
      toast.error('Título y descripción son requeridos');
      return;
    }
    try {
      if (isEditing) {
        await axios.put(`${process.env.REACT_APP_API_URL}/promos/${currentPromo.id}`, currentPromo);
        setPromos(promos.map((promo) => (promo.id === currentPromo.id ? currentPromo : promo)));
        toast.success('Promoción actualizada correctamente');
      } else {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/promos`, currentPromo);
        setPromos([...promos, response.data]);
        toast.success('Promoción creada correctamente');
      }
      closeModal();
    } catch (error) {
      console.error('Error al guardar la promo:', error);
      toast.error('Error al guardar la promoción');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/promos/${id}`);
      setPromos(promos.filter((promo) => promo.id !== id));
      toast.success('Promoción eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la promo:', error);
      toast.error('Error al eliminar la promoción');
    }
  };

  return (
    <div className="manage-promos-container-promosAdmin">
      <h1 className="title-promosAdmin">Promociones</h1>

      <button onClick={() => openModal()} className="add-button-promosAdmin">
        Agregar Promoción
      </button>

      <table className="custom-table-promosAdmin">
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Fecha Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {promos.map((promo) => (
            <tr key={promo.id}>
              <td>{promo.id}</td>
              <td>
                <img src={promo.foto} alt={promo.titulo} className="table-image-promosAdmin" />
              </td>
              <td>{promo.titulo}</td>
              <td>{promo.descripcion}</td>
              <td>{promo.fecha_fin}</td>
              <td>
                <button onClick={() => openModal(promo)} className="edit-button-promosAdmin">
                  Editar
                </button>
                <button onClick={() => handleDelete(promo.id)} className="delete-button-promosAdmin">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-promosAdmin">
          <div className="modal-content-promosAdmin">
            <h2>{isEditing ? 'Editar Promoción' : 'Agregar Promoción'}</h2>

            {isEditing && (
              <>
                <label className="modal-label-promosAdmin">ID</label>
                <input type="text" value={currentPromo.id} disabled className="input-promosAdmin" />
              </>
            )}

            <label className="modal-label-promosAdmin">Foto (URL)</label>
            <input
              type="text"
              value={currentPromo.foto}
              onChange={(e) => setCurrentPromo({ ...currentPromo, foto: e.target.value })}
              className="input-promosAdmin"
            />
            <label className="modal-label-promosAdmin">Título</label>
            <input
              type="text"
              value={currentPromo.titulo}
              onChange={(e) => setCurrentPromo({ ...currentPromo, titulo: e.target.value })}
              className="input-promosAdmin"
            />
            <label className="modal-label-promosAdmin">Descripción</label>
            <textarea
              value={currentPromo.descripcion}
              onChange={(e) => setCurrentPromo({ ...currentPromo, descripcion: e.target.value })}
              className="input-promosAdmin"
            />
            <label className="modal-label-promosAdmin">Fecha Fin</label>
            <input
              type="date"
              value={currentPromo.fecha_fin}
              onChange={(e) => setCurrentPromo({ ...currentPromo, fecha_fin: e.target.value })}
              className="input-promosAdmin"
            />

            <div className="modal-buttons-promosAdmin">
              <button onClick={handleSave} className="save-button-promosAdmin">
                Guardar
              </button>
              <button onClick={closeModal} className="cancel-button-promosAdmin">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePromosPromosAdmin;
