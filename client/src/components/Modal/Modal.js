import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaPlay } from "react-icons/fa";
import { useState } from 'react';
import './Modal.css';
import SeasonBtn from './SeasonBtn';
import Episodebtn from './Episodebtn';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 600,
  bgcolor: '#000000',
  border: '2px solid ##1f222b',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  //states
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Seasonclicked, SetSeasonClicked] = useState(1);
  const [EpisodeId, setEpisodeId] = useState(1);
  const [lists, setlists] = useState([]);
  const [clicked,SetClicked] = useState(true);
  var renderedEpisodes = [];
  if(props.EpisodeList.length == 1){
    for(var i = 1; i <= props.EpisodeList[0]; i++){
      renderedEpisodes.push(`Episode ${i}`)
    }
  }
  React.useEffect(()=>{
    for(var i = 1; i <= props.EpisodeList[Seasonclicked]; i++){
      renderedEpisodes.push(`Episode ${i}`)
    }
    setlists(renderedEpisodes);
  },[clicked, Seasonclicked, 2]);
  console.log("rendered",lists)
  //Not Function 
  let url = props.url;
  if (props.shows) {
    url = `https://moviesapi.club/tv/${props.showid}-${Seasonclicked}-${EpisodeId}`
  }
  //Not Functional
  console.log("Hello Nigga = ", props.EpisodeList);

  let title = props.data.param.title;
  let overview = props.data.param.overview;
  let rs = props.data.param.release_date;
  overview = overview ? overview : '';
  if (title === undefined) {
    title = props.data.param.name;
  }
  if (rs === undefined) {
    rs = props.data.param.first_air_date;
  }
  return (
    <div>
      <button className='watch-btn-sml wtc' onClick={handleOpen}>Watch<FaPlay className='play-btn' /></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="Boxmodel">
          <iframe className='frametag' src={url} allow="fullscreen"></iframe>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          {props.shows ? <div className='Season_Div'>{props.EpisodeList.map((data, index) => 
          <SeasonBtn 
          onClick={() => { SetSeasonClicked(index + 1); SetClicked(clicked ? false : true)}} 
          className='Season-btn'>
          Season {index + 1} </SeasonBtn>) } </div>: 
          <></>}
          {
            lists != [] ? <div className='Episode_Div'>{lists.map((data,index)=><Episodebtn onClick={()=>{setEpisodeId(index+1)}} className = {index === EpisodeId ? 'clicked' : ''}>{data}</Episodebtn>)}</div> : <></>
          }
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {overview}
          </Typography>
          <Typography id="rs-date" sx={{ mt: 2 }}>
            {rs}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
//items => <Cards param={items} key={Math.random()} />