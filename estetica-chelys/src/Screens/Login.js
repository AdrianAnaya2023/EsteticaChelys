import React, { useState } from 'react';
import '../Styles/Login.css';

const Login = ({ closeLogin, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="login-container">
      <button onClick={closeLogin} className="close-button">X</button>
      <div className="login-content">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesion</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
