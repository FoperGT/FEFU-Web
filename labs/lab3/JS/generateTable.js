document.addEventListener('DOMContentLoaded', function() {
    const clubs = [
        'Арсенал', 'Астон Вилла', 'Борнмут', 'Брайтон энд Хоув Альбион', 'Брентфорд',
        'Вест Хэм Юнайтед', 'Вулверхэмптон Уондерерс', 'Ипсвич Таун', 'Кристал Пэлас', 
        'Лестер Сити', 'Ливерпуль', 'Манчестер Сити', 'Манчестер Юнайтед', 'Ноттингем Форест', 
        'Ньюкасл Юнайтед', 'Саутгемптон', 'Тоттенхэм Хотспур', 'Фулхэм', 'Челси', 'Эвертон'
    ];

    const firstNames = [
        'Alejandro', 'Diego', 'Javier', 'Carlos', 'Rafael', 'Luis', 'Santiago', 'Mateo', 'Juan', 'Manuel',
        'William', 'James', 'Henry', 'Charles', 'Edward', 'George', 'David', 'Michael', 'Thomas', 'Joseph',
        'Liam', 'Noah', 'Ethan', 'Oliver', 'Lucas', 'Mason', 'Logan', 'Benjamin', 'Jacob', 'Alexander',
        'Hugo', 'Lorenzo', 'Diego', 'Miguel', 'Pablo', 'Sergio', 'Joaquín', 'Fernando', 'Gonzalo', 'Julián',
        'Fabio', 'Ricardo', 'Leonardo', 'Gustavo', 'Esteban', 'Cristiano', 'Rodrigo', 'Emilio', 'Jorge', 'Raul'
        ];
        
    const lastNames = [
    'García', 'Martínez', 'Rodríguez', 'López', 'Hernández', 'Pérez', 'González', 'Gómez', 'Sánchez', 'Díaz',
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Martinez', 'Lopez',
    'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Hoffmann', 'Schulz',
    'Silva', 'Santos', 'Ferreira', 'Pereira', 'Oliveira', 'Costa', 'Rodrigues', 'Gomes', 'Fernandes', 'Carvalho'
    ];

    const positions = ['Вратарь', 'Защитник', 'Полузащитник', 'Нападающий'];

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function generatePlayerStats(position) {
        let stats = {
            goals: 0,
            assists: 0,
            yellowCards: Math.floor(Math.random() * 11), 
            redCards: Math.floor(Math.random() * 3), 
            matches: 0,
            minutes: 0,
            averageRating: (6 + Math.random() * 4).toFixed(2) 
        };
    
        stats.matches = Math.min(Math.floor(Math.random() * 39), 38);
    
        stats.minutes = Math.min(Math.floor(Math.random() * (stats.matches * 90 + 1)), stats.matches * 90);
    
        if (stats.redCards > 2) {
            stats.matches = Math.max(0, stats.matches - (stats.redCards - 1));
        }
    
        switch (position) {
            case 'Вратарь':
                stats.minutes = Math.min(stats.minutes, 3420); 
                break;
            case 'Защитник':
                stats.goals = Math.floor(Math.random() * 6);
                stats.assists = Math.floor(Math.random() * 6); 
                break;
            case 'Полузащитник':
                stats.goals = Math.floor(Math.random() * 11); 
                stats.assists = Math.floor(Math.random() * 11); 
                break;
            case 'Нападающий':
                stats.goals = Math.floor(Math.random() * 21);
                stats.assists = Math.floor(Math.random() * 11);
                break;
        }
        
        return stats;
    }    

    function generatePlayers(club, numPlayers) {
        const players = [];
        for (let i = 0; i < numPlayers; i++) {
            const position = getRandomElement(positions);
            const player = {
                name: `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`,
                club: club,
                position: position,
                ...generatePlayerStats(position)
            };
            players.push(player);
        }
        return players;
    }

    const allPlayers = clubs.flatMap(club => generatePlayers(club, 25));

    const tableBody = document.querySelector('#players-table tbody');

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(player => {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = player.name;
            row.appendChild(nameCell);

            const clubCell = document.createElement('td');
            clubCell.textContent = player.club;
            row.appendChild(clubCell);

            const positionCell = document.createElement('td');
            positionCell.textContent = player.position;
            row.appendChild(positionCell);

            const goalsCell = document.createElement('td');
            goalsCell.textContent = player.goals;
            row.appendChild(goalsCell);

            const assistsCell = document.createElement('td');
            assistsCell.textContent = player.assists;
            row.appendChild(assistsCell);

            const yellowCardsCell = document.createElement('td');
            yellowCardsCell.textContent = player.yellowCards;
            row.appendChild(yellowCardsCell);

            const redCardsCell = document.createElement('td');
            redCardsCell.textContent = player.redCards;
            row.appendChild(redCardsCell);

            const matchesCell = document.createElement('td');
            matchesCell.textContent = player.matches;
            row.appendChild(matchesCell);

            const minutesCell = document.createElement('td');
            minutesCell.textContent = player.minutes;
            row.appendChild(minutesCell);

            const averageRatingCell = document.createElement('td');
            averageRatingCell.textContent = player.averageRating;
            row.appendChild(averageRatingCell);

            tableBody.appendChild(row);
        });
    }

    function sortTable(columnIndex, type, ascending) {
        const sortedData = [...allPlayers].sort((a, b) => {
            let valA = Object.values(a)[columnIndex];
            let valB = Object.values(b)[columnIndex];

            if (type === 'number') {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
                return ascending ? valA - valB : valB - valA;
            } else {
                return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
        });
        renderTable(sortedData);
    }

    document.querySelectorAll('.sort-button').forEach(button => {
        let ascending = true;
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            const type = document.querySelectorAll('th')[index].getAttribute('data-type');
            sortTable(index, type, ascending);
            ascending = !ascending; 
        });
    });

    const resetSortButton = document.getElementById('reset-sort-button');
    resetSortButton.addEventListener('click', () => {
        renderTable(allPlayers);
    });
    
    renderTable(allPlayers);
    window.allPlayers = allPlayers;     
});
