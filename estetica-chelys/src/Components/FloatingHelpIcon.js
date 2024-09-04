import React from 'react';
import './FloatingHelpIcon.css'; // Asegúrate de importar el archivo CSS correcto

const FloatingHelpIcon = ({ onClick }) => {
  return (
    <div className="floating-help-icon" onClick={onClick}>
      {<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="#0284c7" d="M17.423 19.5h-3v-1h3v-3h1v3h3v1h-3v3h-1zM5 19V5zm-1 1V4h16v9.94q-.238-.101-.479-.18q-.24-.08-.521-.14V5H5v14h7.423q0 .263.026.513t.088.487zm4.117-3.462q.327 0 .547-.221t.22-.549t-.221-.548t-.549-.22t-.548.222t-.22.549t.222.547t.549.22m0-3.769q.327 0 .548-.221q.22-.222.22-.55t-.222-.547t-.549-.22t-.548.221t-.22.55t.222.547t.549.22m0-3.769q.327 0 .548-.221q.22-.222.22-.55t-.222-.547t-.549-.22t-.548.221q-.22.222-.22.549t.222.548t.549.22m3.075 3.5h5.385v-1h-5.385zm0-3.77h5.385v-1h-5.385zm0 7.54h2.004q.143-.287.318-.528q.175-.24.382-.473h-2.704z"/></svg>}
      <i className="fas fa-question-circle"></i>
    </div>
  );
};

export default FloatingHelpIcon;
