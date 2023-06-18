import React, { useEffect } from 'react'
import { useOutlet } from 'react-router-dom'

export default function ScrollTop({children}) {
    const location = useOutlet()
    
    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
        })
      
    }, [location])
  return (
    <>{children}</>
  )
}
