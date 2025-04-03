import React from 'react'
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client' // імпорт з 'react-dom/client'
import './index.css'
import App from './App'
// import reportWebVitals from './reportWebVitals'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById('root')) // створення кореня
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// reportWebVitals()
