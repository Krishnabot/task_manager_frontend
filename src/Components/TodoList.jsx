import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';
import { addTodo, deleteCompletedTodos } from '../Redux/actions';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [newTask, setNewTask] = useState('');

  const handleDeleteCompleted = () => {
    const completedTodos = todos.reduce(
      (ids, todo) => (todo.isCompleted ? [...ids, todo.id] : ids), [],
    );
    dispatch(deleteCompletedTodos(completedTodos));
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      dispatch(addTodo(newTask));
      setNewTask('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { // Enter key code
      handleAddTask();
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={handleAddTask}>Add Task</button>
      </div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          isCompleted={todo.isCompleted}
        />
      ))}
      {todos.length > 0 && (
        <button type="button" onClick={handleDeleteCompleted}>Delete Completed</button>
      )}
    </div>
  );
};

export default TodoList;
