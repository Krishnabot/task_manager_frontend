const initialState = {
  todos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo)),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'DELETE_COMPLETED_TODOS':
      return {
        ...state,
        todos: state.todos.filter((todo) => !action.payload.includes(todo.id)),
      };
    default:
      return state;
  }
};

export default reducer;
