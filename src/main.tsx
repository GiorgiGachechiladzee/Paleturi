import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // <-- დარწმუნდით, რომ ასე გიწერიათ
import './index.css'; // ან თქვენი tailwind CSS ფაილის გზა

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);