import React from 'react'
import { useAuth } from '../use-auth-client'

const one = () => {
  const { isAuthenticated, login,principal,logout } = useAuth()
  console.log(isAuthenticated)
  return (
  <>
  {
    isAuthenticated? <div>
      <button onClick={logout}>Log Out</button>
      <br/>
      <span>Principal ID : {principal.toString()}</span>
    </div>
      :<button onClick={login}>Log In</button>
  }

  </>
  )


  

}

export default one
