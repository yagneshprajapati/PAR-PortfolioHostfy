import React, { useEffect, useState } from 'react'

export default function App() {
  const [list, setList] = useState([])
  const [view, setView] = useState('list')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    fetch('/api/portfolios')
      .then(r => r.json())
      .then(setList)
      .catch(() => setList([]))
  }, [])

  const register = async (e) => {
    e.preventDefault()
    await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    setView('login')
  }

  const login = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('token', data.token)
      setView('list')
    }
  }

  return (
    React.createElement('div', { style: { fontFamily: 'Arial, sans-serif', padding: 20 } },
      React.createElement('h1', null, 'PortfolioHostfy'),
      React.createElement('p', null, 'A minimal starter for a portfolio hosting platform.'),
      React.createElement('div', null,
        React.createElement('button', { onClick: () => setView('list') }, 'Home'),
        React.createElement('button', { onClick: () => setView('login'), style: { marginLeft: 8 } }, 'Login'),
        React.createElement('button', { onClick: () => setView('register'), style: { marginLeft: 8 } }, 'Register')
      ),
      view === 'list' && React.createElement(React.Fragment, null,
        React.createElement('h2', null, 'Recent portfolios'),
        React.createElement('ul', null, list.map(item => React.createElement('li', { key: item._id }, item.title || 'Untitled')))
      ),
      view === 'register' && React.createElement('form', { onSubmit: register, style: { marginTop: 12 } },
        React.createElement('div', null,
          React.createElement('label', null, 'Name'),
          React.createElement('input', { value: name, onChange: e => setName(e.target.value) })
        ),
        React.createElement('div', null,
          React.createElement('label', null, 'Email'),
          React.createElement('input', { value: email, onChange: e => setEmail(e.target.value) })
        ),
        React.createElement('div', null,
          React.createElement('label', null, 'Password'),
          React.createElement('input', { type: 'password', value: password, onChange: e => setPassword(e.target.value) })
        ),
        React.createElement('button', { type: 'submit', style: { marginTop: 8 } }, 'Register')
      ),
      view === 'login' && React.createElement('form', { onSubmit: login, style: { marginTop: 12 } },
        React.createElement('div', null,
          React.createElement('label', null, 'Email'),
          React.createElement('input', { value: email, onChange: e => setEmail(e.target.value) })
        ),
        React.createElement('div', null,
          React.createElement('label', null, 'Password'),
          React.createElement('input', { type: 'password', value: password, onChange: e => setPassword(e.target.value) })
        ),
        React.createElement('button', { type: 'submit', style: { marginTop: 8 } }, 'Login')
      )
    )
  )
}
