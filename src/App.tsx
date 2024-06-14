import React from 'react';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import ListItems from './components/ListItems';
import ItemDetails from './components/ItemDetails';
import EditItem from './components/EditItem';




function App() {
  return (
   <Router>
    <div>
      <Routes>
        <Route path='/' element={<ListItems/>}/>
        <Route path='/item/:id' element={<ItemDetails/>}/>
        <Route path='/edit/:id' element={<EditItem/>}/>
      </Routes>
    </div>
   </Router>
  );
}

export default App;
