import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

let posts = [
  {id: 1, post: 'Hi, how are you?', likesCount: '15'},
  {id: 2, post: 'It\'s my first post', likesCount: '18'}
]

let dialogsData = [
  { id: 1, name: 'Dimych' },
  { id: 2, name: 'Andrey' },
  { id: 3, name: 'Sveta' },
  { id: 4, name: 'Sasha' },
  { id: 5, name: 'Victor' },
  { id: 6, name: 'Anton' }
]

let messagesData = [
  { id: 1, message: 'Hi!' },
  { id: 2, message: 'What is your Name?' },
  { id: 3, message: 'Where are you?' },
  { id: 4, message: 'Oups!?' },
  { id: 5, message: 'Yo' },
  { id: 6, message: 'Hello world!' }
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App posts={posts} dialogs={dialogsData} messages={messagesData}/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
