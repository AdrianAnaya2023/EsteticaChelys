import React, { useState } from 'react';
import axios from 'axios'; // Para hacer solicitudes HTTP
import '../Styles/Login.css';

const Login = ({ closeLogin, handleLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api/usuarios/login', {
        usuario,
        contrasena,
      });

      const { token } = response.data;
      
      // Almacenar el token en localStorage
      localStorage.setItem('token', token);

      // Llama a la función de manejo de login y pasa el token
      handleLogin(token);

      // Cierra el formulario de login si el inicio de sesión es exitoso
      closeLogin();
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
      console.error('Error al iniciar sesión:', err);
    }
  };

  return (
    <div className="login-container">
      <button onClick={closeLogin} className="close-button">X</button>
      <div className="login-content">
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="usuario">Usuario:</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
