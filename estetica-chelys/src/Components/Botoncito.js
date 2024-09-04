import React from 'react';
import './Botoncito.css';

const Botoncito = ({ style, onClick }) => (
  <button className="botoncito" style={style} onClick={onClick}>
    <span className="botoncito-line"></span>
    <span className="botoncito-line"></span>
    <span className="botoncito-line"></span>
  </button>
);

export default Botoncito;
