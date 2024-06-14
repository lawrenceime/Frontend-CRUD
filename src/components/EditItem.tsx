import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Item {
  id: number;
  title : string;
  body : string;
  userId : number;
}




const EditItem: React.FC = () => {
  const { id } = useParams<Record<string, string>>();
  const [item , setItem] = useState<Item>({id:0, title:'',body:'',userId:0})
  const navigate = useNavigate();

  useEffect(()=> {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data)=> {
      setItem(data)
    })
    .catch((error)=> {
       console.error('Error fetching data' , error)
    })
  }, [id])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const {name , value} = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }))
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
    method : 'PUT',
    body: JSON.stringify(item),
    headers:{
      'Content-type':'application/json; charset=UTF-8',

    },
  })
  .then((response)=> response.json())
  .then(()=>{
    navigate(`item/${id}`);
  })
  .catch((error)=> {
    console.error('Error updating data:' , error)
  });
  }

  return (
    <div>
      <h1>Edit Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name='title' value={item.title} onChange={handleChange}/>
        </div>
        <div>
          <label>Body:</label>
          <textarea name="body" value={item.body}  onChange={handleChange}></textarea>
        </div>
        <button type='submit'>Submit</button>

      </form>
    </div>
  )
}

export default EditItem