import React, { useState } from 'react';
import Botoncito from '../Components/Botoncito'; // Importa el componente Botoncito
import ViewMoreButton from '../Components/ViewMoreButton'; // Importa el botón "Ver más"
import '../Styles/ProductCatalog.css'; // Asegúrate de que el path al archivo CSS sea correcto

const ProductCatalog = ({ isAdmin }) => {
  // Muestra solo 3 categorías
  const sampleCategories = [
    { id: 1, name: 'Cuidado de la Piel', imageUrl: 'https://www.depidel.com/wp-content/uploads/2020/07/cuidado-piel-1080x646.jpg' },
    { id: 2, name: 'Cuidado del Cabello', imageUrl: 'https://www.capilclinic.es/blog/wp-content/uploads/2022/01/cuidar-pelo-mujeres.jpg' },
    { id: 3, name: 'Cuidado de las Uñas', imageUrl: 'https://upsalacosmetic.com/wp-content/uploads/2021/12/woman-showing-her-beautiful-nails-min-scaled.jpg' }
  ];

  // Muestra algunos productos para cada categoría
  const sampleProducts = {
    1: [
      { id: 1, name: 'Producto Piel 1', imageUrl: 'https://m.media-amazon.com/images/I/51+MgWGnXlL._AC_UF1000,1000_QL80_.jpg' },
      { id: 2, name: 'Producto Piel 2', imageUrl: 'https://img.buzzfeed.com/buzzfeed-static/static/2021-07/29/2/asset/0a1b27cf756c/sub-buzz-1933-1627525536-1.jpg' },
      { id: 3, name: 'Producto Piel 3', imageUrl: 'https://cdn.cnn.com/cnnnext/dam/assets/201011133852-skinlaroche-super-169.jpg' },
      { id: 4, name: 'Producto Piel 4', imageUrl: 'https://cnnespanol.cnn.com/wp-content/uploads/2021/08/garnier-skin-active.png' },
      { id: 5, name: 'Producto Piel 5', imageUrl: 'https://e00-telva.uecdn.es/assets/multimedia/imagenes/2019/07/21/15637459407505.jpg' },
      { id: 6, name: 'Producto Piel 6', imageUrl: 'https://dermabalance.com.mx/wp-content/uploads/2024/05/cuidado-de-la-piel-con-productos-avene.jpg' }
    ],
    2: [
      { id: 4, name: 'Producto Cabello 1', imageUrl: 'https://example.com/product_cabello_1.jpg' },
      { id: 5, name: 'Producto Cabello 2', imageUrl: 'https://example.com/product_cabello_2.jpg' },
      { id: 6, name: 'Producto Cabello 3', imageUrl: 'https://example.com/product_cabello_3.jpg' }
    ],
    3: [
      { id: 7, name: 'Producto Uñas 1', imageUrl: 'https://example.com/product_uñas_1.jpg' },
      { id: 8, name: 'Producto Uñas 2', imageUrl: 'https://example.com/product_uñas_2.jpg' },
      { id: 9, name: 'Producto Uñas 3', imageUrl: 'https://example.com/product_uñas_3.jpg' }
    ]
  };

  const [categories, setCategories] = useState(sampleCategories); // Estado de las categorías
  const [currentCategory, setCurrentCategory] = useState(null); // Estado para saber si se está mostrando una categoría específica
  const [currentPage, setCurrentPage] = useState(0); // Paginación para productos de la categoría

  const viewMore = (category) => {
    setCurrentCategory(category); // Al hacer clic en "Ver más", actualizamos el estado de la categoría actual
    setCurrentPage(0); // Reiniciamos la página actual
  };

  const goBack = () => {
    setCurrentCategory(null); // Regresa a la lista de categorías
  };

  const handlePageChange = (direction) => {
    const totalProducts = sampleProducts[currentCategory.id].length;
    const newPage = direction === 'next' ? currentPage + 5 : currentPage - 5;
    if (newPage >= 0 && newPage < totalProducts) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div id="products" className="product-container">
      {currentCategory ? (
        // Muestra los productos de la categoría seleccionada
        <div>
          <h1>{currentCategory.name}</h1>
          <div className="category-label">{currentCategory.name}</div> {/* Nombre de la categoría en la esquina */}
          <div className="product-grid">
            {sampleProducts[currentCategory.id]
              .slice(currentPage, currentPage + 5) // Muestra 5 productos a la vez
              .map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.imageUrl} alt={product.name} />
                  <h3>{product.name}</h3>
                </div>
              ))}
          </div>
          <div className="pagination-buttons">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 0}>
              Anterior
            </button>
            <button onClick={() => handlePageChange('next')} disabled={currentPage + 5 >= sampleProducts[currentCategory.id].length}>
              Siguiente
            </button>
          </div>
          <button className="back-button" onClick={goBack}>Regresar</button>
        </div>
      ) : (
        // Muestra las categorías
        <div>
          <h1>Categorías de Productos</h1>
          <div className="product-grid">
            {categories.map(category => (
              <div key={category.id} className="product-card">
                <img src={category.imageUrl} alt={category.name} />
                <h3>{category.name}</h3>
                <ViewMoreButton onClick={() => viewMore(category)} /> {/* Botón Ver más */}
              </div>
            ))}
          </div>
        </div>
      )}
      {isAdmin && <Botoncito style={{ top: '20px', left: '10px' }} />} {/* Posición específica para esta sección */}
    </div>
  );
};

export default ProductCatalog;
