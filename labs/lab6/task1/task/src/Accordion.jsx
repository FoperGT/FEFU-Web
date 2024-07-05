import React, { useState } from 'react';
import './styles.css';

const Accordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div>
      {data.map((item, index) => {
        const title = Object.keys(item)[0];
        const text = item[title];
        const isActive = index === activeIndex;

        return (
          <div key={index} className="accordion-item">
            <div
              onClick={() => handleClick(index)}
              className={`accordion-header ${isActive ? 'active' : ''}`}
            >
              {title}
            </div>
            <div className={`accordion-content ${isActive ? '' : 'hidden'}`}>
              {text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
