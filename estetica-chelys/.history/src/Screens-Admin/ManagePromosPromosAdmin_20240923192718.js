import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPromos, createPromo, updatePromo, deletePromo } from './promosAPI';
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
      <h1 className="title-promosAdmin">Promociones</h1>
      <button onClick={() => openModal()} className="add-button-promosAdmin">Agregar Promoción</button>
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
          {promos.map(promo => (
            <tr key={promo.id}>
              <td>{promo.id}</td>
              <td><img src={promo.foto} alt={promo.titulo} className="table-image-promosAdmin" /></td>
              <td>{promo.titulo}</td>
              <td>{promo.descripcion}</td>
              <td>{promo.fecha_fin}</td>
              <td>
                <button onClick={() => openModal(promo)} className="edit-button-promosAdmin">Editar</button>
                <button onClick={() => handleDelete(promo.id)} className="delete-button-promosAdmin">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-promosAdmin">
          <div className="modal-content-promosAdmin">
            <h2>{isEditing ? 'Editar Promoción' : 'Agregar Promoción'}</h2>
            {isEditing && <input type="text" value={currentPromo.id} disabled className="input-promosAdmin" />}
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
              <button onClick={handleSave} className="save-button-promosAdmin">Guardar</button>
              <button onClick={closeModal} className="cancel-button-promosAdmin">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePromosPromosAdmin;