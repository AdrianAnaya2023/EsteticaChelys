import React, { useState } from 'react';
import '../EstilosAdmin/ManageUsers.css'; // Asegúrate de tener el archivo CSS correspondiente

const ManageUsers = () => {
  // Estado para manejar los usuarios
  const [users, setUsers] = useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Admin' },
    { id: 2, nombre: 'María García', email: 'maria@example.com', rol: 'User' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    nombre: '',
    email: '',
    rol: 'User',
  });

  // Función para abrir el modal para agregar o editar un usuario
  const openModal = (user = null) => {
    setIsModalOpen(true);
    if (user) {
      setCurrentUser(user);
      setIsEditing(true);
    } else {
      setCurrentUser({ nombre: '', email: '', rol: 'User' });
      setIsEditing(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // CRUD Funciones
  const handleSave = () => {
    if (isEditing) {
      setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
    } else {
      setUsers([...users, { ...currentUser, id: users.length + 1 }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="manage-users-container">
      <h1 className="title">Administrar Usuarios</h1>

      <button onClick={() => openModal()} className="add-button">
        Agregar Usuario
      </button>

      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>
                <button
                  onClick={() => openModal(user)}
                  className="edit-button"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="delete-button"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
            <label className="modal-label">Nombre</label>
            <input
              type="text"
              value={currentUser.nombre}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, nombre: e.target.value })
              }
              className="input"
            />
            <label className="modal-label">Email</label>
            <input
              type="email"
              value={currentUser.email}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
              className="input"
            />
            <label className="modal-label">Rol</label>
            <select
              value={currentUser.rol}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, rol: e.target.value })
              }
              className="input"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>

            <div className="modal-buttons">
              <button onClick={handleSave} className="save-button">
                Guardar
              </button>
              <button onClick={closeModal} className="cancel-button">
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
