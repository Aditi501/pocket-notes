import React, { useEffect, useState } from 'react'
import './Content.css'

const List = ({}) => {
const savedInput=JSON.parse(window.localStorage.getItem("groupname"))
let [saveTitle, setSaveTitle]=useState([])
  return (
    <div>
        <div className='list'>
        <div className='sticky-div'>
      <h1 className='heading2'>Pocket Notes</h1></div>
      <ul className="ul1">
        {}
        </ul>
      </div>
    </div>
  )
}

export default List