import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../types';

interface ListItemsProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  deletedItems : number[]
}

const ListItems: React.FC<ListItemsProps> = ({ items, setItems , deletedItems }) => {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    // Fetch data every time the page changes
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((item: Item) => !deletedItems.includes(item.id));
        setItems(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [page, setItems , deletedItems]);

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage((page) => Math.max(1, page - 1))} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage((page) => page + 1)}>Next</button>
    </div>
  );
};

export default ListItems;
