import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

function MenuBar() {


  return (
    <Menu className="menu-bar" size='large'>
        <Menu.Item name='home'/>
        <Menu.Item name='Popular'/>
        <Menu.Item name='Browse Movies'/>
        {/* <Menu.Item name='Browse games'/> */}
        <Menu.Item name='stock request'/>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button color='yellow'>Login</Button>
          </Menu.Item>
          <Menu.Item>
            <Button primary>Sign Up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
}

export default MenuBar
