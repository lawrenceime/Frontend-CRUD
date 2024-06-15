import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListItems from './components/ListItems';
import ItemDetails from './components/ItemDetails';
import EditItem from './components/EditItem';
import {Item} from './types'



const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [deletedItems , setDeletedItems] = useState<number[]>([])

  const handleDelete = (id: number) => {
    setDeletedItems(prev => [...prev , id]);
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<ListItems items={items} setItems={setItems} deletedItems={deletedItems} />} />
          <Route path='/item/:id' element={<ItemDetails items={items} setItems={setItems} handleDelete={handleDelete} />} />
          <Route path='/edit/:id' element={<EditItem items={items} setItems={setItems} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
