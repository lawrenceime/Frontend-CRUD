import React,{useState , useEffect} from 'react'
import {Link} from  'react-router-dom'

interface  Item {
  id : number;
  title : string;
}

const ListItems : React.FC = () => {
  const [items , setItems] = useState<Item[]>([])
  const [page , setPage] = useState<number>(1)
  

useEffect(()=> {
fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
.then((response) => response.json())
.then((data) => {
  console.log(data);
  setItems(data)
  
})
.catch((error) => {
  console.error('Error fetching data:' , error)
})
}, [page])

return (
  <div>
      <h1>Items</h1>
      <ul>
        {items.map((item)=>(
          <li key={item.id}>
            <Link to={`/item/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <button onClick={()=>setPage(page=>page-1)} disabled={page===1}>Previous</button>
      <button onClick={()=>setPage(page=>page + 1)}>Next</button>
    </div>
  )
}

export default ListItems