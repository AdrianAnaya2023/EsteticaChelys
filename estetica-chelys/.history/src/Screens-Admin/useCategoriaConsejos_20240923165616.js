// useCategoriaConsejos.js
import { useState } from 'react';

const BASE_URL = 'http://localhost:3000/api/categorias-consejos'; // Asegúrate de que la URL corresponda a la configurada en tu backend

function useCategoriaConsejos() {
    const [error, setError] = useState(null);
    
    // Función para obtener todas las categorías de consejos
    const getCategorias = async () => {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (err) {
            setError(err.message);
            return [];
        }
    };

    // Función para obtener una categoría por ID
    const getCategoriaById = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    // Función para crear una nueva categoría
    const createCategoria = async (categoriaData) => {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoriaData)
            });
            if (!response.ok) throw new Error('Failed to create new category');
            return await response.json();
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    // Función para actualizar una categoría
    const updateCategoria = async (id, categoriaData) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoriaData)
            });
            if (!response.ok) throw new Error('Failed to update category');
            return await response.json();
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    // Función para eliminar una categoría
    const deleteCategoria = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete category');
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    return {
        getCategorias,
        getCategoriaById,
        createCategoria,
        updateCategoria,
        deleteCategoria,
        error
    };
}

export default useCategoriaConsejos;
