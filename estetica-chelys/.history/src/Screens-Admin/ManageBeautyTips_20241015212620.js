import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../EstilosAdmin/ManageBeautyTips.css'; // Asegúrate de crear y usar los estilos correctos
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig.js'; // Importa la configuración de Firebase Storage
import {
  fetchCategoriasConsejos,
  createCategoriaConsejo,
  updateCategoriaConsejo,
  deleteCategoriaConsejo,
} from './categoriaConsejosAPI'; // Importar funciones de categorías

import {
  fetchConsejos,
  createConsejo,
  updateConsejo,
  deleteConsejo,
} from './consejosAPI'; // Importar funciones de consejos

const ManageBeautyTips = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [beautyTips, setBeautyTips] = useState([]);
  const [isBeautyTipsView, setIsBeautyTipsView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    categoria_id: null,
    nombre: '',
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(null); // Estado para almacenar el archivo de imagen

  // Cargar datos iniciales de consejos y categorías
  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedCategories, loadedBeautyTips] = await Promise.all([fetchCategoriasConsejos(), fetchConsejos()]);
        setCategories(loadedCategories);
        setBeautyTips(loadedBeautyTips);
      } catch (error) {
        toast.error('Error al cargar datos: ' + error.message);
      }
    };
    loadData();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.nombre : 'Sin categoría';
  };

  const openModal = (item = null, isEditing = false) => {
    setIsModalOpen(true);
    setIsEditing(isEditing);
    setCurrentItem(item);
    if (item) {
      setNewItem(item); // Cargar los datos actuales si se está editando
    } else {
      setNewItem({ titulo: '', descripcion: '', imagen: '', categoria_id: null });
    }
    setFile(null); // Reiniciar el archivo de imagen
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUploadProgress(0);
    setNewItem({ titulo: '', descripcion: '', imagen: '', categoria_id: null });
    setFile(null); // Reiniciar el archivo
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile); // Guardar el archivo seleccionado
    uploadImage(selectedFile); // Cargar la imagen instantáneamente
  };

  const uploadImage = async (file) => {
    const fileRef = ref(storage, `consejos/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error('Error al subir la imagen: ' + error.message);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setNewItem((prev) => ({ ...prev, imagen: downloadURL })); // Actualiza la URL de la imagen en el estado
        toast.success('Imagen cargada con éxito!');
      }
    );
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        // Editar consejo o categoría
        if (isBeautyTipsView) {
          if (!newItem.titulo || !newItem.descripcion || !newItem.categoria_id) {
            return toast.error('Todos los campos del consejo son obligatorios.');
          }
          await updateConsejo(currentItem.id, newItem);
          setBeautyTips(beautyTips.map((tip) => (tip.id === currentItem.id ? newItem : tip)));
          toast.success('Consejo actualizado con éxito');
        } else {
          if (!newItem.nombre || !newItem.descripcion) {
            return toast.error('Todos los campos de la categoría son obligatorios.');
          }
          await updateCategoriaConsejo(currentItem.id, newItem);
          setCategories(categories.map((cat) => (cat.id === currentItem.id ? newItem : cat)));
          toast.success('Categoría actualizada con éxito');
        }
      } else {
        // Agregar consejo o categoría
        if (isBeautyTipsView) {
          if (!newItem.titulo || !newItem.descripcion || !newItem.categoria_id || !newItem.imagen) {
            return toast.error('Todos los campos del consejo son obligatorios.');
          }
          const createdConsejo = await createConsejo(newItem);
          setBeautyTips([...beautyTips, { ...createdConsejo }]);
          toast.success('Consejo creado con éxito');
        } else {
          if (!newItem.nombre || !newItem.descripcion || !newItem.imagen) {
            return toast.error('Todos los campos de la categoría son obligatorios.');
          }
          const createdCategoria = await createCategoriaConsejo(newItem);
          setCategories([...categories, { ...createdCategoria }]);
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
      if (isBeautyTipsView) {
        await deleteConsejo(id);
        setBeautyTips(beautyTips.filter((tip) => tip.id !== id));
        toast.success('Consejo eliminado con éxito');
      } else {
        await deleteCategoriaConsejo(id);
        setCategories(categories.filter((cat) => cat.id !== id));
        toast.success('Categoría eliminada con éxito');
      }
    } catch (error) {
      toast.error('Error al eliminar: ' + error.message);
    }
  };

  return (
    <div className="manage-beauty-tips-container-Consejitos">
      <ToastContainer position="top-right" autoClose={5000} />
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
            
            <label className="modal-label-Consejitos" htmlFor="imagen">Imagen</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleFileChange}
              className="input-Consejitos"
            />

            {uploadProgress > 0 && (
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

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
                  {categories.map((cat) => (
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
