import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Only import React once at the top level for better tree-shaking
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element with id "root" not found.');
}

// Create the root before defining other functions to start rendering sooner
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Handle non-critical page load tasks
const handlePageLoad = (): void => {
  // Scroll to the top immediately
  window.scrollTo(0, 0);

  // Transition from the loading state to the loaded state
  requestAnimationFrame(() => {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
  });
};

// Schedule using requestIdleCallback with fallback
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(handlePageLoad);
} else {
  setTimeout(handlePageLoad, 100); // Reduced delay for faster response
}