import React from 'react'
import { useSelector } from "react-redux";
import Header from '../components/Header'
import navcom from '../components/navcom'

const AlumniMain = () => {
  const alumniActive = useSelector(state => state.alumniActive.alumniActive)
  return (
    <>
    <Header />
    {
      navcom?.map((item)=>{
        return item.name === alumniActive ? <div key={item}>{item.element}</div> : null
      })}
    
   </>
  )
}
export default AlumniMain