import React, { useEffect,useRef ,useState} from 'react'
import './TitleCards.css'
import {Link } from 'react-router-dom'
const TitleCards = ({title,category}) => {
 const cardsRef=useRef();
 const [apiData,setApiData]=useState([]);
const handleWheel=(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft+=event.deltaY;
}
useEffect(()=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTViMTk0ZWVmNjM0NmFhNjc1YTZmMDY4NDNiOTg4NyIsIm5iZiI6MTc0MjU2MzE1OS41ODgsInN1YiI6IjY3ZGQ2NzU3MzM4ZTc3NzgzZmY1NTZlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z8QVxGue2ZfHioxBbjy_eNpmsSUskbmlnrnvBoR6BCM'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel',handleWheel)
},[])
  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`} className='card'key={index}>
                <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} />
                <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
