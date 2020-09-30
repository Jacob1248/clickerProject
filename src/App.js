import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from './Nav/NavBar';
import { ProductPage } from './ProductPage/ProductPage';
import { DashPage } from './DashPage/DashPage';

function App() {


  const handleClick = (e) =>{
    console.log(e.type,e.target)
  }

useEffect(
    ()=>{
        
        function f(){
        }

        f();
    },[]
)
  
  return (
    <div className="App">
      <header className="App-header">

      <link rel="preconnect"
      href="https://fonts.googleapis.com"
      crossOrigin />
      <link rel="preload"
      as="style"
      href="https://fonts.googleapis.com/css?family=Montserrat:400,900,600&display=swap" />
      <link rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Montserrat:400,900,600&display=swap"
      />

      <link rel="preconnect"
      href="https://cdnjs.cloudflare.com"
      crossOrigin />
      <link rel="preload"
      as="style"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      </header>
      <body>
          <NavBar isDesktop={true}></NavBar>
          <Switch>
            <Route exact path='/' component={ProductPage}>
            </Route>
            <Route exact path='/Admin' component={DashPage}>
            </Route>
        </Switch>
      </body>
    </div>
  );
}

export default App;
