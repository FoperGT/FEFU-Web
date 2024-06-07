document.addEventListener('DOMContentLoaded', function() {
    const filterButton = document.getElementById('filter-button');
    const filterModal = document.getElementById('filter-modal');
    const closeButton = document.querySelector('.close');
    const applyFilterButton = document.getElementById('apply-filter-button');

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
    }

    applyFilterButton.addEventListener('click', () => {
        const nameFilter = document.getElementById('name-filter').value.trim().toLowerCase();
        const clubFilter = document.getElementById('club-filter').value.trim().toLowerCase();
        const goalsMinFilter = document.getElementById('goals-min-filter').value.trim();
        const goalsMaxFilter = document.getElementById('goals-max-filter').value.trim();

        const filteredPlayers = window.allPlayers.filter(player => {
            if (nameFilter && !player.name.toLowerCase().includes(nameFilter)) {
                return false;
            }
            if (clubFilter && !player.club.toLowerCase().includes(clubFilter)) {
                return false;
            }
            if (goalsMinFilter && player.goals < parseInt(goalsMinFilter, 10)) {
                return false;
            }
            if (goalsMaxFilter && player.goals > parseInt(goalsMaxFilter, 10)) {
                return false;
            }
            return true;
        });

        renderFilterTable(filteredPlayers);
    });

    // Создание таблицы внутри модального окна при загрузке страницы
    const modalContent = document.querySelector('.modal-content');
    const filterTable = document.createElement('table');
    filterTable.innerHTML = `
        <thead>
            <tr>
                <th>Имя</th>
                <th>Клуб</th>
                <th>Позиция</th>
                <th>Голы</th>
                <th>Ассисты</th>
                <th>Желтые карточки</th>
                <th>Красные карточки</th>
                <th>Матчи</th>
                <th>Минуты</th>
                <th>Средний рейтинг</th>
            </tr>
        </thead>
    `;
    modalContent.appendChild(filterTable);
});
