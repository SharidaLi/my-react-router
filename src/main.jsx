import React from 'react';
import ReactDOM from 'react-dom';

// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from './lib/react-router-dom';

import App from './App';
import My from './pages/my';
import About from './pages/about';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/my/:id" element={<My />}></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);
