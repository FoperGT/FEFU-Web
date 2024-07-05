import React, { useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import './styles.css';

const Table = ({ data, itemsPerPage }) => {
  const [activePage, setActivePage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const maxButtons = 10;

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleFirstPageClick = () => {
    setActivePage(1);
  };

  const handleLastPageClick = () => {
    setActivePage(totalPages);
  };

  const renderPageButtons = () => {
    let startPage, endPage;
    if (totalPages <= maxButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (activePage <= Math.floor(maxButtons / 2)) {
        startPage = 1;
        endPage = maxButtons;
      } else if (activePage + Math.floor(maxButtons / 2) >= totalPages) {
        startPage = totalPages - maxButtons + 1;
        endPage = totalPages;
      } else {
        startPage = activePage - Math.floor(maxButtons / 2);
        endPage = activePage + Math.floor(maxButtons / 2);
      }
    }

    return (
      <>
        {startPage > 1 && <button onClick={handleFirstPageClick} className="nav">Первая</button>}
        {Array.from({ length: (endPage - startPage + 1) }, (_, index) => {
          const pageNumber = startPage + index;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={pageNumber === activePage ? 'active' : ''}
            >
              {pageNumber}
            </button>
          );
        })}
        {endPage < totalPages && <button onClick={handleLastPageClick} className="nav">Последняя</button>}
      </>
    );
  };

  return (
    <div className="content-wrapper">
      <h1>Статистика игроков АПЛ</h1>
      <table>
        <TableHead />
        <TableBody data={currentItems} />
      </table>
      <div className="pagination">
        {renderPageButtons()}
      </div>
    </div>
  );
};

export default Table;
