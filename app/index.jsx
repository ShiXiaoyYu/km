import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux'
import { createStore } from 'redux';
import { Component } from 'react';
import { Router, Route, Link } from 'react-router'
import { hashHistory } from 'react-router';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { IndexRoute } from 'react-router';
import $ from  'jquery';
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
require('!style!css!./main.css');
require('!style!css!./reset.css');

import SignUI from './container/SignUI.jsx';
import MainIndex from './container/MainIndex.jsx'

let getHide = true;
function hideOrShow(){
    if (getHide) {
        getHide = false;
        console.log('1');
        return {isHide: true};
    } else {
        getHide = true;
        console.log('2');
        return {isHide: false};
    }
}
const handleSign = (state = {isHide:false}, action)=> {
    switch (action.type) {
        case  'LOGIN':
            console.log('触发');
      //      return {isHide:true};//触发登录按钮显示
        return  hideOrShow();
        default:
            return state;
    }
};

const kmApp = combineReducers({handleSign});
class App extends Component {
    constructor() {
        super();
    }
    componentDidMount(){
    }
    render() {
        return (
            <div>
                <SignUI/>
                <MainIndex/>
            </div>
        )
    }
}

//App = connect(state =>state)(App);
//const store = createStore(todoApp);
const createStoreWithMiddleware = applyMiddleware(
    thunk// 允许我们 dispatch() 函数
)(createStore);
//applyMiddleware 是允许 返回一个函数
const store = createStoreWithMiddleware(kmApp);
const app = document.createElement('div');
document.body.appendChild(app);
const render = ()=> {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={SignUI}/>
                    </Route>
                <Route path="/mianindex" component={MainIndex}/>
            </Router>
        </Provider>
        , app);

};
render();// ReactDOM.render( <Route  store = {createStore(todoApp)} history={history}  />, app);   // ReactDOM.render(<App store = {createStore(todoApp)} />, app);
