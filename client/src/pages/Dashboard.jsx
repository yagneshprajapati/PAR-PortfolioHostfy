import { useEffect, useState } from 'react'
import { api } from '../api'

function Form({onSave, initial={}}){
  const [title,setTitle]=useState(initial.title||'')
  const [description,setDescription]=useState(initial.description||'')
  const [isPublic,setIsPublic]=useState(initial.isPublic||true)
  function submit(e){ e.preventDefault(); onSave({ title, description, isPublic }) }
  return (
    <form onSubmit={submit} style={{maxWidth:500}}>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <label><input type="checkbox" checked={isPublic} onChange={e=>setIsPublic(e.target.checked)} /> Public</label>
      <button type="submit">Save</button>
    </form>
  )
}

export default function Dashboard(){
  const [items,setItems]=useState([])
  const [editing,setEditing]=useState(null)
  const token = localStorage.getItem('token')

  useEffect(()=>{ if(token) api('/portfolios/my',{ token }).then(r=>setItems(r||[])) },[token])

  async function create(data){
    const res = await api('/portfolios',{ method: 'POST', body: data, token })
    setItems(s=>[res,...s])
  }
  async function update(id,data){
    const res = await api('/portfolios/'+id,{ method: 'PUT', body: data, token })
    setItems(s=>s.map(i=>i._id===id?res:i))
    setEditing(null)
  }
  async function remove(id){
    await api('/portfolios/'+id,{ method: 'DELETE', token })
    setItems(s=>s.filter(i=>i._id!==id))
  }

  if(!token) return <div><p>Please login or register first.</p></div>

  return (
    <div>
      <h2>My Portfolios</h2>
      <Form onSave={create} />
      <ul>
        {items.map(i=> (
          <li key={i._id}>
            <strong>{i.title}</strong> — {i.description}
            <button onClick={()=>setEditing(i)}>Edit</button>
            <button onClick={()=>remove(i._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editing && (
        <div>
          <h3>Edit</h3>
          <Form initial={editing} onSave={(d)=>update(editing._id,d)} />
        </div>
      )}
    </div>
  )
}
