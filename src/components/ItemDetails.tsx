import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Item } from '../types';


interface ItemDetailsProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  handleDelete : (id: number) => void
}

const ItemDetails: React.FC<ItemDetailsProps> = ({items , setItems , handleDelete}) => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundItem = items.find(item => item.id === Number(id));
    console.log('The item : ' , foundItem);
    
    if (foundItem) {
      setItem(foundItem);
    } else {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setItem(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [id, items]);

  const handleLocalDelete = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        handleDelete(Number(id))
        navigate('/');
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.body}</p>
      <button onClick={handleLocalDelete}>Delete</button>
      <Link to={`/edit/${item.id}`}><button>Edit</button></Link>
    </div>
  );
};

export default ItemDetails;
