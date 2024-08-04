import React, { useState, useEffect } from 'react'
import './Content.css';
import send from '../assets/Vector (4).png';
import axios from 'axios';
import { formatDate } from '../utils/formatDate';
import { IconText } from '../utils/Icon';


const Notes = ({
  activeNote,
  activeNoteName,
  groupColor,
}) => {
  const [groupNotes, setGroupNotes] = useState('');
  const [noteContent, setNoteContent] = useState([]);

  useEffect(() => {
    axios.get(`https://pocketnotes-r0zf.onrender.com/api/notes/${activeNote}`)
      .then(response => setNoteContent(response.data))
      .catch(error => console.error('Error fetching notes:', error));
  }, [noteContent])

 

  const handleAddNote = async (groupId, body) => {
    try {
      const response = await axios.post(`https://pocketnotes-r0zf.onrender.com/api/notes/add/${groupId}`, body);
      setGroupNotes(response.data);
      setGroupNotes('');
    }

    catch (error) { console.error('Error adding note:', error) };
  }



  return (

    <div className='saved-notes'>
      <div className='header'>
      <div className='icon' style={{background:groupColor}}>
          {IconText(activeNoteName)}
        </div>
        {
          activeNoteName
        }
      </div>
      <div className='notes-content'>
      {(noteContent.length===0) && <div className="no-active-note">No Active Note</div>}
        {noteContent.map(({ _id, body, createdAt }) => {
          const date = new Date(createdAt); 
          return (
            <div key={_id}>
              {body}
              <p style={{textAlign:"right",fontSize:"12px",marginTop:"5px"}}>{formatDate(date)}</p>
            </div>
          );
        })}
      </div>
      <div className='text-area'>
        <textarea
          placeholder='Here’s the sample text for sample work'
          value={groupNotes.body || ""}
          onChange={
            (e) => {
              setGroupNotes((prev) => {
                return { ...prev, body: e.target.value };
              })
            }
          }></textarea>
        <img onClick={() => handleAddNote(activeNote, groupNotes)} src={send}  className={`${!groupNotes.body ? 'disabled' : ''}`}/>
      </div>
    </div>
  )
}

export default Notes