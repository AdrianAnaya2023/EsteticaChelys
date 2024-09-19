import React, { useState } from 'react';
import '../EstilosAdmin/ManageServices.css'; // Asegúrate de crear y usar los estilos correctos

const ManageServices = ({ onClose }) => {
  // Simulación de datos de categorías de servicios y servicios
  const [categories, setCategories] = useState([
    { id: 1, nombre: 'Faciales', descripcion: 'Servicios de cuidado facial', imagen: 'https://via.placeholder.com/100' },
    { id: 2, nombre: 'Masajes', descripcion: 'Servicios de masajes terapéuticos', imagen: 'https://via.placeholder.com/100' },
  ]);

  const [services, setServices] = useState([
    { id: 1, titulo: 'Limpieza Facial', imagen: 'https://via.placeholder.com/100', categoria_id: 1, descripcion: 'Limpieza profunda de la piel' },
    { id: 2, titulo: 'Masaje Relajante', imagen: 'https://via.placeholder.com/100', categoria_id: 2, descripcion: 'Masaje de relajación total' },
  ]);

  const [isServicesView, setIsServicesView] = useState(true); // Alternar entre vista de servicios y categorías
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Para distinguir entre agregar y editar
  const [currentItem, setCurrentItem] = useState(null); // El item que estamos editando (servicio o categoría)
  const [newItem, setNewItem] = useState({ titulo: '', descripcion: '', imagen: '', categoria_id: null }); // Para agregar nuevo

  // Filtra servicios por categoría
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

  // Agregar o modificar un servicio/categoría
  const handleSave = () => {
    if (isEditing) {
      // Editar servicio o categoría
      if (isServicesView) {
        setServices(services.map(service => service.id === currentItem.id ? newItem : service));
      } else {
        setCategories(categories.map(cat => cat.id === currentItem.id ? newItem : cat));
      }
    } else {
      // Agregar servicio o categoría
      if (isServicesView) {
        setServices([...services, { ...newItem, id: services.length + 1 }]);
      } else {
        setCategories([...categories, { ...newItem, id: categories.length + 1 }]);
      }
    }
    closeModal();
  };

  // Eliminar servicio o categoría
  const handleDelete = (id) => {
    if (isServicesView) {
      setServices(services.filter(service => service.id !== id));
    } else {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="admin-manage-services-container">
      <button onClick={onClose} className="admin-manage-services-close-button">Cerrar</button>
      <h1 className="admin-manage-services-title">Administrar {isServicesView ? 'Servicios' : 'Categorías de Servicios'}</h1>

      <div className="admin-manage-services-buttons-container">
        <button onClick={() => setIsServicesView(!isServicesView)} className="admin-manage-services-toggle-view-button">
          Ver {isServicesView ? 'Categorías' : 'Servicios'}
        </button>
        <button onClick={() => openModal(null, false)} className="admin-manage-services-add-button">
          Agregar {isServicesView ? 'Servicio' : 'Categoría'}
        </button>
      </div>

      {/* Tabla de servicios o categorías */}
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
                      <img src={service.imagen} alt={service.titulo} className="admin-manage-services-table-image" />
                    </td>
                    <td>{getCategoryName(service.categoria_id)}</td>
                    <td>
                      <button onClick={() => openModal(service, true)} className="admin-manage-services-edit-button">Editar</button>
                      <button onClick={() => handleDelete(service.id)} className="admin-manage-services-delete-button">Eliminar</button>
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
                      <img src={category.imagen} alt={category.nombre} className="admin-manage-services-table-image" />
                    </td>
                    <td>
                      <button onClick={() => openModal(category, true)} className="admin-manage-services-edit-button">Editar</button>
                      <button onClick={() => handleDelete(category.id)} className="admin-manage-services-delete-button">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Modal para agregar/editar servicios/categorías */}
      {isModalOpen && (
        <div className="admin-manage-services-modal">
          <div className="admin-manage-services-modal-content">
            <h2>{isEditing ? 'Editar' : 'Agregar'} {isServicesView ? 'Servicio' : 'Categoría'}</h2>
            
            <label className="admin-manage-services-modal-label" htmlFor={isServicesView ? 'titulo' : 'nombre'}>
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
            
            <label className="admin-manage-services-modal-label" htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              placeholder="Descripción detallada"
              value={newItem.descripcion}
              onChange={handleChange}
              className="admin-manage-services-input"
            />
            
            <label className="admin-manage-services-modal-label" htmlFor="imagen">Imagen (URL)</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              placeholder="URL de la Imagen"
              value={newItem.imagen}
              onChange={handleChange}
              className="admin-manage-services-input"
            />

            {isServicesView && (
              <>
                <label className="admin-manage-services-modal-label" htmlFor="categoria_id">Categoría</label>
                <select
                  id="categoria_id"
                  name="categoria_id"
                  value={newItem.categoria_id}
                  onChange={handleChange}
                  className="admin-manage-services-input"
                >
                  <option value="">Selecciona una Categoría</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
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
