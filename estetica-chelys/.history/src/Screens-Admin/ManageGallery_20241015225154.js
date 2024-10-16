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
} from './categoriaGaleriaAPI'; // Asegúrate de que el path sea correcto
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig.js'; // Asegúrate de tener la configuración correcta de Firebase

const ManageGallery = ({ onClose }) => {
  const [categories, setCategories] = useState([]); // Almacenar las categorías
  const [gallery, setGallery] = useState([]);
  const [isGalleryView, setIsGalleryView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({
    foto_antes: '',
    foto_despues: '',
    categoria_id: '', // Asegurarse de que el ID de la categoría esté bien manejado
    nombre: '',
    descripcion: '',
    imagenCategoria: '',
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    // Cargar galerías y categorías al montar el componente
    const loadData = async () => {
      try {
        const loadedCategorias = await fetchCategoriasGaleria();
        setCategories(loadedCategorias); // Asegurarse de que las categorías se carguen
        const loadedGalerias = await fetchGalerias();
        setGallery(loadedGalerias);
      } catch (error) {
        toast.error('Error al cargar datos: ' + error.message);
      }
    };
    loadData();
  }, []); // Vacío para que se ejecute una sola vez al montar el componente

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.nombre : 'Sin categoría';
  };

  const openModal = (item = null, isEditing = false) => {
    setIsModalOpen(true);
    setIsEditing(isEditing);
    setCurrentItem(item);
    setNewItem(
      item
        ? item
        : { foto_antes: '', foto_despues: '', categoria_id: '', nombre: '', descripcion: '', imagenCategoria: '' }
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUploadProgress(0); // Reiniciar progreso al cerrar el modal
  };

  const handleFileChange = (e, isCategory = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileRef = ref(storage, `${isGalleryView ? 'galeria' : 'categorias'}/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Manejo del progreso de la carga
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
          setNewItem((prev) => ({
            ...prev,
            [isCategory ? 'imagenCategoria' : 'foto_antes']: downloadURL,
          }));
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
      if (isEditing) {
        if (isGalleryView) {
          const updatedGaleria = await updateGaleria(currentItem.id, newItem);
          setGallery(
            gallery.map((gal) =>
              gal.id === currentItem.id ? updatedGaleria : gal
            )
          );
          toast.success('Galería actualizada con éxito');
        } else {
          const updatedCategoria = await updateCategoriaGaleria(
            currentItem.id,
            newItem
          );
          setCategories(
            categories.map((cat) =>
              cat.id === currentItem.id ? updatedCategoria : cat
            )
          );
          toast.success('Categoría actualizada con éxito');
        }
      } else {
        if (isGalleryView) {
          const createdGaleria = await createGaleria(newItem);
          setGallery([...gallery, createdGaleria]);
          toast.success('Galería creada con éxito');
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

  const handleDelete = async (id) => {
    try {
      if (isGalleryView) {
        await deleteGaleria(id);
        setGallery(gallery.filter((gal) => gal.id !== id));
        toast.success('Galería eliminada con éxito');
      } else {
        await deleteCategoriaGaleria(id);
        setCategories(categories.filter((cat) => cat.id !== id));
        toast.success('Categoría eliminada con éxito');
      }
    } catch (error) {
      toast.error('Error al eliminar: ' + error.message);
    }
  };

  return (
    <div className="manage-gallery-container-ManageGallery">
      <ToastContainer position="top-right" autoClose={5000} />
      <button onClick={onClose} className="close-button-ManageGallery">
        Cerrar
      </button>
      <h1 className="title-ManageGallery">
        {isGalleryView ? 'Galería' : 'Categorías de Galería'}
      </h1>

      <div className="gallery-buttons-container-ManageGallery">
        <button
          onClick={() => setIsGalleryView(!isGalleryView)}
          className="gallery-toggle-view-button-ManageGallery"
        >
          Ver {isGalleryView ? 'Categorías' : 'Galería'}
        </button>
        <button
          onClick={() => openModal(null, false)}
          className="gallery-add-button-ManageGallery"
        >
          Agregar {isGalleryView ? 'Imagen a Galería' : 'Categoría'}
        </button>
      </div>

      <div className="table-container-ManageGallery">
        {isGalleryView ? (
          <>
            <h2 className="subtitle-ManageGallery">Galería de Fotos</h2>
            <table className="custom-table-ManageGallery">
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
                {gallery.map((gal) => (
                  <tr key={gal.id}>
                    <td>{gal.id}</td>
                    <td>
                      <img
                        src={gal.foto_antes}
                        alt="Antes"
                        className="table-image-ManageGallery"
                      />
                    </td>
                    <td>
                      <img
                        src={gal.foto_despues}
                        alt="Después"
                        className="table-image-ManageGallery"
                      />
                    </td>
                    <td>{getCategoryName(gal.categoria_id)}</td>
                    <td>
                      <button
                        onClick={() => openModal(gal, true)}
                        className="edit-button-ManageGallery"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(gal.id)}
                        className="delete-button-ManageGallery"
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
            <h2 className="subtitle-ManageGallery">Categorías de Galería</h2>
            <table className="custom-table-ManageGallery">
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
                        src={category.imagenCategoria}
                        alt={category.nombre}
                        className="table-image-ManageGallery"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => openModal(category, true)}
                        className="edit-button-ManageGallery"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="delete-button-ManageGallery"
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
        <div className="modal-ManageGallery">
          <div className="modal-content-ManageGallery">
            <h2>
              {isEditing ? 'Editar' : 'Agregar'}{' '}
              {isGalleryView ? 'Imagen a Galería' : 'Categoría de Galería'}
            </h2>

            {isGalleryView ? (
              <>
                <label className="modal-label-ManageGallery" htmlFor="imagenFileAntes">
                  Subir Foto Antes
                </label>
                <input
                  type="file"
                  id="imagenFileAntes"
                  onChange={(e) => handleFileChange(e, false)}
                  className="input-ManageGallery"
                />
                <label className="modal-label-ManageGallery" htmlFor="imagenFileDespues">
                  Subir Foto Después
                </label>
                <input
                  type="file"
                  id="imagenFileDespues"
                  onChange={(e) => handleFileChange(e, false)}
                  className="input-ManageGallery"
                />
                {uploadProgress > 0 && (
                  <div className="progress-bar-ManageGallery">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </>
            ) : (
              <>
                <label className="modal-label-ManageGallery" htmlFor="nombre">
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre de la Categoría"
                  value={newItem.nombre}
                  onChange={handleChange}
                  className="input-ManageGallery"
                />
                <label className="modal-label-ManageGallery" htmlFor="descripcion">
                  Descripción
                </label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Descripción"
                  value={newItem.descripcion}
                  onChange={handleChange}
                  className="input-ManageGallery"
                />
                <label className="modal-label-ManageGallery" htmlFor="imagenFile">
                  Subir Imagen de la Categoría
                </label>
                <input
                  type="file"
                  id="imagenFile"
                  onChange={(e) => handleFileChange(e, true)}
                  className="input-ManageGallery"
                />
                {uploadProgress > 0 && (
                  <div className="progress-bar-ManageGallery">
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
                className="input-ManageGallery"
              >
                <option value="">Selecciona una Categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            )}

            <div className="modal-buttons-ManageGallery">
              <button onClick={handleSave} className="save-button-ManageGallery">
                Guardar
              </button>
              <button onClick={closeModal} className="cancel-button-ManageGallery">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
