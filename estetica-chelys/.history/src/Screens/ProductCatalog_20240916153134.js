import React, { useState, useRef } from 'react';
import Botoncito from '../Components/Botoncito'; 
import ViewMoreButton from '../Components/ViewMoreButton'; 
import AddProductCategory from '../Screens-Admin/AddProductCategory'; // Importa la screen para agregar categorías o productos
import '../Styles/ProductCatalog.css'; 

const ProductCatalog = ({ isAdmin, openAddProductCategory }) => {
  const sampleCategories = [
    { id: 1, name: 'Cuidado de la Piel', imageUrl: 'https://www.depidel.com/wp-content/uploads/2020/07/cuidado-piel-1080x646.jpg' },
    { id: 2, name: 'Cuidado del Cabello', imageUrl: 'https://www.capilclinic.es/blog/wp-content/uploads/2022/01/cuidar-pelo-mujeres.jpg' },
    { id: 3, name: 'Cuidado de las Uñas', imageUrl: 'https://upsalacosmetic.com/wp-content/uploads/2021/12/woman-showing-her-beautiful-nails-min-scaled.jpg' }
  ];

  const sampleProducts = {
    1: [
      { id: 1, name: 'Producto Piel 1', imageUrl: 'https://m.media-amazon.com/images/I/51+MgWGnXlL._AC_UF1000,1000_QL80_.jpg', description: 'Este es un excelente producto para el cuidado de la piel, ideal para todo tipo de piel.' },
      { id: 2, name: 'Producto Piel 2', imageUrl: 'https://img.buzzfeed.com/buzzfeed-static/static/2021-07/29/2/asset/0a1b27cf756c/sub-buzz-1933-1627525536-1.jpg', description: 'Un producto hidratante que nutre tu piel y la deja suave.' }
    ]
  };

  const [categories, setCategories] = useState(sampleCategories);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const productSectionRef = useRef(null);

  const viewMore = (category) => {
    setCurrentCategory(category);
    setCurrentPage(0);
    productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const goBack = () => {
    setCurrentCategory(null);
    productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePageChange = (direction) => {
    const totalProducts = sampleProducts[currentCategory.id].length;
    const newPage = direction === 'next' ? currentPage + 4 : currentPage - 4;
    if (newPage >= 0 && newPage < totalProducts) {
      setCurrentPage(newPage);
      productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDelete = (item) => {
    console.log('Eliminar:', item);
  };

  const handleEdit = (item) => {
    console.log('Editar:', item);
  };

  return (
    <div id="product-section" className="catalog-container" ref={productSectionRef}>
      {currentCategory ? (
        <div>
          <h1>{currentCategory.name}</h1>
          <div className="catalog-grid">
            {sampleProducts[currentCategory.id]
              .slice(currentPage, currentPage + 4)
              .map(product => (
                <div key={product.id} className="catalog-card">
                  <img src={product.imageUrl} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  {isAdmin && (
                    <div className="admin-actions">
                      <button onClick={() => handleEdit(product)} className="edit-button">Modificar</button>
                      <button onClick={() => handleDelete(product)} className="delete-button">Borrar</button>
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="pagination-controls">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 0}>
              Anterior
            </button>
            <button onClick={() => handlePageChange('next')} disabled={currentPage + 4 >= sampleProducts[currentCategory.id].length}>
              Siguiente
            </button>
          </div>
          <button className="catalog-back-button" onClick={goBack}>Regresar</button>
        </div>
      ) : (
        <div>
          <h1>Categorías de Productos</h1>
          <div className="catalog-grid">
            {categories.map(category => (
              <div key={category.id} className="catalog-card">
                <img src={category.imageUrl} alt={category.name} />
                <h3>{category.name}</h3>
                <ViewMoreButton onClick={() => viewMore(category)} />
                {isAdmin && (
                  <div className="admin-actions">
                    <button onClick={() => handleEdit(category)} className="edit-button">Modificar</button>
                    <button onClick={() => handleDelete(category)} className="delete-button">Borrar</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {isAdmin && <Botoncito style={{ top: '20px', left: '10px' }} onClick={openAddProductCategory} />} {/* Usa el prop para abrir la pantalla */}
    </div>
  );
};

export default ProductCatalog;
