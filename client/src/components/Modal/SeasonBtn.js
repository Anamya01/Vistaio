import React from 'react'
import './Modal.css'
function SeasonBtn(props) {
    
  return (
    <div className='btn-ep' onClick={props.onClick}>{props.children}</div>
  )
}

export default SeasonBtn