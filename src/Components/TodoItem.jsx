import React, { useState } from 'react';
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
          <button onClick={handleEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <span>{title}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
