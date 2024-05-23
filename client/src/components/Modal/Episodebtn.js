import React from 'react'
import './Modal.css'
function Episodebtn(props) {
  return (
    <div className='btn-op' onClick={props.onClick}>{props.children}</div>
  )
}

export default Episodebtn