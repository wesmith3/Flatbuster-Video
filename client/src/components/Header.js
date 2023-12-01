import { Button, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='page-header'>
      <img className="logo" src="././Logo.png" alt="Logo"></img>
      <Button className='shopping-cart' icon='cart'color='yellow' size='large' as={Link} to='/my_cart'>
        {/* <Icon name='cart' size='large'/> */}
      </Button>
    </div>
  );
}

export default Header;
