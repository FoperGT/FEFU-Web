import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Что такое фэнтези-драфт?",
      answer: "Фэнтези-драфт — игра, в которой вы собираете команду игроков английской Премьер-лиги и соревнуетесь с другими игроками."
    },
    {
      question: "Как мне присоединиться?",
      answer: "Вы можете присоединиться, зарегистрировавшись на нашем сайте и создав свою команду."
    },
    {
      question: "Когда начнется проект?",
      answer: "Драфт стартует 16 августа 2024 г.."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="FAQ">
      <h2>Часто задаваемые вопросы</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`} 
            onClick={() => toggleFAQ(index)}
          >
            <div className="question">{faq.question}</div>
            {activeIndex === index && <div className="answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
