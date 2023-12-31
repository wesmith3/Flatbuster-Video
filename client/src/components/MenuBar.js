import { useState } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function MenuBar({ is_logged_in }) {
  // const [is_logged_in, setis_logged_in] = useState(true)


  return (
    <Menu className="menu-bar" size='large'>
        <Menu.Item as={Link} to='/' name='home'/>
        {/* Future Features */}
        {/* <Menu.Item name='Popular'/> */}
        {/* <Menu.Item name='stock request' as={Link} to='/stock_requests'/> */}
        <Menu.Item as={Link} to='/movies' name='Browse Movies'/>
        <Menu.Menu position='right'>
          {is_logged_in ? (
          <>
            <Menu.Item>
              <Button color='yellow' as={Link} to='/my_account'>Account</Button>
            </Menu.Item>
            <Menu.Item>
              <Button color='blue'>Sign Out</Button>
            </Menu.Item>
            </>
          ): (
            <>
            <Menu.Item>
              <Button color='yellow' as={Link} to='/login'>Login</Button>
            </Menu.Item>
            <Menu.Item>
              <Button color='blue' as={Link} to='/signup'>Sign Up</Button>
            </Menu.Item>
            </>
          )}
        </Menu.Menu>
      </Menu>
    )
}

export default MenuBar
