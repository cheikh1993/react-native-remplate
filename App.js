import React from 'react';
import {AuthContextProvider} from './context/AuthContext';
import {StackNavigatioon} from './navigation/StackNavigatioon';


const App = () => {

  return (
    
      <AuthContextProvider>
        <StackNavigatioon />
      </AuthContextProvider>
  );
};

export default App;
