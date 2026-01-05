import { useEffect, useState } from 'react'
import { api } from '../api'
import { Link } from 'react-router-dom'

export default function Home(){
  const [featured, setFeatured] = useState([])
  useEffect(()=>{ api('/portfolios/featured').then(r=>setFeatured(r||[])) },[])
  return (
    <div>
      <h2>Featured Portfolios</h2>
      <ul>
        {featured.map(p=> (
          <li key={p._id} style={{marginBottom:12}}>
            {p.thumbnail && <img src={p.thumbnail} style={{height:80,marginRight:8}} alt="thumb" />}
            <Link to={`/portfolio/${p._id}`}><strong>{p.title}</strong></Link> — {p.description} <em>by {p.owner?.name}</em>
            <div>Skills: {p.skills?.join(', ')}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
