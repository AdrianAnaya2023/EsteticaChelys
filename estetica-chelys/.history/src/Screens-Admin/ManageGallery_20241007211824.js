import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../EstilosAdmin/ManageGallery.css';
import { 
  fetchGalerias, 
  createGaleria, 
  updateGaleria, 
  deleteGaleria 
} from './galeriaAPI';
import { 
  fetchCategoriasGaleria, 
  createCategoriaGaleria, 
  updateCategoriaGaleria, 
  deleteCategoriaGaleria 
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
  const [newItem, setNewItem] = useState({ foto_antes: '', foto_despues: '', categoria_id: null, nombre: '', descripcion: '', imagenCategoria: '' });
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedGalerias, loadedCategorias] = await Promise.all([
          fetchGalerias(),
          fetchCategoriasGaleria(),
        ]);
        setGallery(loadedGalerias);
        setCategories(loadedCategorias);
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
      item
        ? { ...item } 
        : { foto_antes: '', foto_despues: '', categoria_id: null, nombre: '', descripcion: '', imagenCategoria: '' }
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewItem({ foto_antes: '', foto_despues: '', categoria_id: null, nombre: '', descripcion: '', imagenCategoria: '' });
    setUploadProgress(0); // Reiniciar el progreso al cerrar el modal
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileRef = ref(storage, `${isGalleryView ? 'galeria' : 'categorias'}/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Actualizar el progreso de carga
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error('Error al subir la imagen: ' + error.message);
        setUploadProgress(0);
      },
      () => {
        // Obtener URL de descarga una vez completada la carga
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (isGalleryView) {
            setNewItem((prev) => ({ ...prev, foto_antes: downloadURL })); // En galería subir como `foto_antes`
          } else {
            setNewItem((prev) => ({ ...prev, imagenCategoria: downloadURL })); // En categoría subir como `imagenCategoria`
          }
          toast.success('Imagen cargada con éxito!');
          setUploadProgress(0); // Reiniciar el progreso después de la carga
        });
      }
    );
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (isGalleryView) {
        if (!newItem.foto_antes || !newItem.foto_despues || !newItem.categoria_id) {
          return toast.error('Todos los campos de la galería son obligatorios.');
        }
      } else {
        if (!newItem.nombre || !newItem.descripcion || !newItem.imagenCategoria) {
          return toast.error('Todos los campos de la categoría son obligatorios.');
        }
      }

      if (isEditing) {
        if (isGalleryView) {
          await updateGaleria(currentItem.id, newItem);
          setGallery(gallery.map(item => (item.id === currentItem.id ? newItem : item)));
        } else {
          await updateCategoriaGaleria(currentItem.id, newItem);
          setCategories(categories.map(cat => (cat.id === currentItem.id ? newItem : cat)));
        }
      } else {
        if (isGalleryView) {
          const createdGaleria = await createGaleria(newItem);
          setGallery([...gallery, createdGaleria]);
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

  const handleDelete = async (id) => {
    try {
      if (isGalleryView) {
        await deleteGaleria(id);
        setGallery(gallery.filter(item => item.id !== id));
      } else {
        await deleteCategoriaGaleria(id);
        setCategories(categories.filter(cat => cat.id !== id));
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

                <label className="modal-label-GaleriaAdmin" htmlFor="imagenFile">Imagen para Foto Antes</label>
                <input
                  type="file"
                  id="imagenFile"
                  name="imagenFile"
                  onChange={handleFileChange}
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

                <label className="modal-label-GaleriaAdmin" htmlFor="imagenFile">Imagen de la Categoría</label>
                <input
                  type="file"
                  id="imagenFile"
                  name="imagenFile"
                  onChange={handleFileChange}
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
