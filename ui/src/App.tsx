import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Viewpage } from './components/viewpage';
import initCornerstone from './initCornerstone';

// cornerstone tools の初期化
initCornerstone();

function Home(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          肺炎検出ビジュアライザ
        </p>
        <a
          className="App-link"
          href="/viewpage"
          rel="noopener noreferrer"
        >
          Start
        </a>
      </header>
    </div>
  );
}

const App = (): JSX.Element => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/viewpage" exact component={Viewpage} />
      </BrowserRouter>
    </div>
  );
};

export default App;
