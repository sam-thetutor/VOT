import React from 'react'
import { useAuth } from '../use-auth-client'

const one = () => {
  const { isAuthenticated, login,principal } = useAuth()
  console.log(isAuthenticated)
  return 
  <>
  {
    isAuthenticated? <div>
      <button onClick={login}>Log In</button>
      <span>Principal ID : {principal.toString()}</span>



    </div>
      :<button onClick={login}>Log In</button>
  }
  </>


  

}

export default one
