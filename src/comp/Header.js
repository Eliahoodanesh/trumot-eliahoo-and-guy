import React from 'react'
import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <Header className='bg-info p-2'>
        <div className='container'>
            <Link to="/HomePage">בית</Link>
            <Link to="/About">אודות</Link>
        </div>
    </Header>
  )
}
