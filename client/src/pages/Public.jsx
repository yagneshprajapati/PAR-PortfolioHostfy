import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Public(){
  const [items,setItems]=useState([])
  const [q,setQ]=useState('')
  useEffect(()=>{ api('/portfolios').then(r=>setItems(r||[])) },[])
  async function search(e){
    e.preventDefault()
    const res = await api('/portfolios/search?q='+encodeURIComponent(q))
    setItems(res||[])
  }
  return (
    <div>
      <h2>Public Portfolios</h2>
      <form onSubmit={search} style={{marginBottom:12}}>
        <input placeholder="Search by title, description, skill" value={q} onChange={e=>setQ(e.target.value)} />
        <button>Search</button>
      </form>
      <ul>
        {items.map(i=> (
          <li key={i._id} style={{marginBottom:12}}>
            {i.thumbnail && <img src={i.thumbnail} style={{height:60,marginRight:8}} alt="thumb" />}
            <a href={`/portfolio/${i._id}`}><strong>{i.title}</strong></a> — {i.description} <em>by {i.owner?.name}</em>
            <div>Skills: {i.skills?.join(', ')}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
