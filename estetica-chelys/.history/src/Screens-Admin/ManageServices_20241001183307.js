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
import { storage } from '../firebaseConfig';

const ManageServices = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [isServicesView, setIsServicesView] = useState(true); // Alternar entre servicios y categorías
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // El item que estamos editando
  const [newItem, setNewItem] = useState({ titulo: '', descripcion: '', imagen: '', categoria_id: null, nombre: '' });
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    // Cargar servicios y categorías al montar el componente
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

  // Manejo de subida de imagen
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileRef = ref(storage, `services/${file.name}`);
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
          setNewItem((prev) => ({ ...prev, imagen: downloadURL }));
          toast.success('Imagen cargada con éxito!');
          setUploadProgress(0);
        });
      }
    );
  };

  const openModal = (item = null, isEditing = false) => {
    setIsModalOpen(true);
    setIsEditing(isEditing);
    setCurrentItem(item);
    setNewItem(
      item
        ? item
        : { titulo: '', descripcion: '', imagen: '', categoria_id: '', nombre: '' }
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        if (isServicesView) {
          const updatedService = await updateServicio(currentItem.id, newItem);
          setServices(
            services.map((service) =>
              service.id === currentItem.id ? updatedService : service
            )
          );
          toast.success('Servicio actualizado con éxito');
        } else {
          const updatedCategory = await updateCategoriaServicio(
            currentItem.id,
            newItem
          );
          setCategories(
            categories.map((cat) =>
              cat.id === currentItem.id ? updatedCategory : cat
            )
          );
          toast.success('Categoría actualizada con éxito');
        }
      } else {
        if (isServicesView) {
          const createdService = await createServicio(newItem);
          setServices([...services, createdService]);
          toast.success('Servicio creado con éxito');
        } else {
          const createdCategory = await createCategoriaServicio(newItem);
          setCategories([...categories, createdCategory]);
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
        setServices(services.filter((service) => service.id !== id));
        toast.success('Servicio eliminado con éxito');
      } else {
        await deleteCategoriaServicio(id);
        setCategories(categories.filter((cat) => cat.id !== id));
        toast.success('Categoría eliminada con éxito');
      }
    } catch (error) {
      toast.error('Error al eliminar: ' + error.message);
    }
  };

  return (
    <div className="manage-services-container">
      <ToastContainer position="top-right" autoClose={5000} />
      <button onClick={onClose} className="close-button">Cerrar</button>
      <h1 className="title">
        {isServicesView ? 'Servicios' : 'Categorías de Servicios'}
      </h1>

      <div className="buttons-container">
        <button
          onClick={() => setIsServicesView(!isServicesView)}
          className="toggle-view-button"
        >
          Ver {isServicesView ? 'Categorías' : 'Servicios'}
        </button>
        <button onClick={() => openModal(null, false)} className="add-button">
          Agregar {isServicesView ? 'Servicio' : 'Categoría'}
        </button>
      </div>

      <div className="table-container">
        {isServicesView ? (
          <>
            <h2 className="subtitle">Servicios</h2>
            <table className="custom-table">
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
                        className="table-image"
                      />
                    </td>
                    <td>{getCategoryName(service.categoria_id)}</td>
                    <td>
                      <button
                        onClick={() => openModal(service, true)}
                        className="edit-button"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="delete-button"
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
            <h2 className="subtitle">Categorías de Servicios</h2>
            <table className="custom-table">
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
                        className="table-image"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => openModal(category, true)}
                        className="edit-button"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="delete-button"
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
        <div className="modal">
          <div className="modal-content">
            <h2>
              {isEditing ? 'Editar' : 'Agregar'}{' '}
              {isServicesView ? 'Servicio' : 'Categoría'}
            </h2>

            <label
              className="modal-label"
              htmlFor={isServicesView ? 'titulo' : 'nombre'}
            >
              {isServicesView ? 'Título del Servicio' : 'Nombre de la Categoría'}
            </label>
            <input
              type="text"
              id={isServicesView ? 'titulo' : 'nombre'}
              name={isServicesView ? 'titulo' : 'nombre'}
              placeholder={
                isServicesView ? 'Ej: Masaje Relajante' : 'Ej: Masajes'
              }
              value={isServicesView ? newItem.titulo : newItem.nombre}
              onChange={handleChange}
              className="input"
            />

            <label className="modal-label" htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              placeholder="Descripción detallada"
              value={newItem.descripcion}
              onChange={handleChange}
              className="input"
            />

            <label className="modal-label" htmlFor="imagen">Imagen</label>
            <input
              type="file"
              id="imagen"
              onChange={handleFileChange}
              className="input"
            />
            {uploadProgress > 0 && (
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

            {isServicesView && (
              <>
                <label className="modal-label" htmlFor="categoria_id">Categoría</label>
                <select
                  id="categoria_id"
                  name="categoria_id"
                  value={newItem.categoria_id}
                  onChange={handleChange}
                  className="input"
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

            <div className="modal-buttons">
              <button onClick={handleSave} className="save-button">Guardar</button>
              <button onClick={closeModal} className="cancel-button">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
