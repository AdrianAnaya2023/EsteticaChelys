import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchHomepageById, updateHomepage } from '../Screens-Admin/homepageAPI';
import { fetchFooterById, updateFooter } from '../Screens-Admin/footerAPI';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import '../EstilosAdmin/ModifyHomeFooter.css';

const ModifyHomeFooter = ({ onClose }) => {
  const [homeData, setHomeData] = useState({
    descripcion: '',
    foto_dueno: '',
    fotos_local: [],
  });

  const [footerData, setFooterData] = useState({
    email: '',
    telefono: '',
    direccion: '',
    logo_img: '',
    nombre_dueno: '',
  });

  const [isTableView, setIsTableView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingHome, setIsEditingHome] = useState(false);
  const [currentData, setCurrentData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
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

  const openModal = (isHome = true) => {
    setIsEditingHome(isHome);
    setCurrentData(isHome ? { ...homeData } : { ...footerData });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setCurrentData({ ...currentData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, isHomeImage = true, localIndex = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const filePath = isHomeImage
      ? localIndex !== null
        ? `home/local-${localIndex}/${file.name}`
        : `home/${file.name}`
      : `footer/${file.name}`;

    const fileRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      null, // No necesitamos manejar el progreso
      (error) => {
        toast.error('Error al subir la imagen: ' + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (isHomeImage) {
            if (localIndex !== null) {
              const updatedFotosLocal = [...currentData.fotos_local];
              updatedFotosLocal[localIndex] = downloadURL;
              setCurrentData((prev) => ({ ...prev, fotos_local: updatedFotosLocal }));
            } else {
              setCurrentData((prev) => ({ ...prev, foto_dueno: downloadURL }));
            }
          } else {
            setCurrentData((prev) => ({ ...prev, logo_img: downloadURL }));
          }
          toast.success('Imagen cargada con éxito!');
        });
      }
    );
  };

  const deleteFotoLocal = async (index) => {
    const fileUrl = currentData.fotos_local[index];

    // Si el campo está vacío (no tiene URL de imagen), solo elimina el campo
    if (!fileUrl) {
      const updatedFotosLocal = currentData.fotos_local.filter((_, i) => i !== index);
      setCurrentData((prev) => ({ ...prev, fotos_local: updatedFotosLocal }));
      toast.success('Campo eliminado con éxito');
      return;
    }

    const fileRef = ref(storage, fileUrl);

    try {
      await deleteObject(fileRef);
      const updatedFotosLocal = currentData.fotos_local.filter((_, i) => i !== index);
      setCurrentData((prev) => ({ ...prev, fotos_local: updatedFotosLocal }));
      toast.success('Foto y campo eliminados con éxito');
    } catch (error) {
      toast.error('Error al eliminar la foto: ' + error.message);
    }
  };

  const addFotoLocal = () => {
    setCurrentData((prev) => ({ ...prev, fotos_local: [...prev.fotos_local, ''] }));
  };

  const handleSave = async () => {
    try {
      if (isEditingHome) {
        await updateHomepage(1, currentData);
        setHomeData(currentData);
        toast.success('Home actualizado con éxito!');
      } else {
        await updateFooter(1, currentData);
        setFooterData(currentData);
        toast.success('Footer actualizado con éxito!');
      }
      closeModal();
    } catch (error) {
      toast.error('Error al guardar los cambios: ' + error.message);
    }
  };

  return (
    <div className="modify-home-footer-container">
      <ToastContainer position="top-right" autoClose={5000} />
      <button onClick={onClose} className="close-button-modify">Cerrar</button>
      <h1 className="title-modify">Home y Footer</h1>

      <div className="buttons-container-modify">
        <button onClick={() => setIsTableView(!isTableView)} className="toggle-view-button-modify">
          Ver {isTableView ? 'Footer' : 'Home'}
        </button>
      </div>

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
                        <li key={index}>
                          <img src={foto} alt={`Local ${index}`} className="table-image-modify" />
                        </li>
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
                <input type="file" onChange={(e) => handleFileChange(e, true)} className="input-file-modify" />

                <label className="modal-label-modify" htmlFor="fotos_local">Fotos del Local (URL)</label>
                {currentData.fotos_local.map((foto, index) => (
                  <div key={index} className="foto-local-container-modify">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, true, index)}
                      className="input-file-modify"
                    />
                    <button
                      onClick={() => deleteFotoLocal(index)}
                      className="delete-foto-button-modify"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
                <button onClick={addFotoLocal} className="add-foto-button-modify">Agregar Foto</button>
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
                <input type="file" onChange={(e) => handleFileChange(e, false)} className="input-file-modify" />
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
