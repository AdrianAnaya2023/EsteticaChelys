import React, { useState } from 'react';
import '../EstilosAdmin/ManageBeautyTips.css'; // Asegúrate de crear y usar los estilos correctos

const ManageBeautyTips = ({ onClose }) => {
  // Simulación de datos de categorías de consejos y consejos
  const [categories, setCategories] = useState([
    { id: 1, nombre: 'Cuidados Faciales', descripcion: 'Consejos para mantener una piel saludable', imagen: 'https://via.placeholder.com/100' },
    { id: 2, nombre: 'Maquillaje', descripcion: 'Consejos para aplicar maquillaje', imagen: 'https://via.placeholder.com/100' },
  ]);

  const [beautyTips, setBeautyTips] = useState([
    { id: 1, titulo: 'Hidratación Facial', imagen: 'https://via.placeholder.com/100', categoria_id: 1, descripcion: 'Hidratar la piel diariamente con una crema adecuada.' },
    { id: 2, titulo: 'Maquillaje Natural', imagen: 'https://via.placeholder.com/100', categoria_id: 2, descripcion: 'Consejos para un maquillaje ligero y natural.' },
  ]);

  const [isBeautyTipsView, setIsBeautyTipsView] = useState(true); // Alternar entre vista de consejos y categorías
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Para distinguir entre agregar y editar
  const [currentItem, setCurrentItem] = useState(null); // El item que estamos editando (consejo o categoría)
  const [newItem, setNewItem] = useState({ titulo: '', descripcion: '', imagen: '', categoria_id: null }); // Para agregar nuevo

  // Filtra consejos por categoría
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.nombre : 'Sin categoría';
  };

  // Manejo de modales
  const openModal = (item = null, isEditing = false) => {
    setIsModalOpen(true);
    setIsEditing(isEditing);
    setCurrentItem(item);
    if (item) {
      setNewItem(item); // Cargar los datos actuales si se está editando
    } else {
      setNewItem({ titulo: '', descripcion: '', imagen: '', categoria_id: null });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Manejo de cambios en los inputs del modal
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Agregar o modificar un consejo/categoría
  const handleSave = () => {
    if (isEditing) {
      // Editar consejo o categoría
      if (isBeautyTipsView) {
        setBeautyTips(beautyTips.map(tip => tip.id === currentItem.id ? newItem : tip));
      } else {
        setCategories(categories.map(cat => cat.id === currentItem.id ? newItem : cat));
      }
    } else {
      // Agregar consejo o categoría
      if (isBeautyTipsView) {
        setBeautyTips([...beautyTips, { ...newItem, id: beautyTips.length + 1 }]);
      } else {
        setCategories([...categories, { ...newItem, id: categories.length + 1 }]);
      }
    }
    closeModal();
  };

  // Eliminar consejo o categoría
  const handleDelete = (id) => {
    if (isBeautyTipsView) {
      setBeautyTips(beautyTips.filter(tip => tip.id !== id));
    } else {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="manage-beauty-tips-container-Consejitos">
      <button onClick={onClose} className="close-button-Consejitos">Cerrar</button>
      <h1 className="title-Consejitos"> {isBeautyTipsView ? 'Consejos de Belleza' : 'Categorías de Consejos'}</h1>

      <div className="buttons-container-Consejitos">
        <button onClick={() => setIsBeautyTipsView(!isBeautyTipsView)} className="toggle-view-button-Consejitos">
          Ver {isBeautyTipsView ? 'Categorías' : 'Consejos'}
        </button>
        <button onClick={() => openModal(null, false)} className="add-button-Consejitos">
          Agregar {isBeautyTipsView ? 'Consejo' : 'Categoría'}
        </button>
      </div>

      {/* Tabla de categorías o consejos */}
      <div className="table-container-Consejitos">
        {isBeautyTipsView ? (
          <>
            <h2 className="subtitle-Consejitos">Consejos de Belleza</h2>
            <table className="custom-table-Consejitos">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {beautyTips.map((tip) => (
                  <tr key={tip.id}>
                    <td>{tip.id}</td>
                    <td>{tip.titulo}</td>
                    <td>{tip.descripcion}</td>
                    <td>
                      <img src={tip.imagen} alt={tip.titulo} className="table-image-Consejitos" />
                    </td>
                    <td>{getCategoryName(tip.categoria_id)}</td>
                    <td>
                      <button onClick={() => openModal(tip, true)} className="edit-button-Consejitos">Editar</button>
                      <button onClick={() => handleDelete(tip.id)} className="delete-button-Consejitos">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h2 className="subtitle-Consejitos">Categorías de Consejos</h2>
            <table className="custom-table-Consejitos">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.nombre}</td>
                    <td>{category.descripcion}</td>
                    <td>
                      <img src={category.imagen} alt={category.nombre} className="table-image-Consejitos" />
                    </td>
                    <td>
                      <button onClick={() => openModal(category, true)} className="edit-button-Consejitos">Editar</button>
                      <button onClick={() => handleDelete(category.id)} className="delete-button-Consejitos">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Modal para agregar/editar consejos/categorías */}
      {isModalOpen && (
        <div className="modal-Consejitos">
          <div className="modal-content-Consejitos">
            <h2>{isEditing ? 'Editar' : 'Agregar'} {isBeautyTipsView ? 'Consejo de Belleza' : 'Categoría de Consejos'}</h2>
            
            <label className="modal-label-Consejitos" htmlFor={isBeautyTipsView ? 'titulo' : 'nombre'}>
              {isBeautyTipsView ? 'Título del Consejo' : 'Nombre de la Categoría'}
            </label>
            <input
              type="text"
              id={isBeautyTipsView ? 'titulo' : 'nombre'}
              name={isBeautyTipsView ? 'titulo' : 'nombre'}
              placeholder={isBeautyTipsView ? 'Ej: Hidratación Facial' : 'Ej: Cuidados Faciales'}
              value={isBeautyTipsView ? newItem.titulo : newItem.nombre}
              onChange={handleChange}
              className="input-Consejitos"
            />
            
            <label className="modal-label-Consejitos" htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              placeholder="Descripción detallada"
              value={newItem.descripcion}
              onChange={handleChange}
              className="input-Consejitos"
            />
            
            <label className="modal-label-Consejitos" htmlFor="imagen">Imagen (URL)</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              placeholder="URL de la Imagen"
              value={newItem.imagen}
              onChange={handleChange}
              className="input-Consejitos"
            />

            {isBeautyTipsView && (
              <>
                <label className="modal-label-Consejitos" htmlFor="categoria_id">Categoría</label>
                <select
                  id="categoria_id"
                  name="categoria_id"
                  value={newItem.categoria_id}
                  onChange={handleChange}
                  className="input-Consejitos"
                >
                  <option value="">Selecciona una Categoría</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
              </>
            )}

            <div className="modal-buttons-Consejitos">
              <button onClick={handleSave} className="save-button-Consejitos">Guardar</button>
              <button onClick={closeModal} className="cancel-button-Consejitos">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBeautyTips;
