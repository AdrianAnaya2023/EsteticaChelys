import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ViewMoreButton from '../Components/ViewMoreButton';
import '../Styles/ProductCatalog.css';

const ProductCatalog = () => {
  const [categories, setCategories] = useState([]); // Categorías obtenidas desde la API
  const [products, setProducts] = useState([]); // Productos obtenidos desde la API
  const [currentCategory, setCurrentCategory] = useState(null); // Categoría actual seleccionada
  const [currentProduct, setCurrentProduct] = useState(null); // Producto actual seleccionado para ver más
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

  // Función para obtener productos de una categoría
  const fetchProductsByCategory = async (categoryId) => {
    try {
      const productResponse = await axios.get(`http://localhost:3000/api/productos?categoria_id=${categoryId}`);
      setProducts(productResponse.data);
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  };

  // Función para obtener productos relacionados a un producto
  const fetchRelatedProductsByProduct = async (productId) => {
    try {
      const relatedProductsResponse = await axios.get(`http://localhost:3000/api/productos/${productId}/relacionados`);
      return relatedProductsResponse.data;
    } catch (error) {
      console.error('Error al obtener productos relacionados', error);
    }
  };

  const totalCategories = categories.length;
  const totalPages = Math.ceil(totalCategories / itemsPerPage);

  // Cuando se hace clic en una categoría
  const viewMoreCategory = async (category) => {
    setCurrentCategory(category);
    setCurrentProduct(null); // Restablecer el producto seleccionado
    setCurrentPage(0);
    await fetchProductsByCategory(category.id);
    productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Cuando se hace clic en un producto
  const viewMoreProduct = async (product) => {
    setCurrentProduct(product);
    const relatedProducts = await fetchRelatedProductsByProduct(product.id);
    setProducts(relatedProducts);
    setCurrentPage(0);
    productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const goBack = () => {
    if (currentProduct) {
      // Si estamos viendo un producto, retrocedemos a la lista de productos de la categoría
      setCurrentProduct(null);
    } else {
      // Si estamos viendo la lista de productos, retrocedemos a la lista de categorías
      setCurrentCategory(null);
    }
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
      {currentProduct ? (
        <div>
          <h1>Productos relacionados con {currentProduct.titulo}</h1>
          <div className="catalog-grid">
            {products
              .slice(currentPage, currentPage + itemsPerPage)
              .map(product => (
                <div key={product.id} className="catalog-card">
                  <img src={product.imagen} alt={product.titulo} />
                  <h3>{product.titulo}</h3>
                  <p>{product.descripcion}</p>
                  <ViewMoreButton onClick={() => viewMoreProduct(product)} />
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
      ) : currentCategory ? (
        <div>
          <h1>Productos de la categoría {currentCategory.nombre}</h1>
          <div className="catalog-grid">
            {products
              .slice(currentPage, currentPage + itemsPerPage)
              .map(product => (
                <div key={product.id} className="catalog-card">
                  <img src={product.imagen} alt={product.titulo} />
                  <h3>{product.titulo}</h3>
                  <p>{product.descripcion}</p>
                  <ViewMoreButton onClick={() => viewMoreProduct(product)} />
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
                  <ViewMoreButton onClick={() => viewMoreCategory(category)} />
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
