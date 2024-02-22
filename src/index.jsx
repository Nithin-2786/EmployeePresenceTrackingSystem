import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// Replace ReactDOM.render with createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app using createRoot
root.render(<App />);