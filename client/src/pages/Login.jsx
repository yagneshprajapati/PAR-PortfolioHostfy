import { useState } from 'react'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()
  async function submit(e){
    e.preventDefault()
    const res = await api('/auth/login',{ method: 'POST', body: { email, password } })
    if(res.token){ localStorage.setItem('token', res.token); navigate('/dashboard') } else alert(res.message||'Error')
  }
  return (
    <form onSubmit={submit} style={{maxWidth:400}}>
      <h2>Login</h2>
      <input required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input required placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}
