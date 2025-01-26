import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Check } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Load todos from local storage on initial render
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(savedTodos);
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    setTodos(todos.map(todo => 
      todo.id === editingId ? { ...todo, text: editText } : todo
    ));
    setEditingId(null);
  };

  return (
    <div className="max-w-[520px] mt-10 m-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Gopal's Todo List</h1>
      
      <div className="flex mb-4">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new todo"
          className="flex-grow p-2 border rounded-l-lg"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button 
          onClick={addTodo} 
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          <Plus />
        </button>
      </div>

      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            className="flex items-center justify-between p-2 border-b"
          >
            {editingId === todo.id ? (
              <div className="flex-grow flex">
                <input 
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-grow p-1 border rounded mr-2"
                />
                <button 
                  onClick={saveEdit} 
                  className="text-green-500"
                >
                  <Check />
                </button>
              </div>
            ) : (
              <>
                <span 
                  onClick={() => toggleComplete(todo.id)}
                  className={`flex-grow cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {todo.text}
                </span>
                <div className="flex items-center">
                  <button 
                    onClick={() => startEditing(todo)} 
                    className="mr-2 text-blue-500 border-none"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => deleteTodo(todo.id)} 
                    className="text-red-500 border-none"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
