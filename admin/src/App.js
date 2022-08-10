import React from 'react';

// Redux
import {Provider} from 'react-redux';
import mainStore from './store/mainStore';

// App Sub Root
import AppTheme from './AppTheme';

// Custom Styles
import './App.css';

const App = () => {
  return (
    <Provider store={mainStore}>
      <AppTheme />
    </Provider>
  );
};

export default App;
