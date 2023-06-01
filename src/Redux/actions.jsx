export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  payload: id,
});

export const addTodo = (title) => ({
  type: 'ADD_TODO',
  payload: {
    id: Date.now(),
    title,
    isCompleted: false,
  },
});

export const editTodo = (id, title) => ({
  type: 'EDIT_TODO',
  payload: {
    id,
    title,
  },
});

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  payload: id,
});

export const deleteCompletedTodos = (ids) => ({
  type: 'DELETE_COMPLETED_TODOS',
  payload: ids,
});
