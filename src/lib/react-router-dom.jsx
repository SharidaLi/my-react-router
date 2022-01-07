import { createBrowserHistory, createHashHistory } from 'history';
import { Router, Routes, Route } from './react-router';
import React, { useLayoutEffect, useRef, useState } from 'react';

export { Routes, Route };

export function HashRouter({ children }) {
  const historyRef = useRef(null);
  if (historyRef.current === null) {
    historyRef.current = createHashHistory();
  }
  const history = historyRef.current;
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  // useLayoutEffect 会在浏览器渲染页面前执行
  useLayoutEffect(() => {
    // 如果路径发生改变，会重新渲染组件
    history.listen(setState);
  }, [history]);

  return (
    <Router location={state.location} navigatorType={state.action} navigator={history} children={children} />
    // <Router location={state.location} navigatorType={state.action} navigator={history}>
    //   {children}
    // </Router>
  );
}

export function BrowserRouter({ children }) {
  const historyRef = useRef(null);
  if (historyRef.current === null) {
    historyRef.current = createBrowserHistory();
  }
  const history = historyRef.current;
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    // 如果路径发生改变，会重新渲染组件
    history.listen(setState);
  }, [history]);

  return <Router location={state.location} navigatorType={state.action} navigator={history} children={children} />;
}
