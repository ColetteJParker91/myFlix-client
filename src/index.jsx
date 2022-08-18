import React from 'react';
import { Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { createstore } from "redux";
import { Provider } from "react-redux";
import { devToolsEnhancer } from 'redux-devtools-extension'; 
import moviesApp from "./reducers/reducers";


import {MainView} from './components/main-view/main-view.jsx';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render(){
    return (
      <Provider store={store}>
      <Container>
       <MainView/>;
      </Container>
     </Provider>);
}
}

const container = document.getElementsByClassName('app-container')[0];


ReactDOM.render(React.createElement(MyFlixApplication), container);
