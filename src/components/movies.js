import React, { useState, useEffect } from 'react'
import "./movies.css"
import { searchMovie, genreMovies, specificMovie } from '../api/api'
import {BsChevronLeft, BsChevronRight, BsChevronDown} from "react-icons/bs"
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/context'

const Movies = ({genre}) => {

  const {currentMovie, setCurrentMovie} = useStateContext()

  const [movies, setMovies] = useState([])
  const [test, setTest] = useState()
  const [hover, setHover] = useState(false)
  const [shift, setShift] = useState(0)
  const fetchGenreMovies = async (genre, region) => {
    let data = await genreMovies(genre, region)
    let set1 = data.slice(0,20)
    let set2 = data.slice(20,40)
    set1 = set1.sort((a, b) => 0.5 - Math.random());
    set2 = set2.sort((a, b) => 0.5 - Math.random());
    setMovies([...set1, ...set2])
  }

  useEffect(() => {
    fetchGenreMovies(genre,"uk")
  }, [])
  console.log(genre, movies)

const shiftRight = () => {
  let shiftVal = shift + 2;
  if (shiftVal > 0){
    shiftVal = 0
  }
  setShift(shiftVal)
}

const shiftLeft = () => {
  let shiftVal = shift - 2;
  if (shiftVal == -38){
    shiftVal = 0
  }
  setShift(shiftVal)
}

console.log(shift)

  return (
    <div className='movies'>
        <div className="title">
            <Link to={`/movielist/${genre}`} className="genreName" onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
              {genre}{hover && <BsChevronDown/>}
            </Link>
        </div>
        <div className="cards">
          <div className="chevron leftChevron" onClick={shiftRight}>
            <BsChevronLeft/>
          </div>
          <div className="chevron rightChevron" onClick={shiftLeft}>
            <BsChevronRight/>
          </div>
            {movies.map((movie) => {
              let img = `https://image.tmdb.org/t/p/w780${movie.poster_path}`
              if (movie.poster_path == null){
                return
              }
              return <Link to={`/moviepage/${movie.id}/${movie.title}`} onClick={() => setCurrentMovie(movie)}>
                <img className="card" src={img} alt="Logo" style={{"--shift": shift}}/>
              </Link>
            })}
            {movies.map((movie, i) => {
              if(i<5){
                let img = `https://image.tmdb.org/t/p/w780${movie.poster_path}`
                if (movie.poster_path == null){
                  return
                }
                return <Link to={`/moviepage/${movie.id}/${movie.title}`} onClick={() => setCurrentMovie(movie)}>
                  <img className="card" src={img} alt="Logo" style={{"--shift": shift}}/>
                </Link>
              }

            })}
        </div>
    </div>
  )
}

export default Movies