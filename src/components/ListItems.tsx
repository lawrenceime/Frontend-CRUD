import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../types';

interface ListItemsProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ListItems: React.FC<ListItemsProps> = ({ items, setItems }) => {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (items.length === 0) {
      fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          setItems(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [page, setItems, items]);

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
      <button onClick={() => setPage((page) => page - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage((page) => page + 1)}>Next</button>
    </div>
  );
};

export default ListItems;
