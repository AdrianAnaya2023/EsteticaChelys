import React, { useState, useEffect } from 'react';
import '../Styles/SpecialOffers.css'; // Asegúrate de que el path al archivo CSS sea correcto
import { fetchPromos } from '../Screens-Admin/promosAPI'; // Asegúrate de importar correctamente la función del API

const SpecialOffers = ({ onClose }) => {
  const [offers, setOffers] = useState([]); // Estado para almacenar las promociones obtenidas
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0); // Estado para controlar la oferta actual
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Función para cargar las promociones desde el API
    const loadOffers = async () => {
      try {
        const promos = await fetchPromos(); // Obtener las promociones desde el API
        const today = new Date(); // Obtener la fecha de hoy

        // Filtrar las promociones que aún no han expirado
        const validPromos = promos.filter((promo) => {
          const endDate = new Date(promo.fecha_fin); // Convertir la fecha de fin de la promoción a objeto Date
          return endDate >= today; // Solo incluir promociones cuya fecha de fin sea mayor o igual a hoy
        });

        setOffers(validPromos); // Guardar las promociones válidas en el estado
        setLoading(false); // Terminar la carga
      } catch (err) {
        setError('Error al cargar las promociones'); // Manejo de error
        setLoading(false); // Terminar la carga incluso si hay error
      }
    };

    loadOffers();
  }, []); // Solo se ejecuta una vez al montar el componente

  const handleNextOffer = () => {
    // Cambiar a la siguiente oferta
    setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length); // Regresa al inicio si llega al final
  };

  if (loading) {
    return <div className="modal-overlayOfertillas">Cargando promociones...</div>; // Mostrar indicador de carga
  }

  if (error) {
    return <div className="modal-overlayOfertillas">{error}</div>; // Mostrar mensaje de error
  }

  if (offers.length === 0) {
    return <div className="modal-overlayOfertillas">Promociones no disponibles por el momento.</div>; // Mensaje si no hay promociones
  }

  return (
    <div className="modal-overlayOfertillas">
      <div className="modal-contentOfertillas">
        <button className="close-buttonOfertillas" onClick={onClose}>×</button> {/* Botón para cerrar el modal */}
        
        {/* Mostrar solo la oferta actual */}
        {offers.length > 0 && (
          <div key={offers[currentOfferIndex].id} className="offer-cardOfertillas">
            <img src={offers[currentOfferIndex].foto} alt={offers[currentOfferIndex].titulo} />
            <div className="offer-infoOfertillas">
              <h3>{offers[currentOfferIndex].titulo}</h3>
              <p>{offers[currentOfferIndex].descripcion}</p>
              <p className="offer-end-dateOfertillas">Finaliza el: {offers[currentOfferIndex].fecha_fin}</p> {/* Mostrar la fecha de finalización */}
            </div>
          </div>
        )}

        {/* Botón "Siguiente" para cambiar entre ofertas */}
        {offers.length > 1 && (
          <button className="next-offer-buttonOfertillas" onClick={handleNextOffer}>
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default SpecialOffers;
