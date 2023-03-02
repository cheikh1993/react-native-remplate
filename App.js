import React from 'react';
import {AuthContextProvider} from './context/AuthContext';
import {StackNavigatioon} from './navigation/StackNavigatioon';
import {
  Provider
} from "react-redux"

import store from "./redux/redux-toolkit/store"

const App = () => {

  return (
    <Provider store={store}>
        <StackNavigatioon />
    </Provider>
  );
};

export default App;
