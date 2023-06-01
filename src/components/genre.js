import React, {useEffect, useState} from 'react'
import "./genre.css"
import Utility from './utility'
import { Link, useParams } from 'react-router-dom'
import { genreMovies } from '../api/api'
import { useStateContext } from '../context/context'
import Dropdown from './dropdown'

const Genre = () => {
  const {genreId} = useParams()
  const [genMovies, setGenMovies] = useState()
  const {theme, setTheme, show} = useStateContext()

  const getGenreMovies = async (genre) => {
    let data = await genreMovies(genre)
    setGenMovies([...data])
  }

  useEffect(() => {
    getGenreMovies(genreId)
  }, [genreId])

  console.log(genMovies)

  return (
    <div className='genrepage' style={theme == 1 ? {"--theme1": "#04080e", "--theme2": "#464b47"} : {"--theme1": "#b1d3e6", "--theme2": "#a2d9f8"}}>
      <Utility></Utility>
      <Link to="/" className="appTitle">
        watMovie
      </Link>
      <div className="genreTitle">{genreId}</div>
      <div className="genreMovies">
        {genMovies ? genMovies.map((movie) => {
          if (movie.poster_path == null){
            return
          }
          return <Link to={`/moviepage/${movie.id}/${movie.original_title}`}>
          <img className="card" src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}/>
        </Link>
        }) : <p>loading</p>}
      </div>
      {show && <Dropdown></Dropdown>}
    </div>
  )
}

export default Genre