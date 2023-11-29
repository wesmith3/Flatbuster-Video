import React from 'react'
import { Button, Advertisement } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='page-header'>
      <img className="logo" src="././Logo.png" alt="Logo"></img>
      <Button className='shopping-cart' icon='cart' color='yellow' size='huge' as={Link}to='/my_cart'></Button>
    </div>
  )
}

export default Header
