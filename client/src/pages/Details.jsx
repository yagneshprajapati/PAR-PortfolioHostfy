import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api'

export default function Details(){
  const { id } = useParams()
  const [item, setItem] = useState(null)
  useEffect(()=>{ api(`/portfolios/${id}`).then(r=>setItem(r)) },[id])
  if(!item) return <div>Loading...</div>
  return (
    <div>
      <h2>{item.title}</h2>
      {item.thumbnail && <img src={item.thumbnail} style={{maxHeight:240}} alt="thumb" />}
      <p>{item.description}</p>
      <p><strong>Owner:</strong> {item.owner?.name}</p>
      <p><strong>Skills:</strong> {item.skills?.join(', ')}</p>
      <p><strong>Links:</strong> {item.links?.map((l,i)=>(<div key={i}><a href={l} target="_blank" rel="noreferrer">{l}</a></div>))}</p>
    </div>
  )
}
