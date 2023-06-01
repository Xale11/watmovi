import React, {useState, useEffect} from 'react'
import "./showcase.css"
import { useStateContext } from '../context/context'
import { useParams } from 'react-router-dom'
import { movieProviders, similarMovies, specificMovie, queryMovies } from '../api/api'
import { Link } from 'react-router-dom'

const Showcase = () => {
  const {movieId, movieTitle} = useParams();

  const [provider, setProviders] = useState()
  const [simMovies, setSimMovies] = useState()
  const [recMovies, setRecMovies] = useState()
  const [curMovie, setCurMovie] = useState()
  const [logo, setLogo] = useState()
  const [refresh, setRefresh] = useState(false)
  const img = `https://image.tmdb.org/t/p/w1280${curMovie ? curMovie.backdrop_path : "ll"}`

  const getMovieProviders = async (id) => {
    let data = await movieProviders(id)
    let logoData = data.map((item) => item.logo_path)
    let uniqueLogo = logoData.filter((item, i) => {
      return logoData.indexOf(item) == i
    })
  
    setLogo([...uniqueLogo])
    setProviders(data)
  }

  const getQueryMovie = async (name) => {
    let data = await queryMovies(name)
    setSimMovies([...data])
  }

  const getSimilarMovies = async (id) => {
    let data = await similarMovies(movieId)
    setRecMovies([...data])
  }

  const getSpecificMovie = async (id) => {
    let data = await specificMovie(id)
    setCurMovie(data)
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    getSpecificMovie(movieId)
    getMovieProviders(movieId)
    getSimilarMovies(movieId)
    getQueryMovie(movieTitle)
  },[movieId])

  console.log(2,provider)
  console.log(logo)
  console.log(simMovies)
  return (
    <div className='showcaseContainer'>
    <div className='showcase'>
      <div className="movieImg">
        <div className="movieImgTitle">{movieTitle}</div>
        <img src={img} alt="" />
      </div>
      <div className="movieDesc">
        <div className="movieDescText">
          {curMovie ? curMovie.overview : <p>Loading</p>}
        </div>
      </div>
      <div className="movieInfo">
        <div className="movieInfoContainer">
          <div className="movieRating">
            <div>
              {curMovie ? Math.round(curMovie.vote_average * 10) : 0}%
            </div>
          </div>
          <div className="movieProvider">
            <div className>Watch Now On:</div>
            <div className="providerLogos">
              {provider ? logo.map((item) => {
                let img = `https://image.tmdb.org/t/p/w300${item}`
                return <img className='providerLogo' src={img} alt="" srcset="" onClick={() => window.location = `https://www.themoviedb.org/movie/${movieId}/watch?locale=GB`}/>
              }): <p>Coming Soon</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="recommendedTitle">Recommended Movies</div>
    <div className="recommendedMovies">
        {simMovies ? simMovies.map((movie, i) => {
          if (i == 0){
            return
          }
          if (movie.poster_path == null){
            return
          }
          return <Link to={`/moviepage/${movie.id}/${movie.original_title}`}>
              <img className="card" src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}/>
            </Link>
        }) : <p>loading</p>}
        {recMovies ? recMovies.map((movie) => {
          if (movie.poster_path == null){
            return
          }
          return <Link to={`/moviepage/${movie.id}/${movie.original_title}`}>
              <img className="card" src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}/>
            </Link>
        }) : <p>loading</p>}
    </div>   
    </div>
  )
}

export default Showcase