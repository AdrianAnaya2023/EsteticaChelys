import React, { useState, useEffect } from 'react';
import Dropdown from '../Components/Dropdown'; // Importa el componente Dropdown
import Botoncito from '../Components/Botoncito'; // Importa el componente Botoncito
import '../Styles/ProductCatalog.css'; // Asegúrate de que el path al archivo CSS sea correcto

const ProductCatalog = ({ isAdmin }) => {
  const sampleProducts = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    name: `Producto ${i + 1}`,
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWUiEIYaTzaPzJ0Feu-u4yuOzgk0BrJX7GnA&s+${i + 1}`,
    category: `Categoría ${(i % 3) + 1}`
  }));

  const [products, setProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('Selecciona una categoría');

  useEffect(() => {
    const interval = setInterval(() => {
      handlePageChange('next');
    }, 6000); // Cambio automático cada 6 segundos
    return () => clearInterval(interval);
  }, [filteredProducts]);

  const categories = ['Categoría 1', 'Categoría 2', 'Categoría 3'];

  const filterProducts = (category) => {
    setCurrentCategory(category);
    if (category === 'Selecciona una categoría') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
    setCurrentPage(0);
  };

  const handlePageChange = (direction) => {
    const newPage = direction === 'next' ? currentPage + 5 : currentPage - 5;
    if (newPage >= 0 && newPage < filteredProducts.length) {
      setCurrentPage(newPage);
    } else {
      setCurrentPage(0);
    }
  };

  return (
    <div id="products" className="product-container">
      <h1>Catálogo de Productos</h1>
      <div className="category-buttons">
        <Dropdown 
          options={['Selecciona una categoría', ...categories]}
          onChange={filterProducts}
        />
      </div>
      <div className="product-grid">
        {filteredProducts.slice(currentPage, currentPage + 5).map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
      <div className="pagination-buttons">
        <button onClick={() => handlePageChange('prev')} disabled={currentPage === 0}>Anterior</button>
        <button onClick={() => handlePageChange('next')} disabled={currentPage + 5 >= filteredProducts.length}>Siguiente</button>
      </div>
      {isAdmin && <Botoncito style={{ top: '20px', left: '10px' }} />} {/* Posición específica para esta sección */}
    </div>
  );
};

export default ProductCatalog;
