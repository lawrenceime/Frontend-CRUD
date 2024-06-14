import React,{useEffect, useState} from 'react'
import { useParams , useNavigate , Link } from 'react-router-dom'


interface Item {
  id:number;
  title: string;
  body : string;
  userId : number;
}




const ItemDetails : React.FC = () => {
  
  const { id } = useParams<Record<string, string>>();
  const [item , setItem] = useState<Item | null>(null);

const navigate = useNavigate();

useEffect(()=>{
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    setItem(data)
    
  })
  .catch((error)=> {
    console.error('Error fetching data: ', error)
  })
}, [id])

const handleDelete = () => {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method:'DELETE',
  })
  .then(()=> {
    navigate('/')
  })
  .catch((error)=> {
    console.error('Error deleting data:', error)
  })
}
if(!item){
  return <div>Loading ...</div>;
}

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.body}</p>
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/edit/${item.id}`}><button>Edit</button></Link>
    </div>
  )
}

export default ItemDetails