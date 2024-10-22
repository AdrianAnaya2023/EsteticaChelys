import React, { useState, useEffect, useRef } from 'react';
import ViewMoreButton from '../Components/ViewMoreButton';
import '../Styles/ProductCatalog.css';
import { fetchCategoriasProductos } from '../Screens-Admin/categoriaProductosAPI';
import { fetchProductosPorCategoria } from '../Screens-Admin/productosAPI'; // Importamos la nueva función para obtener productos por categoría

const ProductCatalog = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [itemsPerPage] = useState(3); // Controla cuántos productos mostrar por página
  const productSectionRef = useRef(null);

  // Cargar las categorías cuando el componente se monta
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoriasProductos(); // Cargar las categorías desde la API
        setCategories(data);
      } catch (error) {
        console.error('Error al cargar categorías', error);
      }
    };

    loadCategories();
  }, []);

  // Función para cargar productos de una categoría seleccionada
  const viewMore = async (category) => {
    try {
      const data = await fetchProductosPorCategoria(category.id); // Obtener productos por categoría
      
      // Verificar si la categoría tiene productos asociados
      if (!data || data.length === 0) {
        console.log('Esta categoría no tiene productos.');
        return;
      }

      setCurrentCategory(category);
      setProducts(data);
      setCurrentPage(0); // Reiniciar la paginación al seleccionar una categoría
      productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error al cargar productos por categoría', error);
    }
  };

  const goBack = () => {
    setCurrentCategory(null);
    setProducts([]);
    productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryPageChange = (direction) => {
    const totalPages = Math.ceil(categories.length / itemsPerPage);
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductPageChange = (direction) => {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage >= 0 && newPage < totalPages) {
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
              .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map((product) => (
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
            <button onClick={() => handleProductPageChange('next')} disabled={currentPage * itemsPerPage + itemsPerPage >= products.length}>
              Siguiente
            </button>
          </div>
          <button className="catalog-back-button" onClick={goBack}>
            Regresar
          </button>
        </div>
      ) : (
        <div>
          <h1>Categorías de Productos</h1>
          <div className="catalog-grid">
            {categories
              .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map((category) => (
                <div key={category.id} className="catalog-card">
                  <img src={category.imagen} alt={category.nombre} />
                  <h3>{category.nombre}</h3>
                  <p>{category.descripcion}</p>
                  <ViewMoreButton onClick={() => viewMore(category)} />
                </div>
              ))}
          </div>
          <div className="pagination-controls">
            <button onClick={() => handleCategoryPageChange('prev')} disabled={currentPage === 0}>
              Anterior
            </button>
            <button onClick={() => handleCategoryPageChange('next')} disabled={currentPage * itemsPerPage + itemsPerPage >= categories.length}>
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
