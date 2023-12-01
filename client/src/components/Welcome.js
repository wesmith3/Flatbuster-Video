import React from 'react'
import { Image } from 'semantic-ui-react'
import verifyJWT from "./Authorize"

function Welcome() {
  const UserId = JSON.parse(localStorage.getItem("UserId")) || 0;
  const jwt = localStorage.getItem('token')
  verifyJWT(jwt, UserId)
  
  return (
    <div className='welcome-image'>
        <Image src="././Welcome.jpeg" alt="shop"/>
    </div>
  )
}

export default Welcome
