import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';
import { addTodo, deleteCompletedTodos } from '../Redux/actions';
import './TodoList.css';

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
    <div className="todo-list">
      <div className="add-task-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          className="new-task-input"
          placeholder="What do you want to do today?"
        />
        <button type="button" onClick={handleAddTask} className="add-task-btn">Add Task</button>
      </div>
      <div className="task-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            isCompleted={todo.isCompleted}
          />
        ))}
      </div>
      {todos.length > 0 && (
        <button type="button" onClick={handleDeleteCompleted} className="delete-completed-btn">Delete Completed</button>
      )}
    </div>
  );
};

export default TodoList;
