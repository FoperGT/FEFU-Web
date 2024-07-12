import React from 'react';
import Header from './Header';
import Main from './Main';
import Countdown from './Countdown';
import Subscribe from './Subscribe';
import Footer from './Footer';
import FAQ from './FAQ'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Countdown />
      <Subscribe />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
