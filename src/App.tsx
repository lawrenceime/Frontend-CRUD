import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListItems from './components/ListItems';
import ItemDetails from './components/ItemDetails';
import EditItem from './components/EditItem';
import {Item} from './types'



const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<ListItems items={items} setItems={setItems} />} />
          <Route path='/item/:id' element={<ItemDetails items={items} setItems={setItems} />} />
          <Route path='/edit/:id' element={<EditItem items={items} setItems={setItems} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
