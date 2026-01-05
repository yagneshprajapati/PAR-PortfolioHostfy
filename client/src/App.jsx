import React, { useEffect, useState } from 'react'

export default function App() {
  const [list, setList] = useState([])
  useEffect(() => {
    fetch('/api/portfolios')
      .then(r => r.json())
      .then(setList)
      .catch(() => setList([]))
  }, [])
  return (
    React.createElement('div', { style: { fontFamily: 'Arial, sans-serif', padding: 20 } },
      React.createElement('h1', null, 'PortfolioHostfy'),
      React.createElement('p', null, 'A minimal starter for a portfolio hosting platform.'),
      React.createElement('h2', null, 'Recent portfolios'),
      React.createElement('ul', null, list.map(item => React.createElement('li', { key: item._id }, item.title || 'Untitled')))
    )
  )
}
