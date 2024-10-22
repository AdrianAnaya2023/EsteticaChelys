import React, { useState, useEffect } from 'react';
import { fetchUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../Screens-Admin/usuariosAPI';
import '../EstilosAdmin/ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga
  const [currentUser, setCurrentUser] = useState({
    usuario: '',
    contrasena: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsuarios();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    loadUsers();
  }, []);

  // Abrir modal para agregar o editar usuario
  const openModal = (user = null) => {
    setErrorMessage(''); // Limpiar mensajes de error
    setIsModalOpen(true);
    if (user) {
      setCurrentUser(user);
      setIsEditing(true);
    } else {
      setCurrentUser({ usuario: '', contrasena: '' });
      setIsEditing(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Guardar o actualizar usuario
  const handleSave = async () => {
    if (!currentUser.usuario || !currentUser.contrasena) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        // Actualizar usuario existente
        await updateUsuario(currentUser.id, currentUser);
        setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
      } else {
        // Crear nuevo usuario
        const newUser = await createUsuario(currentUser);
        setUsers([...users, newUser]);
      }
      closeModal();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      setErrorMessage('Error al guardar el usuario. Intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar usuario
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteUsuario(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setErrorMessage('Error al eliminar el usuario. Intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-users-container-person">
      <h1 className="title-person">Usuarios</h1>

      <button onClick={() => openModal()} className="add-button-person">
        Agregar Usuario
      </button>

      <table className="custom-table-person">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.usuario}</td>
              <td>{user.contrasena}</td> {/* Mostramos la contraseña también */}
              <td>
                <button
                  onClick={() => openModal(user)}
                  className="edit-button-person"
                  disabled={loading} // Deshabilitar si se está cargando
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="delete-button-person"
                  disabled={loading} // Deshabilitar si se está cargando
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-person">
          <div className="modal-content-person">
            <h2>{isEditing ? 'Editar Usuario' : 'Agregar Usuario'}</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <label className="modal-label-person">Usuario</label>
            <input
              type="text"
              value={currentUser.usuario}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, usuario: e.target.value })
              }
              className="input-person"
            />
            <label className="modal-label-person">Contraseña</label>
            <input
              type="password"
              value={currentUser.contrasena}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, contrasena: e.target.value })
              }
              className="input-person"
            />

            <div className="modal-buttons-person">
              <button
                onClick={handleSave}
                className="save-button-person"
                disabled={loading} // Deshabilitar botón de guardar si está en proceso
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                onClick={closeModal}
                className="cancel-button-person"
                disabled={loading} // Deshabilitar botón de cancelar si está en proceso
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

export default ManageUsers;
