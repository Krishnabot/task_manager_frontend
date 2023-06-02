import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleTodo, editTodo, deleteTodo } from '../Redux/actions';
import './TodoItem.css'; // Import your custom CSS file

const TodoItem = ({ id, title, isCompleted }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };

  const handleEdit = () => {
    if (editedTitle.trim() !== '') {
      dispatch(editTodo(id, editedTitle));
      setEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedTitle(title);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  const taskStyle = {
    textDecorationLine: isCompleted ? 'line-through' : 'none',
    fontStyle: isCompleted ? 'italic' : 'normal',
    fontSize: isCompleted ? '1.5rem' : '2rem',
  };

  return (
    <div className="todo-item">
      <div className={`checkbox ${isCompleted ? 'completed' : 'not-completed'}`}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
          className="toggle-checkbox"
          id={`checkbox-${id}`}
        />
        <label htmlFor={`checkbox-${id}`}>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleToggle}
            className="toggle-checkbox"
            id={`checkbox-${id}`}
          />
        </label>
      </div>
      {editing ? (
        <div className="taskitem">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-task-input"
          />
          <div className="btn-group">
            <button type="button" onClick={handleEdit} className="animated-link">Save</button>
            <button type="button" onClick={handleCancelEdit} className="animated-link">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="taskitem">
          <span style={taskStyle} className="task-title">{title}</span>
          <div className="btn-group">
            <button type="button" onClick={() => setEditing(true)} className="animated-link">Edit</button>
            <button type="button" onClick={handleDelete} className="animated-link">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

export default TodoItem;
