import React from 'react';

const TableRow = ({ data }) => {
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.club}</td>
      <td>{data.position}</td>
      <td>{data.goals}</td>
      <td>{data.assists}</td>
      <td>{data.yellowCards}</td>
      <td>{data.redCards}</td>
      <td>{data.matches}</td>
      <td>{data.minutes}</td>
      <td>{data.averageRating}</td>
    </tr>
  );
};

export default TableRow;
