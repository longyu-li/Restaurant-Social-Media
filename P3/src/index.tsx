import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')!;
createRoot(container).render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


export const timeSince = (d: Date) => {
    const since_s = (Date.now() - d.getTime()) / 1000;
    const since_m = since_s / 60;
    const since_h = since_m / 60;
    let when;
    if (since_m < 1) {
        when = `${Math.round(since_s)} seconds ago`;
    } else if (since_h < 1) {
        when = `${Math.round(since_m)} minutes ago`;
    } else if (since_h < 24) {
        when = `${Math.round(since_h)} hours ago`;
    } else {
        when = `${Math.round(since_h / 24)} days ago`;
    }
    return when;
}