import React from 'react'
import Note from './Note'
import AppContext from '../AppContext';
import PropTypes from 'prop-types';

class Notes extends React.Component{
    static contextType=AppContext;

    render(){
        const {notes,currentFolder,currentNote,handleAddNote} = this.context;

        let renderNotes=notes;

        if(currentFolder){
            renderNotes=renderNotes.filter(note => note.folderId===currentFolder);
        }

        if(currentNote){
            renderNotes=renderNotes.filter(note => note.id===currentNote);
        }

        const note= renderNotes.map((note) => {
            return <Note currentNote={currentNote} handleNoteSelect={this.props.handleNoteSelect} key={note.id} note={note}/>
        })


        return (
            <div className='noteslist'>
                {note}
                <button onClick={(e)=>handleAddNote(e)} type='button'>New Note</button>
            </div>
        )
    }
}

Notes.childContextType = {
    handleAddNote: PropTypes.func.isRequired,
    currentNote: PropTypes.string.isRequired,
    currentFolder: PropTypes.string.isRequired,
    notes: PropTypes.object
}

Notes.propTypes = {
    handleNoteSelect: PropTypes.func.isRequired
}




export default Notes