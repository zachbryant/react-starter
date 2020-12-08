import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@components/App';
import '@assets/tailwind.scss';

ReactDOM.render(
    <div
        className="flex items-center"
        style={{ backgroundColor: '#48bb78', height: '100vh' }}
    >
        <App />
    </div>,
    document.getElementById('root'),
);
