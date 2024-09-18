import React, { useState } from 'react';
import '../EstilosAdmin/ManagePromosPromosAdmin.css';

const ManagePromosPromosAdmin = () => {
  // Estados para manejar las promociones
  const [promos, setPromos] = useState([
    {
      id: 1,
      foto: 'https://via.placeholder.com/100',
      titulo: 'Promo de Verano',
      descripcion: 'Descuento del 20% en todos los productos',
      fecha_fin: '2024-12-31',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPromo, setCurrentPromo] = useState({
    id: '',
    foto: '',
    titulo: '',
    descripcion: '',
    fecha_fin: '',
  });

  // Función para abrir el modal para agregar o editar una promo
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

  // CRUD Funciones
  const handleSave = () => {
    if (isEditing) {
      setPromos(
        promos.map((promo) =>
          promo.id === currentPromo.id ? currentPromo : promo
        )
      );
    } else {
      setPromos([
        ...promos,
        { ...currentPromo, id: promos.length + 1 },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setPromos(promos.filter((promo) => promo.id !== id));
  };

  return (
    <div className="manage-promos-container-promosAdmin">
      <h1 className="title-promosAdmin">Administrar Promociones</h1>

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
                <img
                  src={promo.foto}
                  alt={promo.titulo}
                  className="table-image-promosAdmin"
                />
              </td>
              <td>{promo.titulo}</td>
              <td>{promo.descripcion}</td>
              <td>{promo.fecha_fin}</td>
              <td>
                <button
                  onClick={() => openModal(promo)}
                  className="edit-button-promosAdmin"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(promo.id)}
                  className="delete-button-promosAdmin"
                >
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
                <input
                  type="text"
                  value={currentPromo.id}
                  disabled
                  className="input-promosAdmin"
                />
              </>
            )}

            <label className="modal-label-promosAdmin">Foto (URL)</label>
            <input
              type="text"
              value={currentPromo.foto}
              onChange={(e) =>
                setCurrentPromo({ ...currentPromo, foto: e.target.value })
              }
              className="input-promosAdmin"
            />
            <label className="modal-label-promosAdmin">Título</label>
            <input
              type="text"
              value={currentPromo.titulo}
              onChange={(e) =>
                setCurrentPromo({ ...currentPromo, titulo: e.target.value })
              }
              className="input-promosAdmin"
            />
            <label className="modal-label-promosAdmin">Descripción</label>
            <textarea
              value={currentPromo.descripcion}
              onChange={(e) =>
                setCurrentPromo({ ...currentPromo, descripcion: e.target.value })
              }
              className="input-promosAdmin"
            />
            <label className="modal-label-promosAdmin">Fecha Fin</label>
            <input
              type="date"
              value={currentPromo.fecha_fin}
              onChange={(e) =>
                setCurrentPromo({ ...currentPromo, fecha_fin: e.target.value })
              }
              className="input-promosAdmin"
            />

            <div className="modal-buttons-promosAdmin">
              <button onClick={handleSave} className="save-button-promosAdmin">
                Guardar
              </button>
              <button
                onClick={closeModal}
                className="cancel-button-promosAdmin"
              >
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
