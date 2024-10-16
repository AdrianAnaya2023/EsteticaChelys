import React, { useState, useEffect } from 'react';
import { fetchHomepageById, updateHomepage } from '../Screens-Admin/homepageAPI'; // Importa las funciones del API de Homepage
import { fetchFooterById, updateFooter } from '../Screens-Admin/footerAPI'; // Importa las funciones del API de Footer
import '../EstilosAdmin/ModifyHomeFooter.css'; // Asegúrate de tener el archivo CSS correspondiente

const ModifyHomeFooter = ({ onClose }) => {
  const [homeData, setHomeData] = useState({
    descripcion: '',
    foto_dueno: '',
    fotos_local: [''], // Iniciamos con un campo de foto
  });

  const [footerData, setFooterData] = useState({
    email: '',
    telefono: '',
    direccion: '',
    logo_img: '',
    nombre_dueno: '',
  });

  const [isTableView, setIsTableView] = useState(true); // Alternar entre vista de Home y Footer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingHome, setIsEditingHome] = useState(false); // Distinguimos si estamos editando Home o Footer
  const [currentData, setCurrentData] = useState({}); // Datos actuales que se están editando

  // Cargar los datos de la API al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        // Asume que el ID es 1, puedes ajustarlo según tu necesidad
        const homeResponse = await fetchHomepageById(1); 
        const footerResponse = await fetchFooterById(1); 
        setHomeData(homeResponse);
        setFooterData(footerResponse);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    loadData();
  }, []);

  // Manejo de modales
  const openModal = (isHome = true) => {
    setIsEditingHome(isHome);
    setCurrentData(isHome ? { ...homeData } : { ...footerData });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Manejo de cambios en los inputs del modal
  const handleChange = (e) => {
    setCurrentData({ ...currentData, [e.target.name]: e.target.value });
  };

  const handleFotosLocalChange = (index, value) => {
    const updatedFotosLocal = [...currentData.fotos_local];
    updatedFotosLocal[index] = value;
    setCurrentData({ ...currentData, fotos_local: updatedFotosLocal });
  };

  // Guardar cambios
  const handleSave = async () => {
    try {
      if (isEditingHome) {
        await updateHomepage(1, currentData); // Actualiza el home data (ID 1 como ejemplo)
        setHomeData(currentData); // Actualizamos los datos locales con los datos modificados
      } else {
        await updateFooter(1, currentData); // Actualiza el footer data (ID 1 como ejemplo)
        setFooterData(currentData); // Actualizamos los datos locales con los datos modificados
      }
      closeModal();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  return (
    <div className="modify-home-footer-container">
      <button onClick={onClose} className="close-button-modify">Cerrar</button>
      <h1 className="title-modify">Home y Footer</h1>

      <div className="buttons-container-modify">
        <button onClick={() => setIsTableView(!isTableView)} className="toggle-view-button-modify">
          Ver {isTableView ? 'Footer' : 'Home'}
        </button>
      </div>

      {/* Tabla de Home o Footer */}
      <div className="table-container-modify">
        {isTableView ? (
          <>
            <h2 className="subtitle-modify">Home</h2>
            <table className="custom-table-modify">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Foto del Dueño</th>
                  <th>Fotos del Local</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{homeData.descripcion}</td>
                  <td><img src={homeData.foto_dueno} alt="Dueño" className="table-image-modify" /></td>
                  <td>
                    <ul>
                      {homeData.fotos_local.map((foto, index) => (
                        <li key={index}><img src={foto} alt={`Local ${index}`} className="table-image-modify" /></li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button onClick={() => openModal(true)} className="edit-button-modify">Editar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h2 className="subtitle-modify">Footer</h2>
            <table className="custom-table-modify">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Logo</th>
                  <th>Nombre del Dueño</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{footerData.email}</td>
                  <td>{footerData.telefono}</td>
                  <td>{footerData.direccion}</td>
                  <td><img src={footerData.logo_img} alt="Logo" className="table-image-modify" /></td>
                  <td>{footerData.nombre_dueno}</td>
                  <td>
                    <button onClick={() => openModal(false)} className="edit-button-modify">Editar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Modal para editar Home o Footer */}
      {isModalOpen && (
        <div className="modal-modify">
          <div className="modal-content-modify">
            <h2>{isEditingHome ? 'Editar Home' : 'Editar Footer'}</h2>

            {isEditingHome ? (
              <>
                <label className="modal-label-modify" htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={currentData.descripcion}
                  onChange={handleChange}
                  className="input-modify"
                />

                <label className="modal-label-modify" htmlFor="foto_dueno">Foto del Dueño (URL)</label>
                <input
                  type="text"
                  id="foto_dueno"
                  name="foto_dueno"
                  value={currentData.foto_dueno}
                  onChange={handleChange}
                  className="input-modify"
                />

                <label className="modal-label-modify" htmlFor="fotos_local">Fotos del Local (URL)</label>
                {currentData.fotos_local.map((foto, index) => (
                  <input
                    key={index}
                    type="text"
                    value={foto}
                    onChange={(e) => handleFotosLocalChange(index, e.target.value)}
                    className="input-modify"
                  />
                ))}
              </>
            ) : (
              <>
                <label className="modal-label-modify" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={currentData.email}
                  onChange={handleChange}
                  className="input-modify"
                />

                <label className="modal-label-modify" htmlFor="telefono">Teléfono</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={currentData.telefono}
                  onChange={handleChange}
                  className="input-modify"
                />

                <label className="modal-label-modify" htmlFor="direccion">Dirección</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={currentData.direccion}
                  onChange={handleChange}
                  className="input-modify"
                />

                <label className="modal-label-modify" htmlFor="logo_img">Logo (URL)</label>
                <input
                  type="text"
                  id="logo_img"
                  name="logo_img"
                  value={currentData.logo_img}
                  onChange={handleChange}
                  className="input-modify"
                />

                <label className="modal-label-modify" htmlFor="nombre_dueno">Nombre del Dueño</label>
                <input
                  type="text"
                  id="nombre_dueno"
                  name="nombre_dueno"
                  value={currentData.nombre_dueno}
                  onChange={handleChange}
                  className="input-modify"
                />
              </>
            )}

            <div className="modal-buttons-modify">
              <button onClick={handleSave} className="save-button-modify">Guardar</button>
              <button onClick={closeModal} className="cancel-button-modify">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifyHomeFooter;
