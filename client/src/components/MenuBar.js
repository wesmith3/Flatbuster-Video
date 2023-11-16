import React from 'react'
import { Menu, Dropdown, Button } from 'semantic-ui-react'

function MenuBar() {
  return (
    <Menu size='tiny'>
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
          name='browse games'
        />
        <Menu.Menu position='right'>
          <Dropdown item text='Language'>
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Russian</Dropdown.Item>
              <Dropdown.Item>Spanish</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            <Button primary>Sign Up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
}

export default MenuBar
