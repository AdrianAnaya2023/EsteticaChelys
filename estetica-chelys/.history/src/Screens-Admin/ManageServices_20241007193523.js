import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../EstilosAdmin/ManageServices.css';
import {
  fetchServicios,
  createServicio,
  updateServicio,
  deleteServicio,
} from './serviciosAPI';
import {
  fetchCategoriasServicios,
  createCategoriaServicio,
  updateCategoriaServicio,
  deleteCategoriaServicio,
} from './categoriaServiciosAPI';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig.js';

const ManageServices = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [isServicesView, setIsServicesView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    categoria_id: '',
    nombre: '',
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedServices, loadedCategories] = await Promise.all([
          fetchServicios(),
          fetchCategoriasServicios(),
        ]);
        setServices(loadedServices);
        setCategories(loadedCategories);
      } catch (error) {
        toast.error('Error al cargar datos: ' + error.message);
      }
    };
    loadData();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.nombre : 'Sin categoría';
  };

  const openModal = (item = null, isEditing = false) => {
    setIsModalOpen(true);
    setIsEditing(isEditing);
    setCurrentItem(item);
    setNewItem(
      item || { titulo: '', descripcion: '', imagen: '', categoria_id: '', nombre: '' }
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUploadProgress(0);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileRef = ref(storage, `${isServicesView ? 'servicios' : 'categorias'}/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error('Error al subir la imagen: ' + error.message);
        setUploadProgress(0);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setNewItem(prev => ({ ...prev, imagen: downloadURL }));
          toast.success('Imagen cargada con éxito!');
          setUploadProgress(0);
        });
      }
    );
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        if (isServicesView) {
          const updatedService = await updateServicio(currentItem.id, newItem);
          setServices(services.map(serv => serv.id === currentItem.id ? updatedService : serv));
          toast.success('Servicio actualizado con éxito');
        } else {
          const updatedCategoria = await updateCategoriaServicio(currentItem.id, newItem);
          setCategories(categories.map(cat => cat.id === currentItem.id ? updatedCategoria : cat));
          toast.success('Categoría actualizada con éxito');
        }
      } else {
        if (isServicesView) {
          const createdService = await createServicio(newItem);
          setServices([...services, createdService]);
          toast.success('Servicio creado con éxito');
        } else {
          const createdCategoria = await createCategoriaServicio(newItem);
          setCategories([...categories, createdCategoria]);
          toast.success('Categoría creada con éxito');
        }
      }
      closeModal();
    } catch (error) {
      toast.error('Error al guardar: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (isServicesView) {
        await deleteServicio(id);
        setServices(services.filter(serv => serv.id !== id));
        toast.success('Servicio eliminado con éxito');
      } else {
        await deleteCategoriaServicio(id);
        setCategories(categories.filter(cat => cat.id !== id));
        toast.success('Categoría eliminada con éxito');
      }
    } catch (error) {
      toast.error('Error al eliminar: ' + error.message);
    }
  };

  return (
    <div className="admin-manage-services-container">
      <ToastContainer position="top-right" autoClose={5000} />
      <button onClick={onClose} className="admin-manage-services-close-button">
        Cerrar
      </button>
      <h1 className="admin-manage-services-title">
        {isServicesView ? 'Servicios' : 'Categorías de Servicios'}
      </h1>
  
      <div className="admin-manage-services-buttons-container">
        <button
          onClick={() => setIsServicesView(!isServicesView)}
          className="admin-manage-services-toggle-view-button"
        >
          Ver {isServicesView ? 'Categorías' : 'Servicios'}
        </button>
        <button
          onClick={() => openModal(null, false)}
          className="admin-manage-services-add-button"
        >
          Agregar {isServicesView ? 'Servicio' : 'Categoría'}
        </button>
      </div>
  
      <div className="admin-manage-services-table-container">
        {isServicesView ? (
          <>
            <h2 className="admin-manage-services-subtitle">Servicios</h2>
            <table className="admin-manage-services-table">
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
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>{service.id}</td>
                    <td>{service.titulo}</td>
                    <td>{service.descripcion}</td>
                    <td>
                      <img
                        src={service.imagen}
                        alt={service.titulo}
                        className="admin-manage-services-table-image"
                      />
                    </td>
                    <td>{getCategoryName(service.categoria_id)}</td>
                    <td>
                      <button
                        onClick={() => openModal(service, true)}
                        className="admin-manage-services-edit-button"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="admin-manage-services-delete-button"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h2 className="admin-manage-services-subtitle">Categorías de Servicios</h2>
            <table className="admin-manage-services-table">
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
                      <img
                        src={category.imagen}
                        alt={category.nombre}
                        className="admin-manage-services-table-image"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => openModal(category, true)}
                        className="admin-manage-services-edit-button"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="admin-manage-services-delete-button"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
  
      {isModalOpen && (
        <div className="admin-manage-services-modal">
          <div className="admin-manage-services-modal-content">
            <h2>
              {isEditing ? 'Editar' : 'Agregar'}{' '}
              {isServicesView ? 'Servicio' : 'Categoría'}
            </h2>
  
            <label
              className="admin-manage-services-modal-label"
              htmlFor={isServicesView ? 'titulo' : 'nombre'}
            >
              {isServicesView ? 'Título del Servicio' : 'Nombre de la Categoría'}
            </label>
            <input
              type="text"
              id={isServicesView ? 'titulo' : 'nombre'}
              name={isServicesView ? 'titulo' : 'nombre'}
              placeholder={isServicesView ? 'Ej: Masaje Relajante' : 'Ej: Masajes'}
              value={isServicesView ? newItem.titulo : newItem.nombre}
              onChange={handleChange}
              className="admin-manage-services-input"
            />
  
            <label className="admin-manage-services-modal-label" htmlFor="descripcion">
              Descripción
            </label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              placeholder="Descripción detallada"
              value={newItem.descripcion}
              onChange={handleChange}
              className="admin-manage-services-input"
            />
  
            <label className="admin-manage-services-modal-label" htmlFor="imagen">
              Imagen (URL)
            </label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleFileChange}
              className="admin-manage-services-input-file"
            />
            {uploadProgress > 0 && (
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
            {newItem.imagen && (
              <input
                type="text"
                value={newItem.imagen}
                readOnly
                className="admin-manage-services-input"
              />
            )}
  
            {isServicesView && (
              <>
                <label className="admin-manage-services-modal-label" htmlFor="categoria_id">
                  Categoría
                </label>
                <select
                  id="categoria_id"
                  name="categoria_id"
                  value={newItem.categoria_id}
                  onChange={handleChange}
                  className="admin-manage-services-input"
                >
                  <option value="">Selecciona una Categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </>
            )}
  
            <div className="admin-manage-services-modal-buttons">
              <button onClick={handleSave} className="admin-manage-services-save-button">Guardar</button>
              <button onClick={closeModal} className="admin-manage-services-cancel-button">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default ManageServices;
