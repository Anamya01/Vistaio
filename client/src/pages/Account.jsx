import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import Saved from '../components/SaveShows/Saved'
import SavedShows from '../components/SaveShows/SavedShows'
import './Pav.css'
function Account() {
  return (
    <div>
      
      <NavBar />
      <p className='whish'>My List</p>
      <Saved />
    </div>
  )
}

export default Account