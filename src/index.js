import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from '../src/common/header/Header';
import Login from '../src/screen/login/Login';
ReactDOM.render(
    <span>
        <Header/>
        <Login/>
    </span>, 
    document.getElementById('root')
);
