import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../EstilosAdmin/ManageGallery.css'; // Asegúrate de tener los estilos correctos
import {
  fetchGalerias, 
  createGaleria, 
  updateGaleria, 
  deleteGaleria 
} from './galeriaAPI';  // API para la galería
import {
  fetchCategoriasGaleria
} from './categoriaGaleriaAPI';  // API para las categorías de galería

const ManageGallery = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [isGalleryView, setIsGalleryView] = useState(true); // Alternar entre vista de galería y categorías
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Para distinguir entre agregar y editar
  const [currentItem, setCurrentItem] = useState(null); // El ítem que estamos editando (categoría o galería)
  const [newItem, setNewItem] = useState({ foto_antes: '', foto_despues: '', imagenCategoria: '', categoria_id: null });

  useEffect(() => {
    // Cargar categorías y galería al montar el componente
    const loadData = async () => {
      try {
        const [loadedCategories, loadedGallery] = await Promise.all([
          fetchCategoriasGaleria(),
          fetchGalerias()
        ]);
        setCategories(loadedCategories);
        setGallery(loadedGallery);
      } catch (error) {
        toast.error('Error al cargar datos: ' + error.message);
      }
    };
    loadData();
  }, []);

  // Filtrar galerías por categoría
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
      setNewItem({ foto_antes: '', foto_despues: '', imagenCategoria: '', categoria_id: null });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Manejo de cambios en los inputs del modal
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Agregar o modificar una categoría/galería
  const handleSave = async () => {
    try {
      if (isEditing) {
        if (isGalleryView) {
          const updatedGaleria = await updateGaleria(currentItem.id, newItem);
          setGallery(gallery.map(item => item.id === currentItem.id ? updatedGaleria : item));
          toast.success('Imagen de galería actualizada con éxito');
        } else {
          const updatedCategoria = await updateCategoriaGaleria(currentItem.id, newItem);
          setCategories(categories.map(cat => cat.id === currentItem.id ? updatedCategoria : cat));
          toast.success('Categoría actualizada con éxito');
        }
      } else {
        if (isGalleryView) {
          const createdGaleria = await createGaleria(newItem);
          setGallery([...gallery, createdGaleria]);
          toast.success('Imagen de galería agregada con éxito');
        } else {
          const createdCategoria = await createCategoriaGaleria(newItem);
          setCategories([...categories, createdCategoria]);
          toast.success('Categoría creada con éxito');
        }
      }
      closeModal();
    } catch (error) {
      toast.error('Error al guardar: ' + error.message);
    }
  };

  // Eliminar una categoría o un ítem de la galería
  const handleDelete = async (id) => {
    try {
      if (isGalleryView) {
        await deleteGaleria(id);
        setGallery(gallery.filter(item => item.id !== id));
        toast.success('Imagen de galería eliminada con éxito');
      } else {
        await deleteCategoriaGaleria(id);
        setCategories(categories.filter(cat => cat.id !== id));
        toast.success('Categoría eliminada con éxito');
      }
    } catch (error) {
      toast.error('Error al eliminar: ' + error.message);
    }
  };

  return (
    <div className="manage-gallery-container-GaleriaAdmin">
      <ToastContainer position="top-right" autoClose={5000} />
      <button onClick={onClose} className="close-button-GaleriaAdmin">Cerrar</button>
      <h1 className="title-GaleriaAdmin"> {isGalleryView ? 'Galería' : 'Categorías de Galería'}</h1>

      <div className="buttons-container-GaleriaAdmin">
        <button onClick={() => setIsGalleryView(!isGalleryView)} className="toggle-view-button-GaleriaAdmin">
          Ver {isGalleryView ? 'Categorías' : 'Galería'}
        </button>
        <button onClick={() => openModal(null, false)} className="add-button-GaleriaAdmin">
          Agregar {isGalleryView ? 'Imagen a Galería' : 'Categoría'}
        </button>
      </div>

      <div className="table-container-GaleriaAdmin">
        {isGalleryView ? (
          <>
            <h2 className="subtitle-GaleriaAdmin">Galería</h2>
            <table className="custom-table-GaleriaAdmin">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Foto Antes</th>
                  <th>Foto Después</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {gallery.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><img src={item.foto_antes} alt="Antes" className="table-image-GaleriaAdmin" /></td>
                    <td><img src={item.foto_despues} alt="Después" className="table-image-GaleriaAdmin" /></td>
                    <td>{getCategoryName(item.categoria_id)}</td>
                    <td>
                      <button onClick={() => openModal(item, true)} className="edit-button-GaleriaAdmin">Editar</button>
                      <button onClick={() => handleDelete(item.id)} className="delete-button-GaleriaAdmin">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h2 className="subtitle-GaleriaAdmin">Categorías de Galería</h2>
            <table className="custom-table-GaleriaAdmin">
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
                      <img src={category.imagenCategoria} alt={category.nombre} className="table-image-GaleriaAdmin" />
                    </td>
                    <td>
                      <button onClick={() => openModal(category, true)} className="edit-button-GaleriaAdmin">Editar</button>
                      <button onClick={() => handleDelete(category.id)} className="delete-button-GaleriaAdmin">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-GaleriaAdmin">
          <div className="modal-content-GaleriaAdmin">
            <h2>{isEditing ? 'Editar' : 'Agregar'} {isGalleryView ? 'Imagen a Galería' : 'Categoría de Galería'}</h2>

            {isGalleryView ? (
              <>
                <label className="modal-label-GaleriaAdmin" htmlFor="foto_antes">Foto Antes</label>
                <input
                  type="text"
                  id="foto_antes"
                  name="foto_antes"
                  placeholder="URL de la Foto Antes"
                  value={newItem.foto_antes}
                  onChange={handleChange}
                  className="input-GaleriaAdmin"
                />

                <label className="modal-label-GaleriaAdmin" htmlFor="foto_despues">Foto Después</label>
                <input
                  type="text"
                  id="foto_despues"
                  name="foto_despues"
                  placeholder="URL de la Foto Después"
                  value={newItem.foto_despues}
                  onChange={handleChange}
                  className="input-GaleriaAdmin"
                />
              </>
            ) : (
              <>
                <label className="modal-label-GaleriaAdmin" htmlFor="nombre">Nombre de la Categoría</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre de la Categoría"
                  value={newItem.nombre}
                  onChange={handleChange}
                  className="input-GaleriaAdmin"
                />

                <label className="modal-label-GaleriaAdmin" htmlFor="descripcion">Descripción</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Descripción"
                  value={newItem.descripcion}
                  onChange={handleChange}
                  className="input-GaleriaAdmin"
                />

                <label className="modal-label-GaleriaAdmin" htmlFor="imagenCategoria">Imagen de la Categoría</label>
                <input
                  type="text"
                  id="imagenCategoria"
                  name="imagenCategoria"
                  placeholder="URL de la Imagen"
                  value={newItem.imagenCategoria}
                  onChange={handleChange}
                  className="input-GaleriaAdmin"
                />
              </>
            )}

            {isGalleryView && (
              <label className="modal-label-GaleriaAdmin" htmlFor="categoria_id">Categoría</label>
            )}

            {isGalleryView && (
              <select
                id="categoria_id"
                name="categoria_id"
                value={newItem.categoria_id}
                onChange={handleChange}
                className="input-GaleriaAdmin"
              >
                <option value="">Selecciona una Categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            )}

            <div className="modal-buttons-GaleriaAdmin">
              <button onClick={handleSave} className="save-button-GaleriaAdmin">Guardar</button>
              <button onClick={closeModal} className="cancel-button-GaleriaAdmin">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
