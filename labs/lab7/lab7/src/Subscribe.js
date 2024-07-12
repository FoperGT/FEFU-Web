import React, { useState } from 'react';
import './Subscribe.css';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Спасибо за подписку!');
  };

  return (
    <div className="Subscribe">
      <h2>Подписаться на обновления</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Введите адрес электронной почты" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit">Подписаться</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Subscribe;
