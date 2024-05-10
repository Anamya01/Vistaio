import React, { useState } from 'react'
import './Cards.css';
import { FaPlay } from "react-icons/fa";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Modal } from '@mui/base';

import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';


import BasicModal from '../Modal/Modal';
function Cards(param) {

  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const movieID = doc(db, 'users', `${user?.email}`);


  const [modal , setModal] = useState(false);
  const modalHandler = () => {
    console.log('shld work');
    setModal(true);
  }
  let id = param.param.id;
  let url = `https://vidsrc.to/embed/${param.param.media_type}/${param.param.id}`
    let title = param.param.title;
    let rs = param.param.release_date;
    if(title === undefined){
      title = param.param.name;
    }
    if(rs === undefined){
      rs = param.param.first_air_date;
    }
    if(param.param.media_type === undefined){
      url = `https://vidsrc.to/embed/movie/${param.param.id}`
    }
    let shorten = title ? title.substring(0, 15) : '';
    shorten = title > shorten ? shorten + '...' : shorten;


    const saveShow = async () => {
      if (user?.email) {
        setLike(!like);
        setSaved(true);
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: id,
            title: title,
            img: param.param.backdrop_path,
            url: url,
            rs: rs,
          }),
        });
      } else {
        alert('Please log in to save a movie');
      }
    };

  return (
    <div className='Moviecard'>
      <div className='imgSection'>
        <img src={`https://image.tmdb.org/t/p/original/${param.param.backdrop_path}`} alt={param.title}></img>
      </div>
      <div className='BlackOverlay'></div>
      <div className='info'>
      <p className='movie_title'>{shorten}</p>
      <br></br>
      <p className='release-date'>{rs}</p>
      <div className='watch-btn-sml wt-bg'> <BasicModal data = {param} url = {url} className="modalBasic" /> </div>
      </div>
      <p onClick={saveShow} className="hrt">
          {like ? (
            <FaHeart className='heart' />
          ) : (
            <FaRegHeart className='heartlike' />
          )}
      </p>
    </div>
  )
}

export default Cards