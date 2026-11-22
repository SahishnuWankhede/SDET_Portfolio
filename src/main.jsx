import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
const SpotBugGame = lazy(() => import('./components/SpotBugGame.jsx'));
createRoot(document.getElementById('root')).render(<React.StrictMode><App /><Suspense fallback={null}><SpotBugGame /></Suspense></React.StrictMode>);
