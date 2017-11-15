import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';

import Index from './components/Index';
import ShopList from './components/ShopList';
import PetList from './components/PetList';
import Login from './components/Login';
import Signup from './components/Signup';
import ShopAdd from './components/ShopAdd'
import PetAdd from './components/PetAdd'

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAcZTmspc6qaVyzXeLSFKCms51mJ3FZ6Hg",
  authDomain: "the-sanctuary-c8301.firebaseapp.com",
  databaseURL: "https://the-sanctuary-c8301.firebaseio.com",
  projectId: "the-sanctuary-c8301",
  storageBucket: "the-sanctuary-c8301.appspot.com",
  messagingSenderId: "552959765168"
};

firebase.initializeApp(config);

var mainStore = createStore(reducers)

ReactDOM.render(
    <Provider store={mainStore}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/shoplist" component={ShopList}/>
                    <Route path="/petlist" component={PetList}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/shopAdd" component={ShopAdd}/>
                    <Route path="/petAdd" component={PetAdd}/>
                    <Route path="/" component={Index}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
