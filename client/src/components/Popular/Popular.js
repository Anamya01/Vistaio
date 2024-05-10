import React from 'react'
import './Popular.css';
import { useState, useEffect } from 'react';
import { fetchData } from '../../axios';
import Cards from '../Cards/Cards';

function Popular(param) {
  const [Lists, setList] = useState([{}]);
    useEffect(() => {
      fetchData(param).then(res => setList(res.data.results))    
    }, [param]);
    console.log(Lists);
  return (
    <div className='Popular-container'>
      { Lists == [] ? (<p>Loading</p>) :
        Lists.map(items => <Cards param={items} key={Math.random()} />)
      }
    </div>
  )
}

export default Popular;





/*<div className='videos'>
<img src={`https://image.tmdb.org/t/p/original/${items.poster_path}`}></img>
</div>*/