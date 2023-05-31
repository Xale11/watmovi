import React from 'react'
import "./dropdown.css"
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/context';

const genreNames = [
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
    'TV Movie',
    'Thriller',
    'War',
    'Western'
  ];

const Dropdown = () => {

    const {setShow, show} = useStateContext()
    const navigate = useNavigate()

    const linkGenre = (genre) => {
        navigate(`/movielist/${genre}`)
    }

  return (
    <div className='dropdown' onMouseOver={() => {setShow(true)}} onMouseLeave={() => {setShow(false)}}>
        {genreNames.map((name) => <div className='genreText' onClick={() => linkGenre(name)}>{name}</div>)}
    </div>
  )
}

export default Dropdown