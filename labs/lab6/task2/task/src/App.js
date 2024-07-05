import React from 'react';
import Table from './Table';
import data from './data'; 
import './styles.css';

const App = () => {
  return (
    <div>
      <Table data={data} itemsPerPage={10} />
    </div>
  );
};

export default App;
