document.addEventListener('DOMContentLoaded', function() {
    const filterButton = document.getElementById('filter-button');
    const filterModal = document.getElementById('filter-modal');
    const closeButton = document.querySelector('.close');
    const applyFilterButton = document.getElementById('apply-filter-button');

    const clubs = [
        'Арсенал', 'Астон Вилла', 'Борнмут', 'Брайтон энд Хоув Альбион', 'Брентфорд',
        'Вест Хэм Юнайтед', 'Вулверхэмптон Уондерерс', 'Ипсвич Таун', 'Кристал Пэлас', 
        'Лестер Сити', 'Ливерпуль', 'Манчестер Сити', 'Манчестер Юнайтед', 'Ноттингем Форест', 
        'Ньюкасл Юнайтед', 'Саутгемптон', 'Тоттенхэм Хотспур', 'Фулхэм', 'Челси', 'Эвертон'
    ];

    const positions = ['Вратарь', 'Защитник', 'Полузащитник', 'Нападающий'];

    function populateSelectOptions(selectElement, options) {
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.toLowerCase();
            optionElement.textContent = option;
            selectElement.appendChild(optionElement);
        });
    }

    const clubSelect = document.getElementById('club-filter');
    const positionSelect = document.getElementById('position-filter');
    populateSelectOptions(clubSelect, clubs);
    populateSelectOptions(positionSelect, positions);

    filterButton.addEventListener('click', () => {
        filterModal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        filterModal.style.display = 'none';
    });

    window.onclick = (event) => {
        if (event.target === filterModal) {
            filterModal.style.display = 'none';
        }
    };

    function renderFilterTable(data) {
        const filterTableBody = document.createElement('tbody');

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

            filterTableBody.appendChild(row);
        });

        const modalTable = document.querySelector('#filter-modal table');
        const oldBody = modalTable.querySelector('tbody');
        if (oldBody) {
            modalTable.removeChild(oldBody);
        }
        modalTable.appendChild(filterTableBody);

        addSortButtonsToFilterTable();
    }

    function addSortButtonsToFilterTable() {
        const filterTable = document.querySelector('#filter-modal table');
        const headers = filterTable.querySelectorAll('th');

        headers.forEach(header => {
            const existingSortButton = header.querySelector('.sort-button');
            if (existingSortButton) {
                header.removeChild(existingSortButton);
            }
        });

        headers.forEach((header, index) => {
            const sortButton = document.createElement('button');
            sortButton.classList.add('sort-button');
            sortButton.dataset.index = index;
            sortButton.innerHTML = '&#8645;';
            header.appendChild(sortButton);

            let ascending = true;
            sortButton.addEventListener('click', () => {
                const type = header.getAttribute('data-type');
                sortFilteredTable(index, type, ascending);
                ascending = !ascending;
            });
        });
    }

    function sortFilteredTable(columnIndex, type, ascending) {
        const filterTable = document.querySelector('#filter-modal table');
        const filterTableBody = filterTable.querySelector('tbody');
        const rows = Array.from(filterTableBody.rows);

        rows.sort((a, b) => {
            let valA = a.cells[columnIndex].innerText;
            let valB = b.cells[columnIndex].innerText;

            if (type === 'number') {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
                return ascending ? valA - valB : valB - valA;
            } else {
                return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
        });

        rows.forEach(row => filterTableBody.appendChild(row));
    }

    applyFilterButton.addEventListener('click', () => {
        const nameFilter = document.getElementById('name-filter').value.trim().toLowerCase();
        const clubFilter = document.getElementById('club-filter').value.trim().toLowerCase();
        const positionFilter = document.getElementById('position-filter').value.trim().toLowerCase();
        const goalsMinFilter = document.getElementById('goals-min-filter').value.trim();
        const goalsMaxFilter = document.getElementById('goals-max-filter').value.trim();
        const assistsMinFilter = document.getElementById('assists-min-filter').value.trim();
        const assistsMaxFilter = document.getElementById('assists-max-filter').value.trim();
        const yellowCardsMinFilter = document.getElementById('yellow-cards-min-filter').value.trim();
        const yellowCardsMaxFilter = document.getElementById('yellow-cards-max-filter').value.trim();
        const redCardsMinFilter = document.getElementById('red-cards-min-filter').value.trim();
        const redCardsMaxFilter = document.getElementById('red-cards-max-filter').value.trim();
        const matchesMinFilter = document.getElementById('matches-min-filter').value.trim();
        const matchesMaxFilter = document.getElementById('matches-max-filter').value.trim();
        const minutesMinFilter = document.getElementById('minutes-min-filter').value.trim();
        const minutesMaxFilter = document.getElementById('minutes-max-filter').value.trim();
        const averageRatingMinFilter = document.getElementById('average-rating-min-filter').value.trim();
        const averageRatingMaxFilter = document.getElementById('average-rating-max-filter').value.trim();

        const filteredPlayers = window.allPlayers.filter(player => {
            if (nameFilter && !player.name.toLowerCase().includes(nameFilter)) {
                return false;
            }
            if (clubFilter && !player.club.toLowerCase().includes(clubFilter)) {
                return false;
            }
            if (positionFilter && !player.position.toLowerCase().includes(positionFilter)) {
                return false;
            }
            if (goalsMinFilter && player.goals < parseInt(goalsMinFilter, 10)) {
                return false;
            }
            if (goalsMaxFilter && player.goals > parseInt(goalsMaxFilter, 10)) {
                return false;
            }
            if (assistsMinFilter && player.assists < parseInt(assistsMinFilter, 10)) {
                return false;
            }
            if (assistsMaxFilter && player.assists > parseInt(assistsMaxFilter, 10)) {
                return false;
            }
            if (yellowCardsMinFilter && player.yellowCards < parseInt(yellowCardsMinFilter, 10)) {
                return false;
            }
            if (yellowCardsMaxFilter && player.yellowCards > parseInt(yellowCardsMaxFilter, 10)) {
                return false;
            }
            if (redCardsMinFilter && player.redCards < parseInt(redCardsMinFilter, 10)) {
                return false;
            }
            if (redCardsMaxFilter && player.redCards > parseInt(redCardsMaxFilter, 10)) {
                return false;
            }
            if (matchesMinFilter && player.matches < parseInt(matchesMinFilter, 10)) {
                return false;
            }
            if (matchesMaxFilter && player.matches > parseInt(matchesMaxFilter, 10)) {
                return false;
            }
            if (minutesMinFilter && player.minutes < parseFloat(minutesMinFilter, 10)) {
                return false;
            }
            if (minutesMaxFilter && player.minutes > parseFloat(minutesMaxFilter, 10)) {
                return false;
            }      
            if (averageRatingMinFilter && player.averageRating < parseFloat(averageRatingMinFilter, 10)) {
                return false;
            }
            if (averageRatingMaxFilter && player.averageRating > parseFloat(averageRatingMaxFilter, 10)) {
                return false;
            }            
            return true;
        });

        renderFilterTable(filteredPlayers);
    });

    const modalContent = document.querySelector('.modal-content');
    const filterTable = document.createElement('table');
    filterTable.innerHTML = `
        <thead>
            <tr>
                <th data-type="string">Имя</th>
                <th data-type="string">Клуб</th>
                <th data-type="string">Позиция</th>
                <th data-type="number">Голы</th>
                <th data-type="number">Ассисты</th>
                <th data-type="number">Желтые карточки</th>
                <th data-type="number">Красные карточки</th>
                <th data-type="number">Матчи</th>
                <th data-type="number">Минуты</th>
                <th data-type="number">Средний рейтинг</th>
            </tr>
        </thead>
    `;
    modalContent.appendChild(filterTable);

    addSortButtonsToFilterTable();
});
