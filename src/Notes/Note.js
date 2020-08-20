import React from 'react'
import AppContext from '../AppContext'
import PropTypes from 'prop-types'

class Note extends React.Component{
    static contextType=AppContext;


    render(){
        const {currentNote,handleDeleteClick,loading}=this.context

        if(currentNote===this.props.note.id){    
            return(
                <>
                    <div onClick={(e)=>this.props.handleNoteSelect(e)} id={this.props.note.id} className='note'>
                        <h3>{this.props.note.name}</h3>
                        <p>{this.props.note.content}</p>
                        <p>Last Modified: {this.props.note.modified}</p>
                        <button disabled={loading} id={this.props.note.id} onClick={(e)=>handleDeleteClick(e)}type='button'>Delete</button>
                    </div>
                </>
            )
        }else{
            return (
                <div onClick={(e)=>this.props.handleNoteSelect(e)} id={this.props.note.id} className='note'>
                    <h3>{this.props.note.name}</h3>
                    <p>Last Modified: {this.props.note.modified}</p>
                </div>
            )
        }
    }
}

Note.childContextType ={
    currentNote: PropTypes.string.isRequired,
    handleDeleteClick: PropTypes.func.isRequired
}

Note.propTypes = {
    note: PropTypes.object.isRequired,
    handleNoteSelect: PropTypes.func.isRequired
}

export default Note