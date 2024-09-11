import React, { useState } from 'react';
import '../EstilosAdmin/ManageQuestions.css'; // Asegúrate de que el path al archivo CSS sea correcto

const ManageQuestions = ({ onClose }) => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: '¿Cómo calificarías nuestro servicio al cliente?',
      options: ['Excelente', 'Bueno', 'Regular', 'Malo'],
    },
  ]); // Estado que contiene las preguntas

  const [newQuestionText, setNewQuestionText] = useState(''); // Nueva pregunta
  const [newOptions, setNewOptions] = useState(['']); // Opciones de la nueva pregunta
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Pregunta seleccionada del dropdown
  const [newOptionText, setNewOptionText] = useState(''); // Texto para una nueva opción
  const [isAddingQuestion, setIsAddingQuestion] = useState(true); // Para alternar entre las pantallas

  // Agregar una nueva pregunta
  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: newQuestionText,
      options: [],
    };
    setQuestions([...questions, newQuestion]);
    setNewQuestionText('');
  };

  // Agregar una nueva opción a la pregunta seleccionada
  const handleAddOptionToQuestion = () => {
    if (selectedQuestion) {
      const updatedQuestions = questions.map((q) => {
        if (q.id === selectedQuestion.id) {
          return { ...q, options: [...q.options, newOptionText] };
        }
        return q;
      });
      setQuestions(updatedQuestions);
      setNewOptionText('');
    }
  };

  // Eliminar una opción de la pregunta seleccionada
  const handleRemoveOptionFromQuestion = (optionIndex) => {
    if (selectedQuestion) {
      const updatedQuestions = questions.map((q) => {
        if (q.id === selectedQuestion.id) {
          const updatedOptions = q.options.filter((_, i) => i !== optionIndex);
          return { ...q, options: updatedOptions };
        }
        return q;
      });
      setQuestions(updatedQuestions);
    }
  };

  // Manejar el cambio en la pregunta seleccionada del dropdown
  const handleQuestionChange = (e) => {
    const questionId = parseInt(e.target.value, 10);
    const selected = questions.find((q) => q.id === questionId);
    setSelectedQuestion(selected);
  };

  return (
    <div className="manage-questions-new-container visible">
      <button onClick={onClose} className="close-button-new">X</button>
      <h2 className="title-new">Administrar Preguntas</h2>

      {/* Alternar entre agregar preguntas y administrar opciones */}
      <button onClick={() => setIsAddingQuestion(!isAddingQuestion)} className="toggle-screen-button-new">
        {isAddingQuestion ? 'Administrar Opciones' : 'Agregar Pregunta'}
      </button>

      {isAddingQuestion ? (
        <div className="add-question-new-form">
          <h3 className="title-new">Añadir Nueva Pregunta</h3>
          <input
            type="text"
            placeholder="Texto de la pregunta"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            className="input-new"
          />
          <button onClick={handleAddQuestion} className="add-question-new-button">Añadir Pregunta</button>
        </div>
      ) : (
        <div className="manage-options-new">
          {/* Dropdown para seleccionar una pregunta */}
          <label htmlFor="question-select" className="label-new">Seleccionar Pregunta:</label>
          <select id="question-select" onChange={handleQuestionChange} value={selectedQuestion?.id || ''} className="select-new">
            <option value="">-- Selecciona una pregunta --</option>
            {questions.map((question) => (
              <option key={question.id} value={question.id}>{question.text}</option>
            ))}
          </select>

          {/* Mostrar opciones de la pregunta seleccionada */}
          {selectedQuestion && (
            <div className="selected-question-new-options">
              <h3 className="title-new">Opciones de "{selectedQuestion.text}"</h3>
              <ul className="options-list-new">
                {selectedQuestion.options.map((option, idx) => (
                  <li key={idx} className="option-item-new">
                    {option} 
                    <button onClick={() => handleRemoveOptionFromQuestion(idx)} className="remove-option-new-button">Eliminar</button>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Nueva Opción"
                value={newOptionText}
                onChange={(e) => setNewOptionText(e.target.value)}
                className="input-new"
              />
              <button onClick={handleAddOptionToQuestion} className="add-option-new-button">Añadir Opción</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageQuestions;
