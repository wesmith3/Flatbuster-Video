import React from 'react'
import { Image } from 'semantic-ui-react'

function Welcome() {
  window.localStorage.setItem("isLoggedIn", false)
  
  return (
    <div className='welcome-image'>
        <Image src="././Welcome.jpeg" alt="shop"/>
    </div>
  )
}

export default Welcome
