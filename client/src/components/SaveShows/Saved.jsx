import React from 'react'
import SavedShows from './SavedShows';
import './SavedShows.css';
import { useState, useEffect } from 'react';


import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';

function Saved() {
  const [Lists, setList] = useState([{}]);
  const { user } = UserAuth();


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
    <div className='container1'>
    { Lists === undefined ? (<p>Loading</p>) :
      Lists.map(items => <SavedShows param={items} />)
    }
  </div>
  )
}

export default Saved