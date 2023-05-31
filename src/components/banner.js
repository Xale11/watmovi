import React, { useEffect, useState } from 'react'
import "./banner.css"
import { topMovies } from '../api/api'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/context'

const Banner = () => {
  const [movies, setMovies] = useState()
  const [img, setImg] = useState("")
  const {setCurrentMovie, currentMovie} = useStateContext()

  const fetchTopMovies = async () => {
    let data = await topMovies()
    setImg(`https://image.tmdb.org/t/p/original${data[0].backdrop_path}`)
    setMovies([...data])
  }

  useEffect(() => {
    fetchTopMovies()
  })

  return (
    <div className='banner' style={{"--height": window.innerHeight}}>
        <div className="slideshow">
        {!movies ? "" : movies.map((movie, i) => {
          if( i < 10){
            let url = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
            let delay = i;
            if (delay == 9){
              delay = -1;
            }
            return <div className="slide" style={{"--delay": delay}}>
              <div className="movieTitle">
                {movie.title}
              </div>
              <Link to={`/moviepage/${movie.id}/${movie.title}`} onClick={() => setCurrentMovie(movie)}>
                <img src={url} alt="" />
              </Link>
              <Link to={`/moviepage/${movie.id}/${movie.title}`} className='top10btn' onClick={() => setCurrentMovie(movie)}>
                Watch Now
              </Link>
              <p className="rank">{i+1}</p>
              </div>
          }
        })}
        {!movies ? "" : movies.map((movie, i) => {
          if( i < 10){
            let url = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
            let delay = i;
            if (delay == 9){
              delay = -1;
            }
            return <div className="slide" style={{"--delay": delay}}>
              <div className="movieTitle">
                {movie.title}
              </div>
              <Link to={`/moviepage/${movie.id}/${movie.title}`}>
                <img src={url} alt="" />
              </Link>
              <Link to={`/moviepage/${movie.id}/${movie.title}`} className='top10btn'>
                Watch Now
              </Link>
              <p className="rank">{i+1}</p>
              </div>
          }
        })}
        </div>
    </div>
  )
}

export default Banner