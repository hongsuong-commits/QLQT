import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const RouterContext = createContext(null);

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => `${window.location.pathname}${window.location.search}`);

  useEffect(() => {
    const onPop = () => setPath(`${window.location.pathname}${window.location.search}`);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    if (replace) window.history.replaceState(null, '', to);
    else window.history.pushState(null, '', to);
    setPath(to);
    const hash = to.includes('#') ? to.slice(to.indexOf('#')) : '';
    if (hash) {
      window.requestAnimationFrame(() => {
        const element = document.querySelector(hash);
        if (element) element.scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const value = useContext(RouterContext);
  if (!value) throw new Error('RouterProvider is missing.');
  return value;
}

export function Link({ href, children, className, onClick, ...rest }) {
  const { navigate, path } = useRouter();
  const active = href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`);
  return (
    <a
      href={href}
      className={className}
      aria-current={rest['aria-current'] ?? (active ? 'page' : undefined)}
      onClick={(event) => {
        if (event.defaultPrevented) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (rest.target && rest.target !== '_self') return;
        event.preventDefault();
        onClick?.(event);
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function matchPath(path, pattern) {
  const parts = path.split('?')[0].split('/').filter(Boolean);
  const expected = pattern.split('/').filter(Boolean);
  if (parts.length !== expected.length) return null;
  const params = {};
  for (let i = 0; i < expected.length; i += 1) {
    if (expected[i].startsWith(':')) params[expected[i].slice(1)] = decodeURIComponent(parts[i]);
    else if (expected[i] !== parts[i]) return null;
  }
  return params;
}
