import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
axios.defaults.baseURL = 'https://ufyul8u89k.execute-api.ap-northeast-1.amazonaws.com/develop/';

const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
  ];

ReactDOM.render( <App tasks={DATA} />, document.getElementById('root'));
