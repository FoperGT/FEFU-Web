import React from 'react';
import Head from './Head';
import Tagline from './TagLine';
import Button from './Button';
import Professions from './Professions';
import './Head.css';
import './TagLine.css';
import './Button.css';
import './Professions.css';

const listProf = [
  { prof: "Web-разработчиков", discr: "Создают сложные и очень сложные сайты. Продумывают, чтобы пользователям было быстро и удобно." },
  { prof: "Гейм-девелоперов", discr: "Создают видеоигры. Погружают всех нас в новые миры." },
  { prof: "AI/ML-cпециалистов", discr: "Используют в деле искусственный интеллект и машинное обучение. Фактами и прогнозами делают бизнесу хорошо." },
  { prof: "Аналитиков данных", discr: "С помощью чисел решают, куда двигаться компаниям. Помогают бизнесу получать еще больше денег." },
  { prof: "Мобильных разработчиков", discr: "Создают мобильные приложения, которые найдут тебя везде. Умещают на маленьких экранах максимальный функционал." }
];

const listImg = ["logo_dvfu.png", "logo_imct.png"];

function App() {
  return (
    <>
      <Head listImg={listImg} />
      <Tagline />
      <div className="container">
        <Button val="Хочу учиться!" />
      </div>
      <Professions title="Обучаем на:" list={listProf} />
    </>
  );
}

export default App;
