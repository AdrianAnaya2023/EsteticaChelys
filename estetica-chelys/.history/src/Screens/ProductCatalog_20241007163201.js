import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ViewMoreButton from '../Components/ViewMoreButton';
import '../Styles/ProductCatalog.css';

const ProductCatalog = () => {
  const [categories, setCategories] = useState([]); // Datos reales de categorías
  const [products, setProducts] = useState([]); // Datos reales de productos
  const [currentCategory, setCurrentCategory] = useState(null); // Categoría seleccionada
  const [currentPage, setCurrentPage] = useState(0); // Página actual para la paginación
  const [itemsPerPage] = useState(3); // Controlar cuántas categorías/productos mostrar por página
  const productSectionRef = useRef(null);

  useEffect(() => {
    // Fetch de categorías al montar el componente
    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get('http://localhost:3000/api/categorias-productos');
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error('Error al obtener las categorías', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const productResponse = await axios.get(`http://localhost:3000/api/productos?categoria_id=${categoryId}`);
      setProducts(productResponse.data);
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  };

  const totalCategories = categories.length;
  const totalPages = Math.ceil(totalCategories / itemsPerPage);

  const viewMore = async (category) => {
    setCurrentCategory(category);
    setCurrentPage(0);
    await fetchProductsByCategory(category.id);
    productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const goBack = () => {
    setCurrentCategory(null);
    productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryPageChange = (direction) => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductPageChange = (direction) => {
    const totalProducts = products.length;
    const newPage = direction === 'next' ? currentPage + itemsPerPage : currentPage - itemsPerPage;
    if (newPage >= 0 && newPage < totalProducts) {
      setCurrentPage(newPage);
      productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="product-section" className="catalog-container" ref={productSectionRef}>
      {currentCategory ? (
        <div>
          <h1>{currentCategory.nombre}</h1>
          <div className="catalog-grid">
            {products
              .slice(currentPage, currentPage + itemsPerPage)
              .map(product => (
                <div key={product.id} className="catalog-card">
                  <img src={product.imagen} alt={product.titulo} />
                  <h3>{product.titulo}</h3>
                  <p>{product.descripcion}</p>
                </div>
              ))}
          </div>
          <div className="pagination-controls">
            <button onClick={() => handleProductPageChange('prev')} disabled={currentPage === 0}>
              Anterior
            </button>
            <button onClick={() => handleProductPageChange('next')} disabled={currentPage + itemsPerPage >= products.length}>
              Siguiente
            </button>
          </div>
          <button className="catalog-back-button" onClick={goBack}>Regresar</button>
        </div>
      ) : (
        <div>
          <h1>Categorías de Productos</h1>
          <div className="catalog-grid">
            {categories
              .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map(category => (
                <div key={category.id} className="catalog-card">
                  <img src={category.imagen} alt={category.nombre} />
                  <h3>{category.nombre}</h3>
                  <ViewMoreButton onClick={() => viewMore(category)} />
                </div>
              ))}
          </div>
          <div className="pagination-controls">
            <button onClick={() => handleCategoryPageChange('prev')} disabled={currentPage === 0}>
              Anterior
            </button>
            <button onClick={() => handleCategoryPageChange('next')} disabled={currentPage + 1 >= totalPages}>
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
