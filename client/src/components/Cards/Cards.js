import React, { useEffect, useState } from 'react'
import './Cards.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';


import BasicModal from '../Modal/Modal';
function Cards(param) {

  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [season, setSeason] = useState([]);
  const [Episode, SetEpisodes] = useState([]);
  const [show, SetShow] = useState(false);
  const [modal, clickedmodal] = useState(false);
  const { user } = UserAuth();
  var Episode_count = [];
  const movieID = doc(db, 'users', `${user?.email}`);
  //UseEffect this is not finctional
  useEffect(()=>{
    if(param.media === "tv" || param.param.media_type === 'tv'){
        var showid = param.param.id;
        const api = "5d4795d808889e47fb760dab465b15e7"
        fetchSeasons();
        function fetchSeasons() {
        fetch(`https://api.themoviedb.org/3/tv/${param.param.id}?api_key=${api}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setSeason(data.seasons);
          SetShow(true);
        });
        var length = season ? season.length : 0;
        for(var i = 0; i < length; i++){
          Episode_count[i] = season[i].episode_count;
        }
        console.log("sjdn=",season)
        SetEpisodes(Episode_count);
      }
       url = `https://moviesapi.club/tv/${param.param.id}-1-1`; //resovle it mannnn.
    }
  },[param.media, param.param.media_type, modal])
  // not funcitonal
  console.log("count=",Episode);

  const Modal_click_Handle = () =>{
    clickedmodal(modal ? false : true);
  }


  let id = param.param.id;
  let url = `https://moviesapi.club/${param.param.media_type}/${param.param.id}`
  let title = param.param.title;
  let rs = param.param.release_date;
  let backdrop_path = param.param.backdrop_path;
  if (title === undefined) {
    title = param.param.name;
  }
  if (rs === undefined) {
    rs = param.param.first_air_date;
  }
  if(param.media === "tv" || param.param.media_type === 'tv'){
    url = `https://moviesapi.club/tv/${param.param.id}-1-1`;
  }
  else if (param.param.media_type === undefined) {
    url = `https://moviesapi.club/movie/${param.param.id}`
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

  if (backdrop_path) {
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
          <div className='watch-btn-sml wt-bg' onClick = {Modal_click_Handle}> 
          <BasicModal
          data={param} 
          url={url} 
          season = {season} 
          shows = {show} 
          showid = {param.param.id} 
          EpisodeList = {Episode}
          className="modalBasic" /> 
          </div>
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
}

export default Cards