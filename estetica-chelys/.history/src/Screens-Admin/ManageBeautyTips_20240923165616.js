import React, { useEffect, useState } from 'react';
import useCategoriaConsejos from './useCategoriaConsejos'; // Importa el hook
import '../EstilosAdmin/ManageBeautyTips.css'; // Asegúrate de crear y usar los estilos correctos

const ManageBeautyTips = ({ onClose }) => {
  const {
    getCategorias, createCategoria, updateCategoria, deleteCategoria
  } = useCategoriaConsejos(); // Destructura las funciones necesarias del hook

  const [categories, setCategories] = useState([]);
  const [beautyTips, setBeautyTips] = useState([]);
  const [isBeautyTipsView, setIsBeautyTipsView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({ titulo: '', descripcion: '', imagen: '', categoria_id: null });

  useEffect(() => {
    const fetchCategorias = async () => {
      const result = await getCategorias();
      setCategories(result);
    };
    fetchCategorias();
  }, []);

  const openModal = (item = null, isEditing = false) => {
    setIsModalOpen(true);
    setIsEditing(isEditing);
    setCurrentItem(item);
    setNewItem(item || { titulo: '', descripcion: '', imagen: '', categoria_id: null });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (isEditing) {
      const updatedItem = isBeautyTipsView ? await updateCategoria(currentItem.id, newItem) : await updateCategoria(currentItem.id, newItem);
      if (isBeautyTipsView) {
        setBeautyTips(beautyTips.map(tip => tip.id === currentItem.id ? updatedItem : tip));
      } else {
        setCategories(categories.map(cat => cat.id === currentItem.id ? updatedItem : cat));
      }
    } else {
      const addedItem = isBeautyTipsView ? await createCategoria(newItem) : await createCategoria(newItem);
      if (isBeautyTipsView) {
        setBeautyTips([...beautyTips, addedItem]);
      } else {
        setCategories([...categories, addedItem]);
      }
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    await deleteCategoria(id);
    if (isBeautyTipsView) {
      setBeautyTips(beautyTips.filter(tip => tip.id !== id));
    } else {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="manage-beauty-tips-container-Consejitos">
      <button onClick={onClose} className="close-button-Consejitos">Cerrar</button>
      <h1 className="title-Consejitos">{isBeautyTipsView ? 'Consejos de Belleza' : 'Categorías de Consejos'}</h1>

      <div className="buttons-container-Consejitos">
        <button onClick={() => setIsBeautyTipsView(!isBeautyTipsView)} className="toggle-view-button-Consejitos">
          Ver {isBeautyTipsView ? 'Categorías' : 'Consejos'}
        </button>
        <button onClick={() => openModal(null, false)} className="add-button-Consejitos">
          Agregar {isBeautyTipsView ? 'Consejo' : 'Categoría'}
        </button>
      </div>

      <div className="table-container-Consejitos">
        {isBeautyTipsView ? (
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
                  <td><img src={tip.imagen} alt={tip.titulo} className="table-image-Consejitos" /></td>
                  <td>{categories.find(cat => cat.id === tip.categoria_id)?.nombre || 'Sin categoría'}</td>
                  <td>
                    <button onClick={() => openModal(tip, true)} className="edit-button-Consejitos">Editar</button>
                    <button onClick={() => handleDelete(tip.id)} className="delete-button-Consejitos">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
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
                  <td><img src={category.imagen} alt={category.nombre} className="table-image-Consejitos" /></td>
                  <td>
                    <button onClick={() => openModal(category, true)} className="edit-button-Consejitos">Editar</button>
                    <button onClick={() => handleDelete(category.id)} className="delete-button-Consejitos">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-Consejitos">
          <div className="modal-content-Consejitos">
            <h2>{isEditing ? 'Editar' : 'Agregar'} {isBeautyTipsView ? 'Consejo de Belleza' : 'Categoría de Consejos'}</h2>
            <input
              type="text"
              name={isBeautyTipsView ? 'titulo' : 'nombre'}
              placeholder={isBeautyTipsView ? 'Ej: Hidratación Facial' : 'Ej: Cuidados Faciales'}
              value={isBeautyTipsView ? newItem.titulo : newItem.nombre}
              onChange={handleChange}
              className="input-Consejitos"
            />
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción detallada"
              value={newItem.descripcion}
              onChange={handleChange}
              className="input-Consejitos"
            />
            <input
              type="text"
              name="imagen"
              placeholder="URL de la Imagen"
              value={newItem.imagen}
              onChange={handleChange}
              className="input-Consejitos"
            />
            {isBeautyTipsView && (
              <select
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
