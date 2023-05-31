import React, { useEffect, useState } from 'react'
import "./query.css"
import { Link, useParams } from 'react-router-dom'
import Utility from './utility'
import Dropdown from './dropdown'
import { searchMovie, similarMovies } from '../api/api'
import { useStateContext } from '../context/context'

const Query = () => {
    const {movieId} = useParams()
    const [movies, setMovies] = useState()
    const {theme, show} = useStateContext()
    const fetchMovies = async (movie) =>{
        let data = await searchMovie(movie, "GB")
        let id = data[0].id
        let data2 = await similarMovies(id, "GB")
        setMovies([...data, ...data2])
      }

    useEffect(() => {
        fetchMovies(movieId)
    }, [movieId])

    console.log(movies)

  return (
    <div className='querypage' style={theme == 1 ? {"--theme1": "#04080e", "--theme2": "#464b47"} : {"--theme1": "#b1d3e6", "--theme2": "#a2d9f8"}}>
      <Link to="/" className="appTitle">
        watMovie
      </Link>
      <div className="queryMovies">
        {movies ? movies.map((movie) => {
            if (movie.poster_path == null){
                return
            }            
            return <Link to={`/moviepage/${movie.id}/${movie.original_title}`}>
            <img className="card" src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}/>
            </Link>        
        }) : <p className='errorSearch'>No movies found for: {movieId}</p>}        
      </div>
      {show && <Dropdown></Dropdown>}
      <Utility></Utility>
    </div>
  )
}

export default Query