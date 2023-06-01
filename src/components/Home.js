import React from 'react'
import "./Home.css"
import Banner from './banner'
import Movies from './movies'
import Utility from './utility'
import Dropdown from './dropdown'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/context'

const movieGenres = [
    "Popular",
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Thriller',
    'War',
    'Western'
  ];
  

const Background = () => {

  const {setTheme, theme, show} = useStateContext()

  return (
    <div className='background' style={theme == 1 ? {"--theme1": "#04080e", "--theme2": "#464b47"} : {"--theme1": "#b1d3e6", "--theme2": "#a2d9f8"}}>
      <Utility></Utility>
      <Link to="/" className="appTitle">
        watMovie
      </Link>
        <Banner></Banner>
        {movieGenres.map((genre) => {
            return <Movies genre={genre}></Movies>
        })}
        {show && <Dropdown></Dropdown>}
        <div className="credit">
          Made by Alex Diyan
        </div>
    </div>
  )
}

export default Background
