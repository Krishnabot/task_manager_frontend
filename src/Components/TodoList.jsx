import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';
import { addTodo, deleteCompletedTodos } from '../Redux/actions';
import { useState } from "react";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [newTask, setNewTask] = useState('');

  const handleDeleteCompleted = () => {
    const completedTodos = todos.filter((todo) => todo.isCompleted);
    const completedTodoIds = completedTodos.map((todo) => todo.id);
    dispatch(deleteCompletedTodos(completedTodoIds));
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
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
      {todos.length > 0 && (
        <button onClick={handleDeleteCompleted}>Delete Completed</button>
      )}
    </div>
  );
};

export default TodoList;
