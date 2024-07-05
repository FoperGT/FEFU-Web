import React from 'react';

const listProf = [
    { prof: "Web-разработчиков", discr: "Создают сложные и очень сложные сайты. Продумывают, чтобы пользователям было быстро и удобно." },
    { prof: "Гейм-девелоперов", discr: "Создают видеоигры. Погружают всех нас в новые миры." },
    { prof: "AI/ML-cпециалистов", discr: "Используют в деле искусственный интеллект и машинное обучение. Фактами и прогнозами делают бизнесу хорошо." },
    { prof: "Аналитиков данных", discr: "С помощью чисел решают, куда двигаться компаниям. Помогают бизнесу получать еще больше денег." },
    { prof: "Мобильных разработчиков", discr: "Создают мобильные приложения, которые найдут тебя везде. Умещают на маленьких экранах максимальный функционал." }
];

function ProfItem(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
      <li onClick={toggle}>
        <span className="left">{props.prof}</span>
        <span className="right">{isOpen ? ' x' : ' +'}</span>
        {isOpen && <p>{props.discr}</p>}
      </li>
    );
}

function Professions(props) {
    const listItems = props.list.map((item, index) => <ProfItem key={index} prof={item.prof} discr={item.discr} />);
    return (
      <div className="prof">
        <h2>{props.title}</h2>
        <ul>{listItems}</ul>
      </div>
    );
}

export default Professions;
