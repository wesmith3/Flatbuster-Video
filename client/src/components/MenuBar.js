import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

function MenuBar() {
  return (
    <Menu className="menu-bar" size='tiny'>
        <Menu.Item
          name='home'
        />
        <Menu.Item
          name='Popular'
        />
        <Menu.Item
          name='Browse Movies'
        />
        <Menu.Item
          name='Browse TV Shows'
        />
        <Menu.Item
          name='browse games'
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button primary>Login</Button>
          </Menu.Item>
          <Menu.Item>
            <Button secondary>Sign Up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
}

export default MenuBar
