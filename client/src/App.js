import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Latest from './components/Latest/Latest';
import Popular from './components/Popular/Popular';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import Footer from './components/Footer/Footer';
//API KEY = 5d4795d808889e47fb760dab465b15e7
// URL = https://api.themoviedb.org/3
function App() {
  // const [data, setData] = React.useState(null);
  // useEffect(() => {
  //   fetch("http://localhost:3001/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);
  const [Lists, setList] = useState([{}]);
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/550?api_key=5d4795d808889e47fb760dab465b15e7")
    .then(response => response.json())
    .then(list => setList(list));
  },[]);
  return (
    <div className='app'>
      <AuthContextProvider>
      <NavBar />
      <Header param = "trending" />
      <p className='headd'>Latest</p>
      <Latest param = "trending" />
      <p className='headd'>Popular</p>
      <Popular param = "popular" />
      <p className='headd'>Top rated</p>
      <Popular param = "top_rated" />
      <p className='headd'>Now trending</p>
      <Popular param = "now_playing" />
      <Footer />
      </AuthContextProvider>
    </div>
  )
}

export default App

