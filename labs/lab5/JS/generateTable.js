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
        'García', 'Martínez', 'Rodríguez', 'López', 'Hernández', 'Pérez', 'González', 'Gómez', 'Sánchez', 'Díаз',
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

    function compareValues(valA, valB, order) {
        if (valA < valB) {
            return order === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    }

    function sortTable(field1, order1, field2, order2) {
        const sortedData = [...allPlayers].sort((a, b) => {
            let comparison = compareValues(a[field1], b[field1], order1);
            if (comparison === 0) {
                comparison = compareValues(a[field2], b[field2], order2);
            }
            return comparison;
        });
        renderTable(sortedData);
    }

    document.getElementById('apply-sort-button').addEventListener('click', () => {
        const firstSortField = document.getElementById('first-sort-field').value;
        const firstSortOrder = document.getElementById('first-sort-order').value;
        const secondSortField = document.getElementById('second-sort-field').value;
        const secondSortOrder = document.getElementById('second-sort-order').value;
        sortTable(firstSortField, firstSortOrder, secondSortField, secondSortOrder);
    });

    const resetSortButton = document.getElementById('reset-sort-button');
    resetSortButton.addEventListener('click', () => {
        renderTable(allPlayers);
    });
    
    renderTable(allPlayers);
    window.allPlayers = allPlayers;    
});
