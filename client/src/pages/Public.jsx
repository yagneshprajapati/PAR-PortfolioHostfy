import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Public(){
  const [items,setItems]=useState([])
  useEffect(()=>{ api('/portfolios').then(r=>setItems(r||[])) },[])
  return (
    <div>
      <h2>Public Portfolios</h2>
      <ul>
        {items.map(i=> (
          <li key={i._id}><strong>{i.title}</strong> — {i.description} <em>by {i.owner?.name}</em></li>
        ))}
      </ul>
    </div>
  )
}
