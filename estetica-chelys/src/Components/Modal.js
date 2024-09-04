import React from 'react';
import './Modal.css'; // Asegúrate de crear y diseñar este archivo CSS

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose} className="close-modal">x</button>
      </div>
    </div>
  );
};

export default Modal;
