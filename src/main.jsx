import React, { lazy, Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
const SpotBugGame = lazy(() => import('./components/SpotBugGame.jsx'));
function PositionedGame(){useEffect(()=>{const moveGame=()=>{const game=document.querySelector('.spot-bug-root');const contact=document.querySelector('#contact');if(game&&contact&&game.parentElement!==contact.parentElement){contact.parentElement.insertBefore(game,contact);return true}return false};const timer=window.setInterval(()=>{if(moveGame())window.clearInterval(timer)},50);return()=>window.clearInterval(timer)},[]);return <Suspense fallback={null}><SpotBugGame /></Suspense>}
createRoot(document.getElementById('root')).render(<React.StrictMode><App /><PositionedGame /></React.StrictMode>);
