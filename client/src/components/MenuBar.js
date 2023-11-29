import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function MenuBar() {


  return (
    <Menu className="menu-bar" size='large'>
        <Menu.Item as={Link} to='/' name='home'/>
        <Menu.Item name='Popular'/>
        <Menu.Item as={Link} to='/movies' name='Browse Movies'/>
        <Menu.Item name='stock request' as={Link} to='/stock_requests'/>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button color='yellow' as={Link} to='/login'>Login</Button>
          </Menu.Item>
          <Menu.Item>
            <Button color='blue' as={Link} to='/signup'>Sign Up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
}

export default MenuBar
