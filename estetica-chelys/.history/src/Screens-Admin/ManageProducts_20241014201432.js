import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../EstilosAdmin/ManageProducts.css';
import {
  fetchProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from './productosAPI';
import {
  fetchCategoriasProductos,
} from './categoriaProductosAPI';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig.js'; // Asegúrate de tener la configuración correcta de Firebase

const ManageProducts = ({ onClose }) => {
  const [categories, setCategories] = useState([]); // Almacenar las categorías
  const [products, setProducts] = useState([]);
  const [isProductsView, setIsProductsView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    categoria_id: '', // Asegurarse de que el ID de la categoría esté bien manejado
    nombre: '',
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    // Cargar productos y categorías al montar el componente
    const loadData = async () => {
      try {
        const loadedCategories = await fetchCategoriasProductos();
        setCategories(loadedCategories); // Asegurarse de que las categorías se carguen
        const loadedProducts = await fetchProductos();
        setProducts(loadedProducts);
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
        : { titulo: '', descripcion: '', imagen: '', categoria_id: '', nombre: '' }
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUploadProgress(0); // Reiniciar progreso al cerrar el modal
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileRef = ref(storage, `${isProductsView ? 'productos' : 'categorias'}/${file.name}`);
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
          setNewItem((prev) => ({ ...prev, imagen: downloadURL }));
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
        if (isProductsView) {
          const updatedProducto = await updateProducto(currentItem.id, newItem);
          setProducts(
            products.map((prod) =>
              prod.id === currentItem.id ? updatedProducto : prod
            )
          );
          toast.success('Producto actualizado con éxito');
        } else {
          const updatedCategoria = await updateCategoriaProducto(
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
        if (isProductsView) {
          const createdProducto = await createProducto(newItem);
          setProducts([...products, createdProducto]);
          toast.success('Producto creado con éxito');
        } else {
          const createdCategoria = await createCategoriaProducto(newItem);
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
      if (isProductsView) {
        await deleteProducto(id);
        setProducts(products.filter((prod) => prod.id !== id));
        toast.success('Producto eliminado con éxito');
      } else {
        await deleteCategoriaProducto(id);
        setCategories(categories.filter((cat) => cat.id !== id));
        toast.success('Categoría eliminada con éxito');
      }
    } catch (error) {
      toast.error('Error al eliminar: ' + error.message);
    }
  };

  return (
    <div className="manage-products-container-ManageProducts">
      <ToastContainer position="top-right" autoClose={5000} />
      <button onClick={onClose} className="close-button-ManageProducts">
        Cerrar
      </button>
      <h1 className="title-ManageProducts">
        {isProductsView ? 'Productos' : 'Categorías de Productos'}
      </h1>

      <div className="products-buttons-container-ManageProducts">
        <button
          onClick={() => setIsProductsView(!isProductsView)}
          className="products-toggle-view-button-ManageProducts"
        >
          Ver {isProductsView ? 'Categorías' : 'Productos'}
        </button>
        <button
          onClick={() => openModal(null, false)}
          className="products-add-button-ManageProducts"
        >
          Agregar {isProductsView ? 'Producto' : 'Categoría'}
        </button>
      </div>

      <div className="table-container-ManageProducts">
        {isProductsView ? (
          <>
            <h2 className="subtitle-ManageProducts">Productos de Estética</h2>
            <table className="custom-table-ManageProducts">
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
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.titulo}</td>
                    <td>{product.descripcion}</td>
                    <td>
                      <img
                        src={product.imagen}
                        alt={product.titulo}
                        className="table-image-ManageProducts"
                      />
                    </td>
                    <td>{getCategoryName(product.categoria_id)}</td>
                    <td>
                      <button
                        onClick={() => openModal(product, true)}
                        className="edit-button-ManageProducts"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="delete-button-ManageProducts"
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
            <h2 className="subtitle-ManageProducts">Categorías de Estética</h2>
            <table className="custom-table-ManageProducts">
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
                        className="table-image-ManageProducts"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => openModal(category, true)}
                        className="edit-button-ManageProducts"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="delete-button-ManageProducts"
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
        <div className="modal-ManageProducts">
          <div className="modal-content-ManageProducts">
            <h2>
              {isEditing ? 'Editar' : 'Agregar'}{' '}
              {isProductsView ? 'Producto de Estética' : 'Categoría de Estética'}
            </h2>

            <label
              className="modal-label-ManageProducts"
              htmlFor={isProductsView ? 'titulo' : 'nombre'}
            >
              {isProductsView ? 'Título del Producto' : 'Nombre de la Categoría'}
            </label>
            <input
              type="text"
              id={isProductsView ? 'titulo' : 'nombre'}
              name={isProductsView ? 'titulo' : 'nombre'}
              placeholder={isProductsView ? 'Ej: Crema Facial' : 'Ej: Maquillaje'}
              value={isProductsView ? newItem.titulo : newItem.nombre}
              onChange={handleChange}
              className="input-ManageProducts"
            />

            <label className="modal-label-ManageProducts" htmlFor="descripcion">
              Descripción
            </label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              placeholder="Descripción detallada"
              value={newItem.descripcion}
              onChange={handleChange}
              className="input-ManageProducts"
            />

            <label className="modal-label-ManageProducts" htmlFor="imagen">
              Imagen
            </label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleFileChange}
              className="input-file-ManageProducts"
            />
            {uploadProgress > 0 && (
              <div className="progress-bar-ManageProducts">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

            {isProductsView && (
              <>
                <label
                  className="modal-label-ManageProducts"
                  htmlFor="categoria_id"
                >
                  Categoría
                </label>
                <select
                  id="categoria_id"
                  name="categoria_id"
                  value={newItem.categoria_id}
                  onChange={handleChange}
                  className="input-ManageProducts"
                >
                  <option value="">Selecciona una Categoría</option>
                  {categories.length === 0 ? (
                    <option value="">Cargando categorías...</option>
                  ) : (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))
                  )}
                </select>
              </>
            )}

            <div className="modal-buttons-ManageProducts">
              <button onClick={handleSave} className="save-button-ManageProducts">
                Guardar
              </button>
              <button
                onClick={closeModal}
                className="cancel-button-ManageProducts"
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

export default ManageProducts;
