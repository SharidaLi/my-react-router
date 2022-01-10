import React, { createContext } from 'react';
const NavigatorContext = createContext();
const LocationContext = createContext();
const RouteContext = createContext();

export function Router({ children, location, navigator }) {
  const navigationContext = { navigator };
  return (
    <NavigatorContext.Provider value={navigationContext}>
      <LocationContext.Provider value={{ location }}>{children}</LocationContext.Provider>
    </NavigatorContext.Provider>
  );
}

export function Route() {}

export function Routes({ children }) {
  return useRoutes(createRoutesFromChildren(children));
}

function createRoutesFromChildren(children) {
  return React.Children.map(children, (child) => {
    return {
      path: child.props.path, // 要匹配的路径
      element: child.props.element, // 渲染的组件
    };
  });
}

/**
 * 将路径转正则
 */
function compilePath(path) {
  const paramNames = [];
  let regexpSource =
    '^' +
    path.replace(/:(\w+)/g, (_, paramName) => {
      paramNames.push(paramName);
      return '([^\\/]+)';
    }) +
    '$';
  const matcher = new RegExp(regexpSource);
  return [matcher, paramNames];
}

/**
 * 匹配路径
 */
function matchPath(path, pathname) {
  const [compiler] = compilePath(path);
  return pathname.match(compiler);
}

function useLocation() {
  return React.useContext(LocationContext).location;
}

function useRoutes(routes) {
  const location = useLocation();
  const pathname = location.pathname || '/';

  for (let index = 0; index < routes.length; index++) {
    const { path, element } = routes[index];

    const match = matchPath(path, pathname);
    if (match) {
      return element;
    }
  }
  return null;
}
