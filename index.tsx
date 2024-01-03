import 'normalize.css';

import { createRoot } from 'react-dom/client';
import { App } from './App';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

const cache = createCache({
  key: 'css',
  stylisPlugins: [prefixer],
});
cache.compat = true;

const root = createRoot(document.getElementById('root'));

root.render(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>
);
