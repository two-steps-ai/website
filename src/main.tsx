import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Handle non-critical page load tasks
function handlePageLoad(): void {
  // Scroll to the top immediately
  window.scrollTo(0, 0);

  // Ensure the body starts at the top
  document.body.style.top = '0';

  // Transition from the loading state to the loaded state
  requestAnimationFrame(() => {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
  });
}

// Schedule handlePageLoad using requestIdleCallback if available, else fallback to setTimeout
function scheduleHandlePageLoad(): void {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(handlePageLoad);
  } else {
    setTimeout(handlePageLoad, 200);
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element with id "root" not found. Please ensure the element exists in your HTML.');
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Schedule non-essential tasks for when the browser is idle
scheduleHandlePageLoad();
