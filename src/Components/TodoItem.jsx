import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleTodo, editTodo, deleteTodo } from '../Redux/actions';

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
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggle}
      />
      {editing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button type="button" onClick={handleEdit}>Save</button>
          <button type="button" onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <span style={taskStyle}>{title}</span>
          <button type="button" onClick={() => setEditing(true)}>Edit</button>
          <button type="button" onClick={handleDelete}>Delete</button>
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
