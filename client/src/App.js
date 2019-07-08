import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';

import AppNavBar from './components/AppNavBar';
import TodoList from './components/TodoList';
import ItemModal from './components/ItemModal';
import Welcome from './components/Welcome';

import store from './store';

import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';

class App extends Component {
  componentDidMount () {
    store.dispatch(loadUser());
  }

  render () {
    return <Provider store={store}>
    <div className="App">
      <AppNavBar />
      <Container>
        <Welcome />
        <ItemModal />
        <TodoList />
      </Container>
    </div>
  </Provider>;
  }
}

export default App;
