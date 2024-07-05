import React from 'react';
import TableRow from './TableRow';

const TableBody = ({ data }) => {
  return (
    <tbody>
      {data.map((player, index) => (
        <TableRow key={index} data={player} />
      ))}
    </tbody>
  );
};

export default TableBody;
