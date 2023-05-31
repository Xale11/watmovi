import React, {useEffect, useState} from 'react'
import "./utility.css"
import { AiFillHome, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai"
import { BiWorld } from "react-icons/bi"
import { MdDarkMode } from "react-icons/md"
import { searchMovie, similarMovies, idMovie, randomMovie } from '../api/api'
import { GiPerspectiveDiceSixFacesRandom} from "react-icons/gi"
import { Link, useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/context'

const Utility = () => {
  const [hover, setHover] = useState(false)
  const {show} = useStateContext()
  return (
    <div className='utility' onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      {hover && <Taskbar/>}
      {show && <Taskbar/>}
    </div>
  )
}

export default Utility

const Taskbar = () => {
  const [search, setSearch] = useState("")
  const [movies, setMovies] = useState()
  const [change, setChange] = useState(false)
  const [ranMovie, setRanMovie] = useState()
  const [simMovies, setSimMovies] = useState()
  const navigate = useNavigate()

  const {theme, setTheme, setShow} = useStateContext()

  const fetchMovies = async (movie) =>{
    let data = await searchMovie(movie, "GB")
    let id = data[0].id
    let data2 = await similarMovies(id, "GB")
    setMovies([...data])
    setSimMovies([...data2])
  }

  const getRandomMovie = async () =>{
    let index = Math.round(Math.random() * 19)
    let data = await randomMovie(index)
    navigate(`/moviepage/${data.id}/${data.title}`)
  }

  const submitData = (e) => {
    if(e.key == "Enter"){
      if(search == ""){
        return
      }
      navigate(`/query/${search}`)
    }
  }

  const submitDataEnter = () => {
    if (search == ""){
      return
    }
    navigate(`/query/${search}`)
  }

  const changeTheme = (theme) => {
    if (theme == 1){
      setTheme(0)
    }
    else{
      setTheme(1)
    }
  }



  console.log("1",movies, simMovies)
  console.log(ranMovie)

  return (
    <div className='taskbar'>
      <Link to="/" className="home">
        <AiFillHome/>
      </Link>
      <div className="genre" onMouseOver={() => {setShow(true)}} onMouseOut={() => {setShow(false)}}>
        <AiOutlineMenu/>
      </div>
      <div className="search">
        <input className="textarea" type="text" value={search} onKeyUp={submitData} placeholder='Pick a movie' onChange={e => setSearch(e.target.value)}/>
        <div className="searchbtn">
          <AiOutlineSearch onClick={submitDataEnter}/>
        </div>
      </div>
      <div onClick={getRandomMovie} className="random">
        <GiPerspectiveDiceSixFacesRandom/>
      </div>      
      <div className="theme" onClick={() => changeTheme(theme)}>
        <MdDarkMode/>
      </div>

    </div>
  )
}