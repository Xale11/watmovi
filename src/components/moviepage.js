import React from 'react'
import "./moviepage.css"
import Utility from './utility'
import Dropdown from './dropdown'
import Showcase from './showcase'
import { movieProviders } from '../api/api'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/context'

const Moviepage = () => {

  const {theme, setTheme, show} = useStateContext()

  return (
    <div className='moviepage' style={theme == 1 ? {"--theme1": "#04080e", "--theme2": "#464b47"} : {"--theme1": "#b1d3e6", "--theme2": "#a2d9f8"}}>
      <Utility></Utility>
      <Link to="/" className="appTitle">
        watMovie
      </Link>
      <Showcase></Showcase>
      {show && <Dropdown></Dropdown>}
    </div>
  )
}

export default Moviepage
