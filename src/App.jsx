import React, { useState } from 'react';
import { Provider } from 'react-redux';
import  store  from './Redux/store'
import TodoList from './Components/TodoList';


const App = () => {
 

  return (
    <Provider store={store}>
          <TodoList />
    </Provider>
  );
};

export default App;
