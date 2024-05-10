import React from 'react'
import BasicModal from '../Modal/Modal'
import './SavedShows.css';
import { FaPlay } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
function SavedShows(props) {

    const [Lists, setList] = useState([{}]);
    const { user } = UserAuth();


    console.log(props);
    let title = props.param.title;
    let bg = props.param.img;
    let id = props.param.img;
    let url = props.param.url;
    let rs = props.param.rs;



    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
          setList(doc.data()?.savedShows);
        });
      }, [user?.email]);



      const movieRef = doc(db, 'users', `${user?.email}`)
      const deleteShow = async (passedID) => {
          try {
            const result = Lists.filter((item) => item.id !== passedID)
            await updateDoc(movieRef, {
                savedShows: result
            })
          } catch (error) {
              console.log(error)
          }
      }



  return (
    <>
     <div className='card'>
      <div className='img'>
        <img src={`https://image.tmdb.org/t/p/original/${bg}`} alt="sbadn"></img>
      </div>
      <div className='mod'></div>
      <div className='detailsCard'>
      <p className='title'>{title}</p>
      <br></br>
      <p className='date'>{rs}</p>
      </div>
      <div className='tear'> <a href={url}><button><FaPlay />
        </button></a></div>
       <p className="cross" onClick={()=> deleteShow(id)}><AiOutlineClose /></p>
    </div>
    </>
  )
}

export default SavedShows