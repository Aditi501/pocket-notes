import React, { useEffect, useState } from 'react'
import imageBg from '../assets/image-removebg-preview 1.png'
import './Content.css'
import lock from "../assets/Vector (3).png"
import AddGroup from './AddGroup'
import Notes from './Notes';
import { IconText } from '../utils/Icon'
import axios from 'axios';

const colorList = [
  {
    id: 'lavender',
    color: '#B38BFA',
  },
  {
    id: "pink",
    color: "#FF79F2",
  },
  {
    id: "blue",
    color: " #43E6FC"
  },
  {
    id: "orange",
    color: "#F19576"
  },
  {
    id: "darkblue",
    color: "#0047FF"
  },
  {
    id: "lightblue",
    color: "#6691FF"
  }
]

function Content() {
  const [input, setInput] = useState({ name: '' });
  const [selectedColor, setSelectedColor] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [activeNoteName, setActiveNoteName] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('https://pocketnotes-r0zf.onrender.com/api/groups')
      .then(response => setNotes(response.data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      const modal = document.querySelector('.Add-div');
      if (isVisible && modal && !modal.contains(event.target)) {
        setIsVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);



  const handleAddGroup = () => {
    if (!input.name) return;

    const newNote = { name: input.name, color: selectedColor };

    axios.post('https://pocketnotes-r0zf.onrender.com/api/groups', newNote)
      .then(response => {
        setNotes([...notes, response.data]);
        setInput({ name: '', body: '' });
        setSelectedColor('');
        setIsVisible(false);
      })
      .catch(error => console.error('Error adding note:', error));
  };

  console.log(activeNote)

  

  return (
    <div className='container'>
      <div className='list'>
        <div className='sticky-div'>
          <h1 className='heading2'>Pocket Notes</h1>
        </div>
        <ul className="ul1">
          {notes.map(({ _id, name,color }) => (
            <li
            className={`list-items ${activeNote === _id ? 'active' : ''}`}
              key={_id}
              onClick={() => { setActiveNote(_id); setActiveNoteName(name) }}
            >
                <div className='icon'  style={{ background: color}}>
          {IconText(name)}
        </div>
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div className='addGroup sticky1' onClick={() => setIsVisible(!isVisible)}>
        <p>+</p>
      </div>
      {isVisible && (
        <div className='modal'>
          <div className='Add-div'>
            <h4>Create New Group</h4>
            <label>
              Group Name
              <input
                type="text"
                value={input.name}
                placeholder='Enter group name'
                onChange={(e) => setInput(prev => ({ ...prev, name: e.target.value }))}
              />
            </label>
            <div style={{ display: "flex" }}>
              Choose color &nbsp; &nbsp;
              {colorList.map(clr => (
                <AddGroup
                  key={clr.id}
                  data={clr}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              ))}
            </div>
            <button type="button" onClick={handleAddGroup}>Create</button>
          </div>
        </div>
      )}

      <div className={`containerRight`}>
        <img className="img" src={imageBg} alt="Background" />
        <h1 className='heading1'>Pocket Notes</h1>
        <p className='para1'>
          Send and receive messages without keeping your phone online.
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
        </p>
        <img className='lock' src={lock} alt="Lock" />
        <span className='span1'>end-to-end encrypted</span>
      </div>
      <div className={` ${isVisible ? 'blurred' : ''}`}>
      {activeNote && (
        <Notes
          activeNote={activeNote}
          activeNoteName={activeNoteName}
          groupColor={notes.find(({ _id }) => _id === activeNote)?.color || ''}
        />
      )}
      </div>
    </div>
  );
}

export default Content;