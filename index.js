import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import NotesStore from './src/stores/NotesStore';
import { Provider } from 'mobx-react';

const RootApp = () => (
  <Provider noteStore={NotesStore}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RootApp);
