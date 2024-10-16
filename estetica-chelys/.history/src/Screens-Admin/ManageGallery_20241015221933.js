import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../EstilosAdmin/ManageGallery.css';
import {
  fetchGalerias,
  createGaleria,
  updateGaleria,
  deleteGaleria,
} from './galeriaAPI';
import {
  fetchCategoriasGaleria,
  createCategoriaGaleria,
  updateCategoriaGaleria,
  deleteCategoriaGaleria,
} from './categoriaGaleriaAPI';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig.js'; // Importa la configuración de Firebase Storage

const ManageGallery = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [isGalleryView, setIsGalleryView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({
    foto_antes: '',
    foto_despues: '',
    categoria_id: null,
    nombre: '',
    descripcion: '',
    imagenCategoria: '',
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileBefore, setFileBefore] = useState(null); // Estado para almacenar la imagen "foto_antes"
  const [fileAfter, setFileAfter] = useState(null); // Estado para almacenar la imagen "foto_despues"
  const [fileCategory, setFileCategory] = useState(null); // Imagen para categorías

  // Cargar las galerías y las categorías cuando el componente se monte
  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedGalerias, loadedCategorias] = await Promise.all([fetchGalerias(), fetchCategoriasGaleria()]);
        setGallery(loadedGalerias);
        setCategories(loadedCategorias);
      } catch (error) {
        toast.error('Error al cargar datos: ' + error.message);
      }
    };
    loadData();
  }, []);

  // Obtener el nombre de la categoría
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.nombre : 'Sin categoría';
  };

  // Abrir modal para agregar o editar
  const openModal = (item = null, isEditing = false) => {
    setIsModalOpen(true);
    setIsEditing(isEditing);
    setCurrentItem(item);
    setNewItem(
      item ? { ...item } : { foto_antes: '', foto_despues: '', categoria_id: null, nombre: '', descripcion: '', imagenCategoria: '' }
    );
    setFileBefore(null); // Reiniciar las imágenes
    setFileAfter(null);
    setFileCategory(null);
  };

  // Cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setNewItem({ foto_antes: '', foto_despues: '', categoria_id: null, nombre: '', descripcion: '', imagenCategoria: '' });
    setUploadProgress(0); // Reiniciar el progreso al cerrar el modal
    setFileBefore(null);
    setFileAfter(null);
    setFileCategory(null);
  };

  // Función para manejar los cambios en los campos de entrada (input)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para subir archivos a Firebase y retornar la URL
  const uploadFileToFirebase = async (file, path) => {
    return new Promise((resolve, reject) => {
      const fileRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          toast.error('Error al subir la imagen: ' + error.message);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  // Guardar los cambios (crear o editar)
  const handleSave = async () => {
    try {
      // Subir imágenes solo si se han seleccionado archivos
      if (fileBefore) {
        newItem.foto_antes = await uploadFileToFirebase(fileBefore, `galeria/${fileBefore.name}`);
      }
      if (fileAfter) {
        newItem.foto_despues = await uploadFileToFirebase(fileAfter, `galeria/${fileAfter.name}`);
      }
      if (fileCategory) {
        newItem.imagenCategoria = await uploadFileToFirebase(fileCategory, `categorias/${fileCategory.name}`);
      }

      if (isGalleryView) {
        // Guardar en la galería
        if (isEditing) {
          await updateGaleria(currentItem.id, { ...currentItem, ...newItem });
          setGallery(gallery.map((item) => (item.id === currentItem.id ? { ...currentItem, ...newItem } : item)));
        } else {
          const createdGaleria = await createGaleria(newItem);
          setGallery([...gallery, createdGaleria]);
        }
      } else {
        // Guardar en las categorías
        if (isEditing) {
          await updateCategoriaGaleria(currentItem.id, { ...currentItem, ...newItem });
          setCategories(categories.map((cat) => (cat.id === currentItem.id ? { ...currentItem, ...newItem } : cat)));
        } else {
          const createdCategoria = await createCategoriaGaleria(newItem);
          setCategories([...categories, createdCategoria]);
        }
      }
      closeModal();
      toast.success('Guardado con éxito');
    } catch (error) {
      toast.error('Error al guardar: ' + error.message);
    }
  };

  // Eliminar elementos
  const handleDelete = async (id) => {
    try {
      if (isGalleryView) {
        await deleteGaleria(id);
        setGallery(gallery.filter((item) => item.id !== id));
      } else {
        await deleteCategoriaGaleria(id);
        setCategories(categories.filter((cat) => cat.id !== id));
      }
      toast.success('Eliminado con éxito');
    } catch (error) {
      toast.error('Error al eliminar: ' + error.message);
    }
  };

  return (
    <div className="manage-gallery-container-GaleriaAdmin">
      <ToastContainer position="top-right" autoClose={5000} />
      <button onClick={onClose} className="close-button-GaleriaAdmin">Cerrar</button>
      <h1 className="title-GaleriaAdmin">{isGalleryView ? 'Galería' : 'Categorías de Galería'}</h1>

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
                    <td><img src={category.imagenCategoria} alt={category.nombre} className="table-image-GaleriaAdmin" /></td>
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
                <label className="modal-label-GaleriaAdmin" htmlFor="imagenFileAntes">Subir Foto Antes</label>
                <input
                  type="file"
                  id="imagenFileAntes"
                  onChange={(e) => setFileBefore(e.target.files[0])}
                  className="input-GaleriaAdmin"
                />
                <label className="modal-label-GaleriaAdmin" htmlFor="imagenFileDespues">Subir Foto Después</label>
                <input
                  type="file"
                  id="imagenFileDespues"
                  onChange={(e) => setFileAfter(e.target.files[0])}
                  className="input-GaleriaAdmin"
                />
                {uploadProgress > 0 && (
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
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
                <label className="modal-label-GaleriaAdmin" htmlFor="imagenFile">Subir Imagen de la Categoría</label>
                <input
                  type="file"
                  id="imagenFile"
                  onChange={(e) => setFileCategory(e.target.files[0])}
                  className="input-GaleriaAdmin"
                />
                {uploadProgress > 0 && (
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </>
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
                {categories.map((cat) => (
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
