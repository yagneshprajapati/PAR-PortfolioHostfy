import { useEffect, useState } from 'react'
import { api } from '../api'

function Form({onSave, initial={}}){
  const [title,setTitle]=useState(initial.title||'')
  const [description,setDescription]=useState(initial.description||'')
  const [isPublic,setIsPublic]=useState(initial.isPublic||true)
  const [skills,setSkills]=useState((initial.skills||[]).join(', '))
  const [links,setLinks]=useState((initial.links||[]).join(', '))
  const [thumbnail,setThumbnail]=useState(initial.thumbnail||'')

  function submit(e){
    e.preventDefault()
    onSave({ title, description, isPublic, skills: skills.split(',').map(s=>s.trim()).filter(Boolean), links: links.split(',').map(s=>s.trim()).filter(Boolean), thumbnail })
  }

  function onFile(e){
    const f = e.target.files?.[0]
    if(!f) return
    const reader = new FileReader()
    reader.onload = () => setThumbnail(reader.result)
    reader.readAsDataURL(f)
  }

  return (
    <form onSubmit={submit} style={{maxWidth:500}}>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <input placeholder="Skills (comma separated)" value={skills} onChange={e=>setSkills(e.target.value)} />
      <input placeholder="Links (comma separated)" value={links} onChange={e=>setLinks(e.target.value)} />
      <label>Thumbnail <input type="file" accept="image/*" onChange={onFile} /></label>
      {thumbnail && <div><img src={thumbnail} style={{maxHeight:80}} alt="thumb" /></div>}
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

useEffect(()=>{ api('/portfolios/featured').then(r=>{/* no-op but warms cache */}) },[])


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
